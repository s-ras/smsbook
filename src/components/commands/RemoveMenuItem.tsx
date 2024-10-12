import ConfirmationDialog from "@components/shared/ConfirmationDialog";
import useCommandData from "@hooks/useCommandData";
import useActiveStore from "@state/activeStore";
import { useState } from "react";
import { Menu } from "react-native-paper";

interface IProps {
	cmddId: number;
	close: () => void;
	type: "string" | "parameter";
}

const RemoveMenuItem: React.FC<IProps> = ({ close, cmddId, type }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const acid = useActiveStore(state => state.activeCommandId!);

	// eslint-disable-next-line drizzle/enforce-delete-with-where
	const remove = useCommandData.delete(acid);

	const onConfirm = () => {
		remove(cmddId);
		setIsOpen(false);
		close();
	};

	return (
		<>
			<Menu.Item
				title="حذف"
				leadingIcon="trash-can"
				onPress={() => {
					setIsOpen(true);
				}}
			/>
			<ConfirmationDialog
				isOpen={isOpen}
				close={() => {
					setIsOpen(false);
					close();
				}}
				title={`حذف ${type === "parameter" ? "پارامتر" : "متن"}`}
				description="آیا اطمینان دارید؟"
				onConfirm={onConfirm}
			/>
		</>
	);
};
export default RemoveMenuItem;
