import { useState } from "react";

import { StyleSheet } from "react-native";

import { List } from "react-native-paper";

import EditParameterDialog from "@components/collections/EditParameterDialog";

import { SelectParameters } from "@schema/parameters";

interface IProps {
	param: SelectParameters;
}

const ParameterEntry: React.FC<IProps> = ({ param }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<List.Item
				style={styles.listItem}
				title={param.label}
				left={props => (
					<List.Icon
						{...props}
						icon="function"
					/>
				)}
				right={props => (
					<List.Icon
						{...props}
						icon="arrow-left"
					/>
				)}
				onPress={() => setIsOpen(true)}
			/>
			<EditParameterDialog
				paramId={param.id}
				isOpen={isOpen}
				close={() => setIsOpen(false)}
			/>
		</>
	);
};

export default ParameterEntry;

const styles = StyleSheet.create({
	listItem: {
		padding: 20,
	},
});
