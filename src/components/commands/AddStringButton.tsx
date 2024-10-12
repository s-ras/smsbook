import { useState } from "react";

import { Button } from "react-native-paper";

import AddStringDialog from "./AddStringDialog";

const AddStringButton: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<Button
				mode="contained"
				icon="format-text"
				style={{ flex: 1 }}
				onPress={() => setIsOpen(true)}
			>
				افزودن متن
			</Button>
			<AddStringDialog
				isOpen={isOpen}
				close={() => setIsOpen(false)}
			/>
		</>
	);
};

export default AddStringButton;
