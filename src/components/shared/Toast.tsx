import { useState } from "react";

import { StyleSheet, View } from "react-native";

import { Icon, Snackbar, useTheme, Text } from "react-native-paper";

import useToastStore from "@state/toastStore";

interface IProps {
	id: string;
	text: string;
	icon: string;
}

const Toast: React.FC<IProps> = ({ text, icon, id }) => {
	const theme = useTheme();
	const [show, setShow] = useState<boolean>(true);
	const remove = useToastStore(state => state.remove);

	return (
		<Snackbar
			style={{
				...styles.snackbar,
				backgroundColor: theme.colors.surface,
			}}
			visible={show}
			onDismiss={() => {
				setShow(false);
				remove(id);
			}}
			theme={theme}
			duration={1000}
			elevation={5}
		>
			<View style={styles.snackbarContent}>
				<Icon
					source={icon}
					size={20}
				/>
				<Text variant="labelMedium">{text}</Text>
			</View>
		</Snackbar>
	);
};

export default Toast;

const styles = StyleSheet.create({
	snackbarContent: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		gap: 15,
	},
	snackbar: {
		position: "absolute",
		right: 0,
		bottom: 80,
		left: 0,
	},
});
