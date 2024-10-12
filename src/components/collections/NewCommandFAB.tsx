import { useState } from "react";

import { StyleSheet } from "react-native";

import { AnimatedFAB } from "react-native-paper";

import NewCommandDialog from "@components/collections/NewCommandDialog";

interface IProps {
	isExtended: boolean;
}

const NewCommandFAB: React.FC<IProps> = ({ isExtended }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<AnimatedFAB
				icon="plus"
				style={styles.fab}
				onPress={() => setIsOpen(true)}
				variant="tertiary"
				label="افزودن دستور"
				extended={isExtended}
			/>
			<NewCommandDialog
				isOpen={isOpen}
				close={() => setIsOpen(false)}
			/>
		</>
	);
};

export default NewCommandFAB;

const styles = StyleSheet.create({
	fab: {
		position: "absolute",
		margin: 16,
		right: 0,
		bottom: 0,
	},
});
