import { eq } from "drizzle-orm";

import { useLiveQuery } from "drizzle-orm/expo-sqlite";

import { db } from "@/database/client";

import { InsertParameters, parameters } from "@/schema/parameters";

const useGetParameters = (id: string) => {
	return useLiveQuery(
		db.select().from(parameters).where(eq(parameters.collection_id, id))
	).data;
};

const useSelectParameter = (id: string) => {
	return useLiveQuery(
		db.select().from(parameters).where(eq(parameters.id, id))
	).data;
};

const useInsertParameters = (id: string) => {
	return (label: string, value: string) => {
		db.insert(parameters).values({ label, value, collection_id: id }).run();
	};
};

const useUpdateParameters = () => {
	return ({
		id,
		label,
		value,
	}: {
		id: string;
		label?: string;
		value?: string;
	}) => {
		const updates: Partial<InsertParameters> = {};
		if (label) updates.label = label;
		if (value) updates.value = value;

		db.update(parameters)
			.set({ ...updates })
			.where(eq(parameters.id, id))
			.run();
	};
};

const useDeleteParameters = () => {
	return (id: string) => {
		db.delete(parameters).where(eq(parameters.id, id)).run();
	};
};

const useParameters = {
	get: useGetParameters,
	select: useSelectParameter,
	insert: useInsertParameters,
	update: useUpdateParameters,
	delete: useDeleteParameters,
};

export default useParameters;
