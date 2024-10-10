import { eq } from "drizzle-orm";

import { useLiveQuery } from "drizzle-orm/expo-sqlite";

import { db } from "@/database/client";

import { commands } from "@/schema/commands";
import { command_data } from "@/schema/command_data";

const useGetCommands = (id: string) => {
	return useLiveQuery(
		db.select().from(commands).where(eq(commands.collection_id, id))
	).data;
};

const useSelectCommand = (id: string) => {
	return useLiveQuery(db.select().from(commands).where(eq(commands.id, id)));
};

const useInsertCommands = (id: string) => {
	return (name: string) => {
		db.insert(commands).values({ name, collection_id: id }).run();
	};
};

const useUpdateCommands = () => {
	return ({ id, name }: { id: string; name: string }) => {
		db.update(commands).set({ name }).where(eq(commands.id, id)).run();
	};
};

const useDeleteCommands = () => {
	return (id: string) => {
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
