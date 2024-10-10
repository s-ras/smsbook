import { Redirect, Tabs, useRouter } from "expo-router";

import { Appbar, Icon } from "react-native-paper";

import MaterialTopTabs from "@components/navigation/MaterialTopTabs";

import useActiveStore from "@state/activeStore";
import useCollection from "@hooks/useCollections";

const CollectionLayout: React.FC = () => {
	const router = useRouter();

	const acid = useActiveStore(state => state.activeCollectionId!);

	const collection = useCollection.select(acid);

	if (!acid) {
		return <Redirect href="/(tabs)/library" />;
	}

	return (
		<>
			<Appbar.Header elevated>
				<Appbar.BackAction
					onPress={() => {
						router.back();
					}}
				/>
				<Appbar.Content title={collection?.name} />
				<Appbar.Action
					icon="square-edit-outline"
					onPress={() => {}}
				/>
				<Appbar.Action
					icon="trash-can-outline"
					onPress={() => {}}
				/>
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
