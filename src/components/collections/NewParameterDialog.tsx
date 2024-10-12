import { useState } from "react";

import { StyleSheet } from "react-native";

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
import useParameters from "@hooks/useParameters";
import useToastStore from "@state/toastStore";
import { View } from "react-native";

interface IProps {
	isOpen: boolean;
	close: () => void;
}

const NewParameterDialog: React.FC<IProps> = ({ isOpen, close }) => {
	const acid = useActiveStore(state => state.activeCollectionId!);

	const add = useToastStore(state => state.add);

	const addParam = useParameters.insert(acid);

	const [name, setName] = useState<string>("");
	const [value, setValue] = useState<string>("");

	const handleConfirm = () => {
		addParam(name, value);
		add("پارامتر جدید افزوده شد");
		close();
		setName("");
		setValue("");
	};

	const handleCancel = () => {
		close();
		setName("");
		setValue("");
	};

	const theme = useTheme();

	return (
		<Portal theme={theme}>
			<Dialog
				visible={isOpen}
				onDismiss={handleCancel}
			>
				<View style={styles.title}>
					<Text variant="titleMedium">افزودن پارامتر جدید</Text>
				</View>
				<Dialog.Content>
					<ScrollView>
						<TextInput
							mode="outlined"
							value={name}
							label="نام"
							onChangeText={text => setName(text.trim())}
							left={
								<TextInput.Icon icon="application-variable-outline" />
							}
						/>
						<TextInput
							mode="outlined"
							value={value}
							label="مقدار"
							onChangeText={text => setValue(text.trim())}
							left={<TextInput.Icon icon="variable" />}
						/>
					</ScrollView>
				</Dialog.Content>
				<Dialog.Actions style={{ justifyContent: "space-between" }}>
					<Button onPress={handleCancel}>بازگشت</Button>
					<Button
						onPress={handleConfirm}
						disabled={
							name.trim().length === 0 ||
							value.trim().length === 0
						}
					>
						تایید
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};

export default NewParameterDialog;

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
