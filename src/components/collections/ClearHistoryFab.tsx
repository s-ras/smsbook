import { useState } from "react";

import { StyleSheet } from "react-native";

import { AnimatedFAB } from "react-native-paper";

import ConfirmationDialog from "@components/shared/ConfirmationDialog";
import useToastStore from "@state/toastStore";
import useJournal from "@hooks/useJournal";
import useActiveStore from "@state/activeStore";

interface IProps {
	isExtended: boolean;
}

const ClearHistoryFAB: React.FC<IProps> = ({ isExtended }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const acid = useActiveStore(state => state.activeCollectionId!);

	const purge = useJournal.purge(acid);

	const add = useToastStore(state => state.add);

	const onConfirm = () => {
		purge();
		add("تاریخچه با موفقیت پاک شد");
		close();
	};

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
			<ConfirmationDialog
				isOpen={isOpen}
				close={() => setIsOpen(false)}
				onConfirm={onConfirm}
				title="پاکسازی تاریخچه"
				description="آیا از پاکسازی تاریخچه اطمینان دارید؟"
			/>
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
});
