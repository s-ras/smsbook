import { useState } from "react";

import { Button } from "react-native-paper";

import AddParameterDialog from "./AddParameterDialog";

const AddParameterButton: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<Button
				mode="contained"
				icon="application-variable"
				style={{ flex: 1 }}
				onPress={() => setIsOpen(true)}
			>
				افزودن پارامتر
			</Button>
			<AddParameterDialog
				isOpen={isOpen}
				close={() => setIsOpen(false)}
			/>
		</>
	);
};
export default AddParameterButton;
