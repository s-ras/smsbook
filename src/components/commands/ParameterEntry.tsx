import { StyleSheet, View } from "react-native";

import { SelectCommandData } from "@schema/command_data";
import { SelectParameters } from "@schema/parameters";
import { List, useTheme, Text, Menu } from "react-native-paper";
import { useState } from "react";
import RemoveMenuItem from "./RemoveMenuItem";
import ReplaceParameterMenuItem from "./ReplaceParameterMenuItem";

interface IProps {
	cmd: SelectCommandData;
	param: SelectParameters;
}

const ParameterEntry: React.FC<IProps> = ({ cmd, param }) => {
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
					title={param.label}
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
								icon="variable"
							/>
						</View>
					)}
					onPress={() => setIsOpen(true)}
				/>
			}
		>
			<RemoveMenuItem
				cmddId={cmd.id}
				type="parameter"
				close={() => setIsOpen(false)}
			/>
			<ReplaceParameterMenuItem
				cmddId={cmd.id}
				currentParamId={cmd.param_id!}
				close={() => setIsOpen(false)}
			/>
		</Menu>
	);
};

export default ParameterEntry;

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
