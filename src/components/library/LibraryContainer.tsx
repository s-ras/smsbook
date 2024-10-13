import { useState } from "react";

import { View, StyleSheet } from "react-native";

import { Icon, Text } from "react-native-paper";

import Animated, { useAnimatedRef } from "react-native-reanimated";

import NewCollectionFABWithDialog from "@components/library/NewCollectionFABWithDialog";

interface IProps {
	children: React.ReactNode;
	isEmpty: boolean;
}

const LibraryContainer: React.FC<IProps> = ({ children, isEmpty }) => {
	const scrollRef = useAnimatedRef<Animated.ScrollView>();

	const [isFABExpanded, setIsFABExpanded] = useState<boolean>(true);

	return (
		<>
			<View style={styles.container}>
				{!isEmpty ? (
					<Animated.ScrollView
						ref={scrollRef}
						scrollEventThrottle={16}
						onScroll={e => {
							const currentScrollPosition =
								Math.floor(e.nativeEvent.contentOffset.y) ?? 0;
							setIsFABExpanded(currentScrollPosition <= 0);
						}}
					>
						<View style={styles.content}>{children}</View>
					</Animated.ScrollView>
				) : (
					<View style={styles.noContent}>
						<Icon
							source="book-plus-outline"
							size={100}
						/>
						<Text variant="labelLarge">
							مجموعه‌ی جدیدی اضافه کنید
						</Text>
					</View>
				)}
			</View>
			<NewCollectionFABWithDialog isExtended={isFABExpanded} />
		</>
	);
};

export default LibraryContainer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	noContent: {
		flex: 1,
		padding: 5,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
	},
	content: {
		flex: 1,
		padding: 0,
		overflow: "hidden",
		display: "flex",
		gap: 20,
	},
});
