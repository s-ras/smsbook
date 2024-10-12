import { count, countDistinct, eq } from "drizzle-orm";

import { useLiveQuery } from "drizzle-orm/expo-sqlite";

import { db } from "@database/client";

import { InsertParameters, parameters } from "@schema/parameters";
import { command_data } from "@schema/command_data";

const useGetParameters = (id: number) => {
	return useLiveQuery(
		db.select().from(parameters).where(eq(parameters.collection_id, id))
	).data;
};

const useSelectParameter = (id: number) => {
	const p = useLiveQuery(
		db.select().from(parameters).where(eq(parameters.id, id))
	).data[0];

	return p;
};

const useInsertParameters = (id: number) => {
	return (label: string, value: string) => {
		db.insert(parameters).values({ label, value, collection_id: id }).run();
	};
};

const useUpdateParameters = (id: number) => {
	return ({ label, value }: { label?: string; value?: string }) => {
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
	return (id: number) => {
		db.delete(parameters).where(eq(parameters.id, id)).run();
	};
};

const useParameterUsageCount = () => {
	return (id: number) => {
		const counts = db
			.select({
				count: countDistinct(command_data.command_id).as("count"),
			})
			.from(command_data)
			.where(eq(command_data.param_id, id))
			.get();

		return counts?.count || 0;
	};
};

const useParameters = {
	get: useGetParameters,
	select: useSelectParameter,
	insert: useInsertParameters,
	update: useUpdateParameters,
	delete: useDeleteParameters,
	count: useParameterUsageCount,
};

export default useParameters;
