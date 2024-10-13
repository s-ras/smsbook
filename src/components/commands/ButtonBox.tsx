import { StyleSheet, View } from "react-native";

import { Surface } from "react-native-paper";

import AddParameterButton from "@components/commands/AddParameterButton";
import AddStringButton from "@components/commands/AddStringButton";

const ButtonBox: React.FC = () => {
	return (
		<View style={style.wrapper}>
			<Surface
				style={style.surface}
				elevation={5}
				mode="elevated"
			>
				<AddParameterButton />
				<AddStringButton />
			</Surface>
		</View>
	);
};

export default ButtonBox;

const style = StyleSheet.create({
	wrapper: {
		width: "100%",
		paddingHorizontal: 20,
		paddingBottom: 25,
	},
	surface: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 10,
		paddingVertical: 15,
		borderRadius: 20,
		gap: 20,
	},
});
