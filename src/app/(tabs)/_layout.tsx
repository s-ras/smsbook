import { StatusBar } from "react-native";

import { Tabs } from "expo-router";
import { setBackgroundColorAsync as setNavigationBarColorAsync } from "expo-navigation-bar";

import { Appbar, Icon, useTheme } from "react-native-paper";

import useColorScheme from "@hooks/useColorScheme";

import MaterialBottomTabs from "@components/navigation/MaterialBottomTabs";

const TabLayout = () => {
	const colorScheme = useColorScheme();

	const theme = useTheme();

	setNavigationBarColorAsync(theme.colors.elevation.level2);

	return (
		<>
			<StatusBar
				barStyle={
					colorScheme === "DARK" ? "light-content" : "dark-content"
				}
			/>
			<Appbar.Header>
				<Appbar.Content
					title="ارسال پیامک"
					titleStyle={{ textAlign: "center", fontSize: 20 }}
				/>
			</Appbar.Header>
			<MaterialBottomTabs theme={theme}>
				<Tabs.Screen
					name="index"
					options={{
						title: "خانه",
						tabBarIcon: ({ color, focused }) => {
							return (
								<Icon
									source={focused ? "home" : "home-outline"}
									color={color}
									size={25}
								/>
							);
						},
					}}
				/>
				<Tabs.Screen
					name="library"
					options={{
						title: "کتابخانه",
						tabBarIcon: ({ color, focused }) => {
							return (
								<Icon
									source={
										focused ? "archive" : "archive-outline"
									}
									color={color}
									size={25}
								/>
							);
						},
					}}
				/>
				<Tabs.Screen
					name="settings"
					options={{
						title: "تنظیمات",
						tabBarIcon: ({ color, focused }) => {
							return (
								<Icon
									source={
										focused ? "wrench" : "wrench-outline"
									}
									color={color}
									size={25}
								/>
							);
						},
					}}
				/>
			</MaterialBottomTabs>
		</>
	);
};

export default TabLayout;
