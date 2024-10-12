import { db } from "@database/client";
import { collections, InsertCollection } from "@schema/collections";
import { and, desc, eq, gt, lt, sql } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

const useGetCollections = () => {
	return useLiveQuery(
		db.select().from(collections).orderBy(desc(collections.order))
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
	return (id: number, order: number) => {
		db.transaction(async tx => {
			const current = tx
				.select()
				.from(collections)
				.where(eq(collections.id, id))
				.get();

			if (!current) {
				throw new Error();
			}

			if (current.order < order) {
				tx.update(collections)
					.set({ order: sql`${collections.order} - 1` })
					.where(
						and(
							gt(collections.order, current.order),
							lt(collections.order, order + 1)
						)
					)
					.run();
			} else if (current.order > order) {
				tx.update(collections)
					.set({ order: sql`${collections.order} + 1` })
					.where(
						and(
							lt(collections.order, current.order),
							gt(collections.order, order - 1)
						)
					)
					.run();
			}

			tx.update(collections)
				.set({ order })
				.where(eq(collections.id, id))
				.run();
		});
	};
};

const useDeleteCollections = () => {
	const ec = useGetCollections();
	const reorder = useReorderCollections();
	return (id: number) => {
		reorder(id, ec.length + 1);
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
