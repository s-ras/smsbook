import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

import {
	adaptNavigationTheme,
	configureFonts,
	MD3Theme,
} from "react-native-paper";

import { getMaterial3Theme } from "@pchmn/expo-material3-theme";

import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

import { fontConfig } from "@/ui/fonts";

const { LightTheme: AdaptedLightTheme, DarkTheme: AdaptedDarkTheme } =
	adaptNavigationTheme({
		reactNavigationLight: NavigationDefaultTheme,
		reactNavigationDark: NavigationDarkTheme,
	});

const MD3LightThemeWithVazirMatn: MD3Theme = {
	...MD3LightTheme,
	fonts: configureFonts({ config: fontConfig, isV3: true }),
	colors: getMaterial3Theme("#219fdf").light,
};

const MD3DarkThemeWithVazirMatn: MD3Theme = {
	...MD3LightTheme,
	fonts: configureFonts({ config: fontConfig, isV3: true }),
	colors: getMaterial3Theme("#219fdf").dark,
};

export const DefaultTheme = {
	...MD3LightThemeWithVazirMatn,
	...AdaptedLightTheme,
	colors: {
		...MD3LightTheme.colors,
		...AdaptedLightTheme.colors,
	},
};

export const DarkTheme = {
	...MD3DarkThemeWithVazirMatn,
	...AdaptedDarkTheme,
	colors: {
		...MD3DarkTheme.colors,
		...AdaptedDarkTheme.colors,
	},
};
