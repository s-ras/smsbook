import { useRouter } from "expo-router";

import { List } from "react-native-paper";

import useActiveStore from "@state/activeStore";
import useCollections from "@hooks/useCollections";

import LibraryContainer from "@components/library/LibraryContainer";

const Library: React.FC = () => {
	const router = useRouter();

	const collections = useCollections.get();

	const setActive = useActiveStore(state => state.setActiveCollectionId);

	return (
		<LibraryContainer isEmpty={collections.length === 0}>
			{collections.map(c => {
				return (
					<List.Item
						title={c.name}
						description={c.number}
						key={c.id}
						left={props => (
							<List.Icon
								{...props}
								icon="book-cog-outline"
							/>
						)}
						right={props => (
							<List.Icon
								{...props}
								icon="arrow-left"
							/>
						)}
						onPress={() => {
							setActive(c.id);
							router.push("/collection");
						}}
					/>
				);
			})}
		</LibraryContainer>
	);
};
export default Library;
