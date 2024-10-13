import { asc, desc, eq, inArray } from "drizzle-orm";
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
				id: journal.id,
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
		const deletingRows = db
			.select({
				id: journal.id,
			})
			.from(journal)
			.innerJoin(commands, eq(journal.command_id, commands.id))
			.innerJoin(collections, eq(commands.collection_id, collections.id))
			.where(eq(collections.id, id))
			.all();

		db.delete(journal)
			.where(
				inArray(
					journal.id,
					deletingRows.map(row => row.id)
				)
			)
			.run();
	};
};

const useGetLastJournalRecord = (id: number) => {
	const last = useLiveQuery(
		db
			.select()
			.from(journal)
			.where(eq(journal.command_id, id))
			.orderBy(desc(journal.timestamp))
	).data;

	if (!last || last.length === 0) {
		return undefined;
	} else {
		return last[0];
	}
};

const useJournal = {
	get: useGetJournal,
	insert: useInsertJournal,
	purge: usePurgeJournal,
	last: useGetLastJournalRecord,
};

export default useJournal;
