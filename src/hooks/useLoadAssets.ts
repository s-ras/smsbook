import { useEffect } from "react";

import { I18nManager } from "react-native";

import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";

import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

import useStore from "@state/store";

import { db } from "@database/client";

import migrations from "@drizzle/migrations";

import {
	Vazirmatn_100Thin,
	Vazirmatn_500Medium,
	Vazirmatn_900Black,
} from "@expo-google-fonts/vazirmatn";

SplashScreen.preventAutoHideAsync();
I18nManager.forceRTL(true);

const useLoadAssets = () => {
	const hasHydrated = useStore(state => state._hasHydrated);

	const { success, error } = useMigrations(db, migrations);

	const [fontsLoaded] = useFonts({
		Vazirmatn_100Thin,
		Vazirmatn_500Medium,
		Vazirmatn_900Black,
	});

	useEffect(() => {
		if (hasHydrated && fontsLoaded && success) {
			SplashScreen.hideAsync();
		}
	}, [hasHydrated, fontsLoaded, success]);

	return {
		isReady: hasHydrated && fontsLoaded && success,
		isError: error,
	};
};

export default useLoadAssets;
