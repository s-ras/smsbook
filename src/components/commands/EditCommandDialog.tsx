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

import useActiveStore from "@state/activeStore";
import useToastStore from "@state/toastStore";
import useCommands from "@hooks/useCommands";

import ScrollView from "@components/shared/ScrollView";

interface IProps {
	isOpen: boolean;
	close: () => void;
}

const EditCommandDialog: React.FC<IProps> = ({ isOpen, close }) => {
	const acid = useActiveStore(state => state.activeCommandId!);

	const add = useToastStore(state => state.add);

	const current = useCommands.select(acid);
	const edit = useCommands.update(acid);

	const [name, setName] = useState<string>("");

	useEffect(() => {
		if (current) {
			setName(current.name);
		}
	}, [current]);

	const handleConfirm = () => {
		edit(name);
		add("دستور ویرایش شد");
		close();
		setName(current.name);
	};

	const handleCancel = () => {
		close();
		setName(current.name);
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
					<Text variant="titleMedium">ویرایش دستور</Text>
				</View>
				<Dialog.Content>
					<ScrollView>
						<TextInput
							mode="outlined"
							value={name}
							label="نام"
							autoFocus
							autoCapitalize="none"
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

export default EditCommandDialog;

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
