import { Button, Dialog, Portal, Text, useTheme } from "react-native-paper";

import useActiveStore from "@state/activeStore";
import useJournal from "@hooks/useJournal";

interface IProps {
	isOpen: boolean;
	close: () => void;
	showSnack: () => void;
}

const ClearHistoryDialog: React.FC<IProps> = ({ isOpen, close, showSnack }) => {
	const acid = useActiveStore(state => state.activeCollectionId!);

	const purge = useJournal.purge(acid);

	const handleConfirm = () => {
		purge();
		showSnack();
		close();
	};

	const theme = useTheme();

	return (
		<Portal theme={theme}>
			<Dialog
				visible={isOpen}
				onDismiss={close}
			>
				<Dialog.Title>
					<Text>پاک‌کردن تاریخچه</Text>
				</Dialog.Title>
				<Dialog.Content>
					<Text>آیا مطمئن هستید؟</Text>
				</Dialog.Content>
				<Dialog.Actions style={{ justifyContent: "space-between" }}>
					<Button onPress={close}>خیر</Button>
					<Button onPress={handleConfirm}>تایید</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};

export default ClearHistoryDialog;
