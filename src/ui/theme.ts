import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

import {
	adaptNavigationTheme,
	configureFonts,
	MD3LightTheme,
	MD3DarkTheme,
} from "react-native-paper";

import merge from "deepmerge";

import { fontConfig } from "@ui/fonts";

const MD3LightThemeCustom = {
	...MD3LightTheme,
	fonts: configureFonts({ config: fontConfig, isV3: true }),
	colors: {
		primary: "rgb(0, 95, 175)",
		onPrimary: "rgb(255, 255, 255)",
		primaryContainer: "rgb(212, 227, 255)",
		onPrimaryContainer: "rgb(0, 28, 58)",
		secondary: "rgb(150, 73, 0)",
		onSecondary: "rgb(255, 255, 255)",
		secondaryContainer: "rgb(255, 220, 198)",
		onSecondaryContainer: "rgb(49, 19, 0)",
		tertiary: "rgb(0, 104, 116)",
		onTertiary: "rgb(255, 255, 255)",
		tertiaryContainer: "rgb(151, 240, 255)",
		onTertiaryContainer: "rgb(0, 31, 36)",
		error: "rgb(186, 26, 26)",
		onError: "rgb(255, 255, 255)",
		errorContainer: "rgb(255, 218, 214)",
		onErrorContainer: "rgb(65, 0, 2)",
		background: "rgb(253, 252, 255)",
		onBackground: "rgb(26, 28, 30)",
		surface: "rgb(253, 252, 255)",
		onSurface: "rgb(26, 28, 30)",
		surfaceVariant: "rgb(224, 226, 236)",
		onSurfaceVariant: "rgb(67, 71, 78)",
		outline: "rgb(116, 119, 127)",
		outlineVariant: "rgb(195, 198, 207)",
		shadow: "rgb(0, 0, 0)",
		scrim: "rgb(0, 0, 0)",
		inverseSurface: "rgb(47, 48, 51)",
		inverseOnSurface: "rgb(241, 240, 244)",
		inversePrimary: "rgb(165, 200, 255)",
		elevation: {
			level0: "transparent",
			level1: "rgb(240, 244, 251)",
			level2: "rgb(233, 239, 249)",
			level3: "rgb(225, 235, 246)",
			level4: "rgb(223, 233, 245)",
			level5: "rgb(218, 230, 244)",
		},
		surfaceDisabled: "rgba(26, 28, 30, 0.12)",
		onSurfaceDisabled: "rgba(26, 28, 30, 0.38)",
		backdrop: "rgba(45, 49, 56, 0.4)",
		success: "rgb(0, 110, 28)",
		onSuccess: "rgb(255, 255, 255)",
		successContainer: "rgb(148, 249, 144)",
		onSuccessContainer: "rgb(0, 34, 4)",
		warning: "rgb(105, 95, 0)",
		onWarning: "rgb(255, 255, 255)",
		warningContainer: "rgb(249, 229, 52)",
		onWarningContainer: "rgb(32, 28, 0)",
	},
};

const MD3DarkThemeCustom = {
	...MD3DarkTheme,
	fonts: configureFonts({ config: fontConfig, isV3: true }),
	colors: {
		primary: "rgb(165, 200, 255)",
		onPrimary: "rgb(0, 49, 95)",
		primaryContainer: "rgb(0, 71, 134)",
		onPrimaryContainer: "rgb(212, 227, 255)",
		secondary: "rgb(255, 183, 134)",
		onSecondary: "rgb(80, 36, 0)",
		secondaryContainer: "rgb(114, 54, 0)",
		onSecondaryContainer: "rgb(255, 220, 198)",
		tertiary: "rgb(79, 216, 235)",
		onTertiary: "rgb(0, 54, 61)",
		tertiaryContainer: "rgb(0, 79, 88)",
		onTertiaryContainer: "rgb(151, 240, 255)",
		error: "rgb(255, 180, 171)",
		onError: "rgb(105, 0, 5)",
		errorContainer: "rgb(147, 0, 10)",
		onErrorContainer: "rgb(255, 180, 171)",
		background: "rgb(26, 28, 30)",
		onBackground: "rgb(227, 226, 230)",
		surface: "rgb(26, 28, 30)",
		onSurface: "rgb(227, 226, 230)",
		surfaceVariant: "rgb(67, 71, 78)",
		onSurfaceVariant: "rgb(195, 198, 207)",
		outline: "rgb(141, 145, 153)",
		outlineVariant: "rgb(67, 71, 78)",
		shadow: "rgb(0, 0, 0)",
		scrim: "rgb(0, 0, 0)",
		inverseSurface: "rgb(227, 226, 230)",
		inverseOnSurface: "rgb(47, 48, 51)",
		inversePrimary: "rgb(0, 95, 175)",
		elevation: {
			level0: "transparent",
			level1: "rgb(33, 37, 41)",
			level2: "rgb(37, 42, 48)",
			level3: "rgb(41, 47, 55)",
			level4: "rgb(43, 49, 57)",
			level5: "rgb(46, 52, 62)",
		},
		surfaceDisabled: "rgba(227, 226, 230, 0.12)",
		onSurfaceDisabled: "rgba(227, 226, 230, 0.38)",
		backdrop: "rgba(45, 49, 56, 0.4)",
		success: "rgb(120, 220, 119)",
		onSuccess: "rgb(0, 57, 10)",
		successContainer: "rgb(0, 83, 19)",
		onSuccessContainer: "rgb(148, 249, 144)",
		warning: "rgb(219, 201, 10)",
		onWarning: "rgb(54, 49, 0)",
		warningContainer: "rgb(79, 72, 0)",
		onWarningContainer: "rgb(249, 229, 52)",
	},
};

const { LightTheme: AdaptedLightTheme, DarkTheme: AdaptedDarkTheme } =
	adaptNavigationTheme({
		reactNavigationLight: NavigationDefaultTheme,
		reactNavigationDark: NavigationDarkTheme,
	});

export const DefaultTheme = merge(AdaptedLightTheme, MD3LightThemeCustom);

export const DarkTheme = merge(AdaptedDarkTheme, MD3DarkThemeCustom);
