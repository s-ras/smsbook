import { openDatabaseSync } from "expo-sqlite";

import { drizzle } from "drizzle-orm/expo-sqlite";

const expoDb = openDatabaseSync("database.db", {
	enableChangeListener: true,
});

export const db = drizzle(expoDb);
