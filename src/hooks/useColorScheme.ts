import { useColorScheme as useRNColorScheme } from "react-native";

import useStore from "@state/store";

const useColorScheme = () => {
	const colorScheme = useRNColorScheme();

	const preferedTheme = useStore(state => state.preferedTheme);

	if (preferedTheme === "AUTO") {
		return colorScheme === "dark" ? "DARK" : "LIGHT";
	} else if (preferedTheme === "LIGHT") {
		return "LIGHT";
	} else {
		return "DARK";
	}
};

export default useColorScheme;
