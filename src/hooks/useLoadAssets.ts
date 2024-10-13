import { useEffect } from "react";

import { I18nManager } from "react-native";

import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";

import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

import useStore from "@state/store";

import { db } from "@database/client";

import migrations from "@drizzle/migrations";

SplashScreen.preventAutoHideAsync();
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

const useLoadAssets = () => {
	const hasHydrated = useStore(state => state._hasHydrated);

	const { success, error } = useMigrations(db, migrations);

	const [fontsLoaded] = useFonts({
		"Vazirmatn-UI-Regular": require("../assets/fonts/Vazirmatn-UI-Regular.ttf"),
		"Vazirmatn-UI-Medium": require("../assets/fonts/Vazirmatn-UI-Medium.ttf"),
		"Vazirmatn-UI-ExtraBold": require("../assets/fonts/Vazirmatn-UI-ExtraBold.ttf"),
		"Vazirmatn-UI-Thin": require("../assets/fonts/Vazirmatn-UI-Thin.ttf"),
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
