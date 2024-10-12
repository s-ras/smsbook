import { Redirect, Tabs, useRouter } from "expo-router";

import { Appbar, Icon, useTheme } from "react-native-paper";

import useActiveStore from "@state/activeStore";
import useCollections from "@hooks/useCollections";
import DeleteCollectionAction from "@components/collections/DeleteCollectionAction";
import EditCollectionAction from "@components/collections/EditCollectionAction";
import { useEffect } from "react";
import MaterialTopTabs from "@components/navigation/MaterialTopTabs";

const CollectionLayout: React.FC = () => {
	const router = useRouter();

	const [acid, reset] = useActiveStore(state => [
		state.activeCollectionId!,
		state.reset,
	]);

	const collection = useCollections.select(acid);

	const theme = useTheme();

	if (!acid) {
		return <Redirect href="/(tabs)/library" />;
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		return () => {
			reset();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Appbar.Header
				elevated
				style={{ elevation: 0 }}
			>
				<Appbar.BackAction
					onPress={() => {
						router.navigate("/(tabs)/library");
					}}
				/>
				<Appbar.Content title={collection?.name} />
				<EditCollectionAction />
				<DeleteCollectionAction />
			</Appbar.Header>
			<MaterialTopTabs
				tabBarPosition="top"
				screenOptions={{
					swipeEnabled: false,
					tabBarItemStyle: {
						flexDirection: "row",
					},
					tabBarLabelStyle: {
						fontFamily: "Vazirmatn_500Medium",
					},
					tabBarStyle: {
						backgroundColor: theme.colors.elevation.level2,
						height: 50,
					},
					tabBarActiveTintColor: theme.colors.primary,
					tabBarInactiveTintColor: theme.colors.onSurface,
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: "دستورها",
						tabBarIcon: ({ color, focused }) => {
							return (
								<Icon
									color={color}
									source={
										focused ? "wrench" : "wrench-outline"
									}
									size={25}
								/>
							);
						},
					}}
				/>
				<Tabs.Screen
					name="parameters"
					options={{
						title: "پارامترها",
						tabBarIcon: ({ color, focused }) => {
							return (
								<Icon
									color={color}
									source={
										focused
											? "application-variable"
											: "application-variable-outline"
									}
									size={25}
								/>
							);
						},
					}}
				/>
				<Tabs.Screen
					name="history"
					options={{
						title: "تاریخچه",
						tabBarIcon: ({ color, focused }) => {
							return (
								<Icon
									color={color}
									source={
										focused
											? "calendar-text"
											: "calendar-text-outline"
									}
									size={25}
								/>
							);
						},
					}}
				/>
			</MaterialTopTabs>
		</>
	);
};

export default CollectionLayout;
