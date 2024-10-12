import { SelectCollection } from "@schema/collections";
import CollectionHeader from "./CollectionHeader";
import Collapsible from "@components/Collapsible";
import { Text } from "react-native-paper";
import useCollections from "@hooks/useCollections";
import CommandsGrid from "./CommandsGrid";
import { View } from "react-native";

interface IProps {
	c: SelectCollection;
}

const Collection: React.FC<IProps> = ({ c }) => {
	const expand = useCollections.expand(c.id);

	return (
		<View style={{ flex: 1, marginBottom: 20 }}>
			<Collapsible
				summary={
					<CollectionHeader
						name={c.name}
						isExpanded={c.is_expanded}
					/>
				}
				isExpanded={c.is_expanded}
				expand={expand}
			>
				<CommandsGrid cid={c.id} />
			</Collapsible>
		</View>
	);
};

export default Collection;
