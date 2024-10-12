import { useState } from "react";

import { StyleSheet, View } from "react-native";

import { SelectCommandData } from "@schema/command_data";

import { List, useTheme, Text, Menu } from "react-native-paper";
import RemoveMenuItem from "./RemoveMenuItem";
import EditStringMenuItem from "./EditStringMenuItem";

interface IProps {
	cmd: SelectCommandData;
}

const StringEntry: React.FC<IProps> = ({ cmd }) => {
	const theme = useTheme();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const color =
		cmd.order % 2 === 0
			? theme.colors.inversePrimary
			: theme.colors.primaryContainer;

	return (
		<Menu
			visible={isOpen}
			onDismiss={() => setIsOpen(false)}
			anchorPosition="bottom"
			anchor={
				<List.Item
					style={{ ...styles.listItem, backgroundColor: color }}
					title={cmd.data}
					left={props => (
						<View style={styles.leftSide}>
							<Text
								variant="titleMedium"
								style={{ fontSize: 15 }}
							>
								{cmd.order}
							</Text>
							<List.Icon
								{...props}
								icon="format-text"
							/>
						</View>
					)}
					onPress={() => setIsOpen(true)}
				/>
			}
		>
			<RemoveMenuItem
				cmddId={cmd.id}
				type="string"
				close={() => setIsOpen(false)}
			/>
			<EditStringMenuItem
				cmddId={cmd.id}
				close={() => setIsOpen(false)}
			/>
		</Menu>
	);
};

export default StringEntry;

const styles = StyleSheet.create({
	listItem: {
		padding: 20,
	},
	leftSide: {
		height: "100%",
		display: "flex",
		flexDirection: "row",
		gap: 2,
		alignItems: "center",
		justifyContent: "center",
	},
});
