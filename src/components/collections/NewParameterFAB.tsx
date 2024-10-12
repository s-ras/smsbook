import { useState } from "react";

import { StyleSheet } from "react-native";

import { AnimatedFAB } from "react-native-paper";

import NewParameterDialog from "@components/collections/NewParameterDialog";

interface IProps {
	isExtended: boolean;
}

const NewParameterFAB: React.FC<IProps> = ({ isExtended }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<AnimatedFAB
				icon="plus"
				style={styles.fab}
				onPress={() => setIsOpen(true)}
				variant="tertiary"
				label="افزودن پارامتر"
				extended={isExtended}
			/>
			<NewParameterDialog
				isOpen={isOpen}
				close={() => setIsOpen(false)}
			/>
		</>
	);
};

export default NewParameterFAB;

const styles = StyleSheet.create({
	fab: {
		position: "absolute",
		margin: 16,
		right: 0,
		bottom: 0,
	},
});
