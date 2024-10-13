import { View } from "react-native";

import useCollections from "@hooks/useCollections";

import Collapsible from "@components/shared/Collapsible";
import CollectionHeader from "@components/mainpage/CollectionHeader";
import CommandsGrid from "@components/mainpage/CommandsGrid";

import { SelectCollection } from "@schema/collections";

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
