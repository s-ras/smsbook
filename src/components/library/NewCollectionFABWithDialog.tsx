import { useState } from "react";

import { StyleSheet, View } from "react-native";

import {
	AnimatedFAB,
	Icon,
	Snackbar,
	useTheme,
	Text,
} from "react-native-paper";
import NewCollectionDialog from "@components/library/NewCollectionDialog";

interface IProps {
	isExtended: boolean;
}

const NewCollectionFABWithDialog: React.FC<IProps> = ({ isExtended }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [showSnack, setShowSnack] = useState<boolean>(false);

	const theme = useTheme();

	return (
		<>
			<AnimatedFAB
				icon="plus"
				style={styles.fab}
				onPress={() => setIsOpen(true)}
				variant="tertiary"
				label="افزودن مجموعه"
				extended={isExtended}
			/>
			<NewCollectionDialog
				isOpen={isOpen}
				close={() => setIsOpen(false)}
				showSnack={() => setShowSnack(true)}
			/>
			<Snackbar
				style={styles.snackbar}
				visible={showSnack}
				onDismiss={() => setShowSnack(false)}
				theme={theme}
				duration={1000}
				elevation={5}
				icon="check"
			>
				<View style={styles.snackbarContent}>
					<Icon
						source="check"
						color={theme.colors.scrim}
						size={20}
					/>
					<Text style={{ color: theme.colors.scrim }}>
						مجموعه جدید افزوده شد!
					</Text>
				</View>
			</Snackbar>
		</>
	);
};

export default NewCollectionFABWithDialog;

const styles = StyleSheet.create({
	fab: {
		position: "absolute",
		margin: 16,
		right: 0,
		bottom: 0,
	},
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
