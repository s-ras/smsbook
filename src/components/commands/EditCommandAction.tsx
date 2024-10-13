import { useState } from "react";

import { Appbar } from "react-native-paper";

import EditCommandDialog from "@components/commands/EditCommandDialog";

const EditCommandAction: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<Appbar.Action
				icon="square-edit-outline"
				onPress={() => setIsOpen(true)}
			/>
			<EditCommandDialog
				isOpen={isOpen}
				close={() => setIsOpen(false)}
			/>
		</>
	);
};
export default EditCommandAction;
