import LibraryViewWithFAB from "@components/mainpage/LibraryViewWithFAB";
import useCollection from "@hooks/useCollections";

import { Text } from "react-native-paper";

const Index = () => {
	const collections = useCollection.get();

	return (
		<>
			<LibraryViewWithFAB>
				{collections.map(c => (
					<Text key={c.id}>{`${c.id}:${c.name}`}</Text>
				))}
			</LibraryViewWithFAB>
		</>
	);
};

export default Index;
