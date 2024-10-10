import { View, StyleSheet } from "react-native";

import {
	Button,
	Dialog,
	Portal,
	RadioButton,
	Text,
	TouchableRipple,
	useTheme,
} from "react-native-paper";

import useStore from "@/state/store";

interface IProps {
	isOpen: boolean;
	close: () => void;
}

const SettingsThemeDialog: React.FC<IProps> = ({ isOpen, close }) => {
	const [preferedTheme, setPreferedTheme] = useStore(state => [
		state.preferedTheme,
		state.setPreferedTheme,
	]);

	const theme = useTheme();

	return (
		<Portal theme={theme}>
			<Dialog
				visible={isOpen}
				onDismiss={close}
			>
				<Dialog.Title>
					<Text>انتخاب پوسته</Text>
				</Dialog.Title>
				<Dialog.Content>
					<TouchableRipple
						onPress={() => {
							setPreferedTheme("AUTO");
							close();
						}}
					>
						<View style={styles.item}>
							<Text>خودکار</Text>
							<RadioButton.Android
								value="AUTO"
								status={
									preferedTheme === "AUTO"
										? "checked"
										: "unchecked"
								}
								onPress={() => {
									setPreferedTheme("AUTO");
									close();
								}}
							/>
						</View>
					</TouchableRipple>
					<TouchableRipple
						onPress={() => {
							setPreferedTheme("LIGHT");
							close();
						}}
					>
						<View style={styles.item}>
							<Text>روشن</Text>
							<RadioButton.Android
								value="LIGHT"
								status={
									preferedTheme === "LIGHT"
										? "checked"
										: "unchecked"
								}
								onPress={() => {
									setPreferedTheme("LIGHT");
									close();
								}}
							/>
						</View>
					</TouchableRipple>
					<TouchableRipple
						onPress={() => {
							setPreferedTheme("DARK");
							close();
						}}
					>
						<View style={styles.item}>
							<Text>تاریک</Text>
							<RadioButton.Android
								value="DARK"
								status={
									preferedTheme === "DARK"
										? "checked"
										: "unchecked"
								}
								onPress={() => {
									setPreferedTheme("DARK");
									close();
								}}
							/>
						</View>
					</TouchableRipple>
				</Dialog.Content>
				<Dialog.Actions style={{ justifyContent: "flex-start" }}>
					<Button onPress={close}>بازگشت</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};

export default SettingsThemeDialog;

const styles = StyleSheet.create({
	item: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});
