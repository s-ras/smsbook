import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

export const expoDb = openDatabaseSync("database.db", {
	enableChangeListener: true,
});

export const db = drizzle(expoDb);
