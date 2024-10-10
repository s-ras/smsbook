import { Platform } from "react-native";

export const fontConfig = {
	displaySmall: {
		fontFamily: Platform.select({
			web: "Vazirmatn_100Thin",
			ios: "Vazirmatn_100Thin",
			default: "Vazirmatn_100Thin",
		}),
	},
	displayMedium: {
		fontFamily: Platform.select({
			web: "Vazirmatn_500Medium",
			ios: "Vazirmatn_500Medium",
			default: "Vazirmatn_500Medium",
		}),
	},
	displayLarge: {
		fontFamily: Platform.select({
			web: "Vazirmatn_900Black",
			ios: "Vazirmatn_900Black",
			default: "Vazirmatn_900Black",
		}),
	},
	headlineSmall: {
		fontFamily: Platform.select({
			web: "Vazirmatn_100Thin",
			ios: "Vazirmatn_100Thin",
			default: "Vazirmatn_100Thin",
		}),
	},
	headlineMedium: {
		fontFamily: Platform.select({
			web: "Vazirmatn_500Medium",
			ios: "Vazirmatn_500Medium",
			default: "Vazirmatn_500Medium",
		}),
	},
	headlineLarge: {
		fontFamily: Platform.select({
			web: "Vazirmatn_900Black",
			ios: "Vazirmatn_900Black",
			default: "Vazirmatn_900Black",
		}),
	},
	titleSmall: {
		fontFamily: Platform.select({
			web: "Vazirmatn_100Thin",
			ios: "Vazirmatn_100Thin",
			default: "Vazirmatn_100Thin",
		}),
	},
	titleMedium: {
		fontFamily: Platform.select({
			web: "Vazirmatn_500Medium",
			ios: "Vazirmatn_500Medium",
			default: "Vazirmatn_500Medium",
		}),
	},
	titleLarge: {
		fontFamily: Platform.select({
			web: "Vazirmatn_900Black",
			ios: "Vazirmatn_900Black",
			default: "Vazirmatn_900Black",
		}),
	},
	labelSmall: {
		fontFamily: Platform.select({
			web: "Vazirmatn_100Thin",
			ios: "Vazirmatn_100Thin",
			default: "Vazirmatn_100Thin",
		}),
	},
	labelMedium: {
		fontFamily: Platform.select({
			web: "Vazirmatn_500Medium",
			ios: "Vazirmatn_500Medium",
			default: "Vazirmatn_500Medium",
		}),
	},
	labelLarge: {
		fontFamily: Platform.select({
			web: "Vazirmatn_900Black",
			ios: "Vazirmatn_900Black",
			default: "Vazirmatn_900Black",
		}),
	},
	bodySmall: {
		fontFamily: Platform.select({
			web: "Vazirmatn_100Thin",
			ios: "Vazirmatn_100Thin",
			default: "Vazirmatn_100Thin",
		}),
	},
	bodyMedium: {
		fontFamily: Platform.select({
			web: "Vazirmatn_500Medium",
			ios: "Vazirmatn_500Medium",
			default: "Vazirmatn_500Medium",
		}),
	},
	bodyLarge: {
		fontFamily: Platform.select({
			web: "Vazirmatn_900Black",
			ios: "Vazirmatn_900Black",
			default: "Vazirmatn_900Black",
		}),
	},
};
