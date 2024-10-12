import { useState } from "react";

import { useRouter } from "expo-router";

import { Appbar } from "react-native-paper";

import ConfirmationDialog from "@components/shared/ConfirmationDialog";

import useActiveStore from "@state/activeStore";
import useToastStore from "@state/toastStore";
import useCommands from "@hooks/useCommands";

const DeleteCommandAction: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const acid = useActiveStore(state => state.activeCommandId!);

	const add = useToastStore(state => state.add);

	const router = useRouter();

	// eslint-disable-next-line drizzle/enforce-delete-with-where
	const remove = useCommands.delete();

	const onConfirm = () => {
		remove(acid);
		add("دستور با موفقیت حذف شد");
		router.navigate("/collection");
		setIsOpen(false);
	};

	return (
		<>
			<Appbar.Action
				icon="trash-can-outline"
				onPress={() => setIsOpen(true)}
			/>
			<ConfirmationDialog
				isOpen={isOpen}
				close={() => setIsOpen(false)}
				onConfirm={onConfirm}
				title="حذف دستور"
				description="از حذف دستور اطمینان دارید؟"
			/>
		</>
	);
};

export default DeleteCommandAction;
