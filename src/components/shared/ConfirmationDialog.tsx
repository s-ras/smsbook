import { StyleSheet, View } from "react-native";

import { Button, Dialog, Portal, Text, useTheme } from "react-native-paper";

interface IProps {
	isOpen: boolean;
	close: () => void;
	onConfirm: () => void;
	title: string;
	description?: string;
}

const ConfirmationDialog: React.FC<IProps> = ({
	isOpen,
	close,
	onConfirm,
	title,
	description,
}) => {
	const theme = useTheme();

	return (
		<Portal theme={theme}>
			<Dialog
				visible={isOpen}
				onDismiss={close}
			>
				<View style={styles.title}>
					<Text variant="titleMedium">{title}</Text>
				</View>
				{description && (
					<Dialog.Content>
						<Text>{description}</Text>
					</Dialog.Content>
				)}
				<Dialog.Actions style={{ justifyContent: "space-between" }}>
					<Button onPress={close}>لغو</Button>
					<Button onPress={onConfirm}>تایید</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};

export default ConfirmationDialog;

const styles = StyleSheet.create({
	title: {
		alignItems: "center",
		justifyContent: "flex-start",
		display: "flex",
		flexDirection: "row",
		paddingHorizontal: 25,
		paddingVertical: 10,
	},
});
