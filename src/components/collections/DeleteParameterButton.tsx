import { useState } from "react";

import { IconButton } from "react-native-paper";

import useToastStore from "@state/toastStore";
import useParameters from "@hooks/useParameters";

import ConfirmationDialog from "@components/shared/ConfirmationDialog";

interface IProps {
	paramId: number;
	callback: () => void;
}

const DeleteParameterButton: React.FC<IProps> = ({ paramId, callback }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	// eslint-disable-next-line drizzle/enforce-delete-with-where
	const remove = useParameters.delete();

	const add = useToastStore(state => state.add);

	const count = useParameters.count();

	const onConfirm = () => {
		remove(paramId);
		callback();
		add("پارامتر با موفقیت حذف شد");
		setIsOpen(false);
	};

	return (
		<>
			<IconButton
				icon="trash-can-outline"
				onPress={() => {
					if (count(paramId) > 0) {
						add(
							`از این پارامتر در ${count(paramId)} دستور استفاده شده است.`
						);
					} else {
						setIsOpen(true);
					}
				}}
			/>
			<ConfirmationDialog
				isOpen={isOpen}
				close={() => setIsOpen(false)}
				onConfirm={onConfirm}
				title="حذف پارامتر"
				description="آیا اطمینان دارید؟"
			/>
		</>
	);
};
export default DeleteParameterButton;
