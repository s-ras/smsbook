import { StyleSheet } from "react-native";

import { useRouter } from "expo-router";

import { List } from "react-native-paper";

import useActiveStore from "@state/activeStore";

import { SelectCommands } from "@schema/commands";

interface IProps {
	command: SelectCommands;
}

const CommandsEntry: React.FC<IProps> = ({ command }) => {
	const router = useRouter();
	const setActiveCommandId = useActiveStore(
		state => state.setActiveCommandId
	);

	return (
		<List.Item
			style={styles.listItem}
			title={command.name}
			left={props => (
				<List.Icon
					{...props}
					icon="wrench"
				/>
			)}
			right={props => (
				<List.Icon
					{...props}
					icon="arrow-left"
				/>
			)}
			onPress={() => {
				setActiveCommandId(command.id);
				router.push("/command");
			}}
		/>
	);
};

export default CommandsEntry;

const styles = StyleSheet.create({
	content: {
		flex: 1,
		padding: 0,
		overflow: "hidden",
		display: "flex",
		gap: 20,
	},
	listItem: {
		padding: 20,
	},
});
