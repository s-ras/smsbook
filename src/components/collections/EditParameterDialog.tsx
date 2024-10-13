import { useEffect, useState } from "react";

import { StyleSheet, View } from "react-native";

import {
	Button,
	Dialog,
	Portal,
	Text,
	TextInput,
	useTheme,
} from "react-native-paper";

import useToastStore from "@state/toastStore";
import useParameters from "@hooks/useParameters";

import ScrollView from "@components/shared/ScrollView";
import DeleteParameterButton from "@components/collections/DeleteParameterButton";

interface IProps {
	paramId: number;
	isOpen: boolean;
	close: () => void;
}

const EditParameterDialog: React.FC<IProps> = ({ paramId, isOpen, close }) => {
	const add = useToastStore(state => state.add);

	const current = useParameters.select(paramId);
	const edit = useParameters.update(paramId);

	const [label, setLabel] = useState<string>("");
	const [value, setValue] = useState<string>("");

	useEffect(() => {
		if (current) {
			setLabel(current.label);
			setValue(current.value);
		}
	}, [current]);

	const handleConfirm = () => {
		edit({
			label: label ? label : undefined,
			value: value ? value : undefined,
		});
		add("پارامتر ویرایش شد");
		close();
		setLabel(current.label);
		setValue(current.value);
	};

	const handleCancel = () => {
		close();
		setLabel(current.label);
		setValue(current.value);
	};

	const theme = useTheme();

	if (!current) {
		return null;
	}

	return (
		<Portal theme={theme}>
			<Dialog
				visible={isOpen}
				onDismiss={handleCancel}
			>
				<View style={styles.title}>
					<Text variant="titleMedium">ویرایش پارامتر</Text>
					<DeleteParameterButton
						paramId={paramId}
						callback={close}
					/>
				</View>
				<Dialog.Content>
					<ScrollView>
						<TextInput
							mode="outlined"
							value={label}
							label="نام"
							autoFocus
							autoCapitalize="none"
							onChangeText={text => setLabel(text)}
							left={
								<TextInput.Icon icon="application-variable-outline" />
							}
						/>
						<TextInput
							mode="outlined"
							value={value}
							label="مقدار"
							onChangeText={text => setValue(text)}
							left={<TextInput.Icon icon="variable" />}
						/>
					</ScrollView>
				</Dialog.Content>
				<Dialog.Actions style={{ justifyContent: "space-between" }}>
					<Button onPress={handleCancel}>بازگشت</Button>
					<Button
						onPress={handleConfirm}
						disabled={
							label.trim().length === 0 ||
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

export default EditParameterDialog;

const styles = StyleSheet.create({
	title: {
		alignItems: "center",
		justifyContent: "space-between",
		display: "flex",
		flexDirection: "row",
		paddingHorizontal: 25,
	},
});
