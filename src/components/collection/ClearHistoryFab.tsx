import { useState } from "react";

import { StyleSheet, View } from "react-native";

import {
	AnimatedFAB,
	Icon,
	Snackbar,
	useTheme,
	Text,
} from "react-native-paper";

import ClearHistoryDialog from "./ClearHistoryDialog";

interface IProps {
	isExtended: boolean;
}

const ClearHistoryFAB: React.FC<IProps> = ({ isExtended }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [showSnack, setShowSnack] = useState<boolean>(false);

	const theme = useTheme();

	return (
		<>
			<AnimatedFAB
				icon="notification-clear-all"
				style={styles.fab}
				onPress={() => setIsOpen(true)}
				variant="tertiary"
				label="پاکسازی تاریخچه"
				extended={isExtended}
			/>
			<ClearHistoryDialog
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
						تاریخچه پاک شد!
					</Text>
				</View>
			</Snackbar>
		</>
	);
};

export default ClearHistoryFAB;

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
