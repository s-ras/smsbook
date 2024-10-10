import { asc, eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

import { db } from "@database/client";

import { journal } from "@schema/journal";
import { collections } from "@schema/collections";
import { commands } from "@schema/commands";

const useGetJournal = (id: number) => {
	return useLiveQuery(
		db
			.select({
				timestamp: journal.timestamp,
				command_name: commands.name,
			})
			.from(journal)
			.innerJoin(commands, eq(journal.command_id, commands.id))
			.innerJoin(collections, eq(commands.collection_id, collections.id))
			.where(eq(collections.id, id))
			.orderBy(asc(journal.timestamp))
	).data;
};

const useInsertJournal = (command_id: number) => {
	return () => {
		db.insert(journal)
			.values({ command_id, timestamp: new Date(Date.now()) })
			.run();
	};
};

const usePurgeJournal = (id: number) => {
	return () => {
		const joined = db
			.$with("joined")
			.as(
				db
					.select()
					.from(journal)
					.innerJoin(commands, eq(journal.command_id, commands.id))
					.innerJoin(
						collections,
						eq(commands.collection_id, collections.id)
					)
					.where(eq(collections.id, id))
			);

		db.with(joined).delete(journal).where(eq(collections.id, id)).run();
	};
};

const useJournal = {
	get: useGetJournal,
	insert: useInsertJournal,
	purge: usePurgeJournal,
};

export default useJournal;
