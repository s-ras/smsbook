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

import ScrollView from "@components/ScrollView";
import useActiveStore from "@state/activeStore";
import useToastStore from "@state/toastStore";
import useCommands from "@hooks/useCommands";

interface IProps {
	isOpen: boolean;
	close: () => void;
}

const NewCommandDialog: React.FC<IProps> = ({ isOpen, close }) => {
	const acid = useActiveStore(state => state.activeCollectionId!);

	const add = useToastStore(state => state.add);

	const addCommand = useCommands.insert(acid);

	const [name, setName] = useState<string>("");

	const handleConfirm = () => {
		addCommand(name);
		add("دستور جدید افزوده شد");
		close();
		setName("");
	};

	const handleCancel = () => {
		close();
		setName("");
	};

	const theme = useTheme();

	return (
		<Portal theme={theme}>
			<Dialog
				visible={isOpen}
				onDismiss={handleCancel}
			>
				<View style={styles.title}>
					<Text variant="titleMedium">افزودن دستور جدید</Text>
				</View>
				<Dialog.Content>
					<ScrollView>
						<TextInput
							mode="outlined"
							value={name}
							label="نام"
							onChangeText={text => setName(text)}
							left={
								<TextInput.Icon icon="application-variable-outline" />
							}
						/>
					</ScrollView>
				</Dialog.Content>
				<Dialog.Actions style={{ justifyContent: "space-between" }}>
					<Button onPress={handleCancel}>بازگشت</Button>
					<Button
						onPress={handleConfirm}
						disabled={name.trim().length === 0}
					>
						تایید
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};

export default NewCommandDialog;

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
