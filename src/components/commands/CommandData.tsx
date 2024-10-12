import { View, StyleSheet } from "react-native";

import ScrollView from "@components/ScrollView";
import useCommandData from "@hooks/useCommandData";
import useActiveStore from "@state/activeStore";
import ParameterEntry from "./ParameterEntry";
import StringEntry from "./StringEntry";
import { Icon, Surface, Text } from "react-native-paper";

const CommandData: React.FC = () => {
	const acid = useActiveStore(state => state.activeCommandId!);

	const command_data = useCommandData.get(acid);

	return (
		<View style={styles.main}>
			{command_data.length > 0 ? (
				<Surface
					style={styles.content}
					elevation={5}
					mode="elevated"
				>
					<ScrollView>
						{command_data.map(d => {
							if (d.parameters) {
								return (
									<ParameterEntry
										key={d.command_data.id}
										cmd={d.command_data}
										param={d.parameters}
									/>
								);
							} else {
								return (
									<StringEntry
										key={d.command_data.id}
										cmd={d.command_data}
									/>
								);
							}
						})}
					</ScrollView>
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
