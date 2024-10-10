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

interface IProps {
	isOpen: boolean;
	close: () => void;
	showSnack: () => void;
}

const NewCollectionDialog: React.FC<IProps> = ({
	isOpen,
	close,
	showSnack,
}) => {
	const addCollection = useStore(state => state.addCollection);

	const [name, setName] = useState<string>("");
	const [phone, setPhone] = useState<string>("");

	const validate = () => {
		const regex =
			/((0?9)|(\+?989))((14)|(13)|(12)|(19)|(18)|(17)|(15)|(16)|(11)|(10)|(90)|(91)|(92)|(93)|(94)|(95)|(96)|(32)|(30)|(33)|(35)|(36)|(37)|(38)|(39)|(00)|(01)|(02)|(03)|(04)|(05)|(41)|(20)|(21)|(22)|(23)|(31)|(34)|(9910)|(9911)|(9913)|(9914)|(9999)|(999)|(990)|(9810)|(9811)|(9812)|(9813)|(9814)|(9815)|(9816)|(9817)|(998))\W?\d{3}\W?\d{4}/g;
		return regex.test(phone);
	};

	const handleConfirm = () => {
		addCollection({ name, number: phone });
		showSnack();
		close();
		setName("");
		setPhone("");
	};

	const handleCancel = () => {
		close();
		setName("");
		setPhone("");
	};

	const theme = useTheme();

	return (
		<Portal theme={theme}>
			<Dialog
				visible={isOpen}
				onDismiss={handleCancel}
			>
				<Dialog.Title>
					<Text>افزودن مجموعه جدید</Text>
				</Dialog.Title>
				<Dialog.Content>
					<ScrollView>
						<TextInput
							mode="outlined"
							value={name}
							label="نام مجموعه"
							onChangeText={text => setName(text)}
							left={<TextInput.Icon icon="book" />}
						/>
						<TextInput
							mode="outlined"
							value={phone}
							label="شماره تلفن"
							onChangeText={text => setPhone(text.trim())}
							left={<TextInput.Icon icon="phone" />}
							error={!validate() && phone.trim().length >= 11}
							keyboardType="number-pad"
						/>
					</ScrollView>
				</Dialog.Content>
				<Dialog.Actions style={{ justifyContent: "space-between" }}>
					<Button onPress={handleCancel}>بازگشت</Button>
					<Button
						onPress={handleConfirm}
						disabled={name.trim().length === 0 || !validate()}
					>
						تایید
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};
export default NewCollectionDialog;
