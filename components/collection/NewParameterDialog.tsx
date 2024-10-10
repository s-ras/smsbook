import { useState } from "react";

import {
	Button,
	Dialog,
	Portal,
	Text,
	TextInput,
	useTheme,
} from "react-native-paper";

import useStore from "@/state/store";

import ScrollView from "@/components/ScrollView";
import useActiveStore from "@/state/activeStore";

interface IProps {
	isOpen: boolean;
	close: () => void;
	showSnack: () => void;
}

const NewParameterDialog: React.FC<IProps> = ({ isOpen, close, showSnack }) => {
	const activeCollectionUUID = useActiveStore(
		state => state.activeCollectionUUID
	);
	const addParameterToCollection = useStore(
		state => state.addParameterToCollection
	);

	const [name, setName] = useState<string>("");
	const [value, setValue] = useState<string>("");

	const handleConfirm = () => {
		console.log(activeCollectionUUID);
		console.log(name);
		console.log(value);
		addParameterToCollection(activeCollectionUUID!, {
			name,
			value,
		});
		showSnack();
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
				<Dialog.Title>
					<Text>افزودن پارامتر جدید</Text>
				</Dialog.Title>
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
