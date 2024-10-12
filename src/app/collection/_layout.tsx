import { Redirect, Tabs, useRouter } from "expo-router";

import { Appbar, Icon } from "react-native-paper";

import MaterialTopTabs from "@components/navigation/MaterialTopTabs";

import useActiveStore from "@state/activeStore";
import useCollections from "@hooks/useCollections";
import DeleteCollectionAction from "@components/collections/DeleteCollectionAction";
import EditCollectionAction from "@components/collections/EditCollectionAction";
import { useEffect } from "react";

const CollectionLayout: React.FC = () => {
	const router = useRouter();

	const [acid, reset] = useActiveStore(state => [
		state.activeCollectionId!,
		state.reset,
	]);

	const collection = useCollections.select(acid);

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
			<Appbar.Header elevated>
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
				screenOptions={{
					swipeEnabled: false,
					tabBarItemStyle: {
						flexDirection: "row",
					},
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
