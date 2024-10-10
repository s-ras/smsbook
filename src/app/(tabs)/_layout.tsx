import { Tabs } from "expo-router";

import { Appbar, Icon } from "react-native-paper";

import MaterialBottomTabs from "@components/navigation/MaterialBottomTabs";

const TabLayout = () => {
	return (
		<>
			<Appbar.Header>
				<Appbar.Content
					title="ارسال پیامک"
					titleStyle={{ textAlign: "center" }}
				/>
			</Appbar.Header>
			<MaterialBottomTabs>
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
