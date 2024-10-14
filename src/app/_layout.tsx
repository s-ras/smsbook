import { useEffect } from "react";

import { View } from "react-native";

import { Stack } from "expo-router";
import { setBackgroundColorAsync } from "expo-system-ui";
import { setBackgroundColorAsync as setNavigationBarColorAsync } from "expo-navigation-bar";

import { ThemeProvider } from "@react-navigation/native";

import { PaperProvider } from "react-native-paper";

import useLoadAssets from "@hooks/useLoadAssets";
import useColorSchemeTheme from "@hooks/useColorSchemeTheme";

import ErrorPage from "@components/shared/ErrorPage";
import ToastStack from "@components/shared/ToastStack";

const RootLayout = () => {
	const { isReady, isError } = useLoadAssets();

	const theme = useColorSchemeTheme();

	setBackgroundColorAsync(theme.colors.background);

	setNavigationBarColorAsync(theme.colors.background);

	if (!isReady) {
		return <ErrorPage />;
	}

	if (isError) {
		return <ErrorPage />;
	}

	return (
		<PaperProvider theme={theme}>
			<ThemeProvider value={theme}>
				<View
					style={{
						flex: 1,
						backgroundColor: theme.colors.background,
					}}
				>
					<Stack>
						<Stack.Screen
							name="(tabs)"
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="collection"
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="command"
							options={{ headerShown: false }}
						/>
					</Stack>
					<ToastStack />
				</View>
			</ThemeProvider>
		</PaperProvider>
	);
};

export default RootLayout;
