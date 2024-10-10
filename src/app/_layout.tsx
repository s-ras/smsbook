import { Stack } from "expo-router";

import { PaperProvider } from "react-native-paper";

import { ThemeProvider } from "@react-navigation/native";

import useLoadAssets from "@hooks/useLoadAssets";
import useColorSchemeTheme from "@hooks/useColorSchemeTheme";

import ErrorPage from "@components/ErrorPage";

const RootLayout = () => {
	const { isReady, isError } = useLoadAssets();

	const theme = useColorSchemeTheme();

	if (!isReady) {
		return <ErrorPage />;
	}

	if (isError) {
		return <ErrorPage />;
	}

	return (
		<PaperProvider theme={theme}>
			<ThemeProvider value={theme}>
				<Stack>
					<Stack.Screen
						name="(tabs)"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="collection"
						options={{ headerShown: false }}
					/>
				</Stack>
			</ThemeProvider>
		</PaperProvider>
	);
};

export default RootLayout;
