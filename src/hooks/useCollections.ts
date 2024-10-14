import { db } from "@database/client";
import { collections, InsertCollection } from "@schema/collections";
import { and, asc, eq, gt, lt, sql } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

const useGetCollections = () => {
	return useLiveQuery(
		db.select().from(collections).orderBy(asc(collections.order))
	).data;
};

const useSelectCollection = (id: number) => {
	const c = useLiveQuery(
		db.select().from(collections).where(eq(collections.id, id))
	).data[0];
	return c;
};

const useInsertCollections = () => {
	const ec = useGetCollections();
	return (c: Omit<InsertCollection, "order">) => {
		const order =
			(ec && ec[ec.length - 1] && ec[ec.length - 1].order + 1) || 1;
		const newCollection = {
			...c,
			order,
		} as InsertCollection;
		db.insert(collections).values(newCollection).run();
	};
};

const useUpdateCollections = (id: number) => {
	return ({ number, name }: { number?: string; name?: string }) => {
		const updates: Partial<InsertCollection> = {};
		if (number) updates.number = number;
		if (name) updates.name = name;

		db.update(collections)
			.set({ ...updates })
			.where(eq(collections.id, id))
			.run();
	};
};

const useExpandCollection = (id: number) => {
	return (isExpanded: boolean) => {
		db.update(collections)
			.set({ is_expanded: isExpanded })
			.where(eq(collections.id, id))
			.run();
	};
};

const useReorderCollections = () => {
	return (from: number, to: number) => {
		db.transaction(async tx => {
			const current = tx
				.select()
				.from(collections)
				.where(eq(collections.order, from))
				.get();

			if (!current) {
				throw new Error();
			}

			if (current.order < to) {
				tx.update(collections)
					.set({ order: sql`${collections.order} - 1` })
					.where(
						and(
							gt(collections.order, current.order),
							lt(collections.order, to + 1)
						)
					)
					.run();
			} else if (current.order > to) {
				tx.update(collections)
					.set({ order: sql`${collections.order} + 1` })
					.where(
						and(
							lt(collections.order, current.order),
							gt(collections.order, to - 1)
						)
					)
					.run();
			}

			tx.update(collections)
				.set({ order: to })
				.where(eq(collections.id, current.id))
				.run();
		});
	};
};

const useDeleteCollections = () => {
	return (id: number) => {
		db.transaction(async tx => {
			const current = tx
				.select()
				.from(collections)
				.where(eq(collections.id, id))
				.get();

			if (!current) {
				throw new Error();
			}

			tx.update(collections)
				.set({ order: sql`${collections.order} - 1` })
				.where(gt(collections.order, current.order))
				.run();

			tx.delete(collections).where(eq(collections.id, current.id)).run();
		});
		db.delete(collections).where(eq(collections.id, id)).run();
	};
};

const useCollections = {
	get: useGetCollections,
	select: useSelectCollection,
	insert: useInsertCollections,
	update: useUpdateCollections,
	expand: useExpandCollection,
	reorder: useReorderCollections,
	delete: useDeleteCollections,
};

export default useCollections;
