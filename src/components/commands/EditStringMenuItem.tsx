import { useState } from "react";
import { Menu } from "react-native-paper";
import EditStringDialog from "./EditStringDialog";

interface IProps {
	cmddId: number;
	close: () => void;
}

const EditStringMenuItem: React.FC<IProps> = ({ close, cmddId }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<Menu.Item
				title="ویرایش"
				leadingIcon="square-edit-outline"
				onPress={() => {
					setIsOpen(true);
				}}
			/>
			<EditStringDialog
				isOpen={isOpen}
				close={() => {
					setIsOpen(false);
					close();
				}}
				cmddId={cmddId}
			/>
		</>
	);
};

export default EditStringMenuItem;
