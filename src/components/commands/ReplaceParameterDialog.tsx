import { StyleSheet, View } from "react-native";

import {
	Button,
	Dialog,
	Portal,
	Text,
	List,
	useTheme,
} from "react-native-paper";

import ScrollView from "@components/shared/ScrollView";

import useActiveStore from "@state/activeStore";
import useToastStore from "@state/toastStore";
import useParameters from "@hooks/useParameters";
import useCommandData from "@hooks/useCommandData";

interface IProps {
	isOpen: boolean;
	close: () => void;
	cmddId: number;
	currentParamId: number;
}

const ReplaceParameterDialog: React.FC<IProps> = ({
	isOpen,
	close,
	cmddId,
	currentParamId,
}) => {
	const acid = useActiveStore(state => state.activeCollectionId!);

	const parameters = useParameters.get(acid);

	const edit = useCommandData.update(cmddId);

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
					<Text variant="titleMedium">تعویض پارامتر</Text>
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
										icon={
											currentParamId === p.id
												? "check"
												: "variable"
										}
									/>
								)}
								onPress={
									currentParamId !== p.id
										? () => {
												edit({ param_id: p.id });
												close();
											}
										: undefined
								}
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

export default ReplaceParameterDialog;

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
