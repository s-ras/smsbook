import { StyleSheet, View } from "react-native";

import { Icon, Text } from "react-native-paper";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import DraggableFlatList, {
	ScaleDecorator,
} from "react-native-draggable-flatlist";

import useCollections from "@hooks/useCollections";

import Collection from "@components/mainpage/Collection";

const Index = () => {
	const collections = useCollections.get();
	const reorder = useCollections.reorder();

	return (
		<View style={styles.main}>
			{collections.length > 0 ? (
				<GestureHandlerRootView style={{ flex: 1 }}>
					<DraggableFlatList
						data={collections}
						renderItem={({ item, drag, isActive }) => (
							<ScaleDecorator>
								<Collection
									c={item}
									drag={drag}
									isDragging={isActive}
								/>
							</ScaleDecorator>
						)}
						onDragEnd={({ from, to }) => {
							reorder(from + 1, to + 1);
						}}
						keyExtractor={c => c.id.toString()}
					/>
				</GestureHandlerRootView>
			) : (
				<View style={styles.noContent}>
					<Icon
						source="book-alert-outline"
						size={100}
					/>
					<Text variant="labelLarge">مجموعه‌ای وجود ندارد!</Text>
				</View>
			)}
		</View>
	);
};

export default Index;

const styles = StyleSheet.create({
	main: {
		flex: 1,
	},
	content: {
		flex: 1,
		padding: 0,
	},
	noContent: {
		flex: 1,
		padding: 5,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
	},
});
