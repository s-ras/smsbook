import { db } from "@/database/client";
import { collections, InsertCollection } from "@/schema/collections";
import { and, desc, eq, gt, lt, sql } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

const useGetCollections = () => {
	return useLiveQuery(
		db.select().from(collections).orderBy(desc(collections.order))
	).data;
};

const useSelectCollection = (id: string) => {
	return useLiveQuery(
		db.select().from(collections).where(eq(collections.id, id))
	).data;
};

const useInsertCollections = () => {
	const ec = useGetCollections();
	return (c: Omit<InsertCollection, "order">) => {
		const order = ec[ec.length - 1].order + 1 || 1;
		const newCollection = { ...c, order } as InsertCollection;
		db.insert(collections).values(newCollection).run();
	};
};

const useUpdateCollections = () => {
	return ({
		id,
		number,
		name,
	}: {
		id: string;
		number?: string;
		name?: string;
	}) => {
		const updates: Partial<InsertCollection> = {};
		if (number) updates.number = number;
		if (name) updates.name = name;

		db.update(collections)
			.set({ ...updates })
			.where(eq(collections.id, id))
			.run();
	};
};

const useReorderCollections = () => {
	return (id: string, order: number) => {
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
	return (id: string) => {
		reorder(id, ec.length);
		db.delete(collections).where(eq(collections.id, id)).run();
	};
};

const useCollection = {
	get: useGetCollections,
	select: useSelectCollection,
	insert: useInsertCollections,
	update: useUpdateCollections,
	reorder: useReorderCollections,
	delete: useDeleteCollections,
};

export default useCollection;
