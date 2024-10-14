import { View, StyleSheet } from "react-native";

import * as Haptics from "expo-haptics";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import DraggableFlatList, {
	ScaleDecorator,
} from "react-native-draggable-flatlist";

import { Icon, Surface, Text } from "react-native-paper";

import useActiveStore from "@state/activeStore";
import useCommandData from "@hooks/useCommandData";

import ParameterEntry from "@components/commands/ParameterEntry";
import StringEntry from "@components/commands/StringEntry";

const CommandData: React.FC = () => {
	const acid = useActiveStore(state => state.activeCommandId!);

	const command_data = useCommandData.get(acid);
	const reorder = useCommandData.reorderByOrder();

	return (
		<View style={styles.main}>
			{command_data.length > 0 ? (
				<Surface
					style={styles.content}
					elevation={1}
					mode="elevated"
				>
					<GestureHandlerRootView style={{ flex: 1 }}>
						<DraggableFlatList
							data={command_data}
							keyExtractor={item =>
								item.command_data.id.toString()
							}
							onDragEnd={({ from, to }) => {
								reorder(from + 1, to + 1);
							}}
							onDragBegin={() => {
								Haptics.impactAsync(
									Haptics.ImpactFeedbackStyle.Heavy
								);
							}}
							renderItem={({ item, drag, isActive }) => {
								if (item.parameters) {
									return (
										<ScaleDecorator>
											<ParameterEntry
												key={item.command_data.id}
												cmd={item.command_data}
												param={item.parameters}
												drag={drag}
											/>
										</ScaleDecorator>
									);
								} else {
									return (
										<ScaleDecorator>
											<StringEntry
												key={item.command_data.id}
												cmd={item.command_data}
												drag={drag}
											/>
										</ScaleDecorator>
									);
								}
							}}
						/>
					</GestureHandlerRootView>
				</Surface>
			) : (
				<View style={styles.noContent}>
					<Icon
						source="alert-decagram-outline"
						size={100}
					/>
					<Text variant="labelLarge">
						داده‌ای برای این دستور وجود ندارد
					</Text>
				</View>
			)}
		</View>
	);
};

export default CommandData;

const styles = StyleSheet.create({
	main: {
		flex: 1,
	},
	content: {
		flex: 1,
		padding: 0,
		overflow: "hidden",
		display: "flex",
		gap: 20,
		marginBottom: 20,
		borderRadius: 20,
		marginHorizontal: 20,
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
