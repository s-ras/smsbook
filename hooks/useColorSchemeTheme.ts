import { useColorScheme } from "react-native";

import useStore from "@/state/store";

import { DarkTheme, DefaultTheme } from "@/ui/theme";

const useColorSchemeTheme = () => {
	const colorScheme = useColorScheme();

	const preferedTheme = useStore(state => state.preferedTheme);

	if (preferedTheme === "AUTO") {
		return colorScheme === "dark" ? DarkTheme : DefaultTheme;
	} else if (preferedTheme === "LIGHT") {
		return DefaultTheme;
	} else {
		return DarkTheme;
	}
};

export default useColorSchemeTheme;
