import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const ErrorPage: React.FC = () => {
	return (
		<View style={styles.wrapper}>
			<Text>خطایی رخ داده است</Text>
		</View>
	);
};

export default ErrorPage;

const styles = StyleSheet.create({
	wrapper: {
		width: "100%",
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
});
