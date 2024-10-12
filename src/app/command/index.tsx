import ButtonBox from "@components/commands/ButtonBox";
import CommandData from "@components/commands/CommandData";

import { StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const Index: React.FC = () => {
	return (
		<SafeAreaView style={styles.main}>
			<ButtonBox />
			<CommandData />
		</SafeAreaView>
	);
};

export default Index;

const styles = StyleSheet.create({
	main: {
		flex: 1,
	},
});
