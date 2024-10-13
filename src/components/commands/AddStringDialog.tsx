import { useState } from "react";

import { StyleSheet, View } from "react-native";

import {
	Button,
	Dialog,
	Portal,
	Text,
	TextInput,
	useTheme,
} from "react-native-paper";

import useActiveStore from "@state/activeStore";
import useCommandData from "@hooks/useCommandData";

import ScrollView from "@components/shared/ScrollView";

interface IProps {
	isOpen: boolean;
	close: () => void;
}

const AddStringDialog: React.FC<IProps> = ({ isOpen, close }) => {
	const acid = useActiveStore(state => state.activeCommandId!);

	const [value, setValue] = useState<string>("");

	const add = useCommandData.insert(acid);

	const theme = useTheme();

	const handleConfirm = () => {
		add({ data: value });
		setValue("");
		close();
	};

	const handleClose = () => {
		setValue("");
		close();
	};

	return (
		<Portal theme={theme}>
			<Dialog
				visible={isOpen}
				onDismiss={handleClose}
			>
				<View style={styles.title}>
					<Text variant="titleMedium">افزودن متن</Text>
				</View>
				<Dialog.Content>
					<ScrollView>
						<TextInput
							mode="outlined"
							value={value}
							label="مقدار"
							autoFocus
							autoCapitalize="none"
							onChangeText={text => setValue(text)}
							left={<TextInput.Icon icon="format-text" />}
						/>
					</ScrollView>
				</Dialog.Content>
				<Dialog.Actions style={{ justifyContent: "space-between" }}>
					<Button onPress={handleClose}>بازگشت</Button>
					<Button
						onPress={handleConfirm}
						disabled={value.length === 0}
					>
						تایید
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};

export default AddStringDialog;

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
