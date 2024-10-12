import { useState } from "react";

import { Appbar } from "react-native-paper";

import EditCollectionDialog from "./EditCollectionDialog";

const EditCollectionAction: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<Appbar.Action
				icon="square-edit-outline"
				onPress={() => setIsOpen(true)}
			/>
			<EditCollectionDialog
				isOpen={isOpen}
				close={() => setIsOpen(false)}
			/>
		</>
	);
};
export default EditCollectionAction;
