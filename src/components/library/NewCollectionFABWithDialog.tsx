import { useState } from "react";

import { StyleSheet } from "react-native";

import { AnimatedFAB } from "react-native-paper";

import NewCollectionDialog from "@components/library/NewCollectionDialog";

interface IProps {
	isExtended: boolean;
}

const NewCollectionFABWithDialog: React.FC<IProps> = ({ isExtended }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

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
			/>
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
});
