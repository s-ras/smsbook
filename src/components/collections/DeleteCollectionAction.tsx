import { useState } from "react";

import { useRouter } from "expo-router";

import { Appbar } from "react-native-paper";

import useActiveStore from "@state/activeStore";
import useToastStore from "@state/toastStore";
import useCollections from "@hooks/useCollections";

import ConfirmationDialog from "@components/shared/ConfirmationDialog";

const DeleteCollectionAction: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const acid = useActiveStore(state => state.activeCollectionId!);

	const add = useToastStore(state => state.add);

	const router = useRouter();

	// eslint-disable-next-line drizzle/enforce-delete-with-where
	const remove = useCollections.delete();

	const onConfirm = () => {
		remove(acid);
		add("مجموعه با موفقیت حذف شد");
		router.navigate("/(tabs)/library");
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
				title="حذف مجموعه"
				description="از حذف مجموعه اطمینان دارید؟"
			/>
		</>
	);
};

export default DeleteCollectionAction;
