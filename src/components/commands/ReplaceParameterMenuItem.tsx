import { useState } from "react";

import { Menu } from "react-native-paper";

import ReplaceParameterDialog from "@components/commands/ReplaceParameterDialog";

interface IProps {
	cmddId: number;
	currentParamId: number;
	close: () => void;
}

const ReplaceParameterMenuItem: React.FC<IProps> = ({
	close,
	cmddId,
	currentParamId,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<Menu.Item
				title="تعویض"
				leadingIcon="sync"
				onPress={() => {
					setIsOpen(true);
				}}
			/>
			<ReplaceParameterDialog
				isOpen={isOpen}
				close={() => {
					setIsOpen(false);
					close();
				}}
				cmddId={cmddId}
				currentParamId={currentParamId}
			/>
		</>
	);
};
export default ReplaceParameterMenuItem;
