import { StyleSheet, View } from "react-native";

import useCollections from "@hooks/useCollections";

import { Icon, Text } from "react-native-paper";
import Collection from "@components/mainpage/Collection";

const Index = () => {
	const collections = useCollections.get();

	return (
		<View style={styles.main}>
			{collections.length > 0 ? (
				<View style={styles.content}>
					{collections.map(c => (
						<Collection
							c={c}
							key={c.id}
						/>
					))}
				</View>
			) : (
				<View style={styles.noContent}>
					<Icon
						source="book-alert-outline"
						size={100}
					/>
					<Text variant="labelLarge">مجموعه‌ای وجود ندارد!</Text>
				</View>
			)}
		</View>
	);
};

export default Index;

const styles = StyleSheet.create({
	main: {
		flex: 1,
	},
	content: {
		flex: 1,
		padding: 0,
		display: "flex",
		gap: 20,
	},
	noContent: {
		flex: 1,
		padding: 5,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
	},
});
