import { FlatList, StyleSheet, View } from "react-native";

import { Icon, Text, useTheme } from "react-native-paper";

import useCommands from "@hooks/useCommands";

import Command from "@components/mainpage/Command";

interface IProps {
	cid: number;
}

const CommandsGrid: React.FC<IProps> = ({ cid }) => {
	const commands = useCommands.get(cid);

	const theme = useTheme();

	return (
		<View
			style={{
				...styles.container,
				backgroundColor: theme.colors.inverseOnSurface,
			}}
		>
			{commands.length > 0 ? (
				<View style={styles.content}>
					<FlatList
						style={styles.list}
						numColumns={2}
						data={commands}
						renderItem={({ item }) => <Command cmd={item} />}
						keyExtractor={c => c.id.toString()}
					/>
				</View>
			) : (
				<View style={styles.noCommands}>
					<Icon
						source="progress-wrench"
						size={60}
					/>
					<Text variant="labelLarge">
						دستوری برای این مجموعه تعریف نشده‌است
					</Text>
				</View>
			)}
		</View>
	);
};

export default CommandsGrid;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 22,
		paddingTop: 30,
		padding: 10,
		width: "85%",
		borderBottomLeftRadius: 22,
		borderBottomRightRadius: 22,
	},
	noCommands: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		paddingVertical: 20,
	},
	content: {
		width: "100%",
	},
	list: {
		flex: 2,
	},
});
