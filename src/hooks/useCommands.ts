import { eq } from "drizzle-orm";

import { useLiveQuery } from "drizzle-orm/expo-sqlite";

import { db } from "@database/client";

import { commands } from "@schema/commands";

const useGetCommands = (id: number) => {
	return useLiveQuery(
		db.select().from(commands).where(eq(commands.collection_id, id))
	).data;
};

const useSelectCommand = (id: number) => {
	const c = useLiveQuery(
		db.select().from(commands).where(eq(commands.id, id))
	).data[0];
	return c;
};

const useInsertCommands = (id: number) => {
	return (name: string) => {
		db.insert(commands).values({ name, collection_id: id }).run();
	};
};

const useUpdateCommands = (id: number) => {
	return (name: string) => {
		db.update(commands).set({ name }).where(eq(commands.id, id)).run();
	};
};

const useDeleteCommands = () => {
	return (id: number) => {
		db.delete(commands).where(eq(commands.id, id)).run();
	};
};

const useCommands = {
	get: useGetCommands,
	select: useSelectCommand,
	insert: useInsertCommands,
	update: useUpdateCommands,
	delete: useDeleteCommands,
};

export default useCommands;
