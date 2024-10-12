import { StyleSheet, View } from "react-native";

import {
	Button,
	Dialog,
	Portal,
	Text,
	List,
	useTheme,
} from "react-native-paper";

import ScrollView from "@components/ScrollView";

import useParameters from "@hooks/useParameters";
import useActiveStore from "@state/activeStore";
import useCommandData from "@hooks/useCommandData";
import useToastStore from "@state/toastStore";

interface IProps {
	isOpen: boolean;
	close: () => void;
}

const AddParameterDialog: React.FC<IProps> = ({ isOpen, close }) => {
	const [acid, acmid] = useActiveStore(state => [
		state.activeCollectionId!,
		state.activeCommandId!,
	]);

	const parameters = useParameters.get(acid);

	const addCommandData = useCommandData.insert(acmid);

	const add = useToastStore(state => state.add);

	const theme = useTheme();

	if (parameters.length === 0 && isOpen) {
		close();
		add("پارامتری برای این مجموعه تعریف نشده است");
		return null;
	}

	return (
		<Portal theme={theme}>
			<Dialog
				visible={isOpen}
				onDismiss={close}
			>
				<View style={styles.title}>
					<Text variant="titleMedium">انتخاب پارامتر</Text>
				</View>
				<Dialog.Content>
					<ScrollView>
						{parameters.map(p => (
							<List.Item
								style={styles.listItem}
								key={p.id}
								title={p.label}
								left={props => (
									<List.Icon
										{...props}
										icon="variable"
									/>
								)}
								onPress={() => {
									addCommandData({ param_id: p.id });
									close();
								}}
							/>
						))}
					</ScrollView>
				</Dialog.Content>
				<Dialog.Actions style={{ justifyContent: "flex-start" }}>
					<Button onPress={close}>بازگشت</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};

export default AddParameterDialog;

const styles = StyleSheet.create({
	title: {
		alignItems: "center",
		justifyContent: "flex-start",
		display: "flex",
		flexDirection: "row",
		paddingHorizontal: 25,
		paddingVertical: 10,
	},
	listItem: {
		padding: 20,
	},
});
