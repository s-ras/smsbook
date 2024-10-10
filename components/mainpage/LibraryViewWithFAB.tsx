import { useState } from "react";

import { StyleSheet, View } from "react-native";

import Animated, { useAnimatedRef } from "react-native-reanimated";

import NewCollectionFABWithDialog from "../library/NewCollectionFABWithDialog";

interface IProps {
	children: React.ReactNode;
}

const LibraryViewWithFAB: React.FC<IProps> = ({ children }) => {
	const scrollRef = useAnimatedRef<Animated.ScrollView>();

	const [isFABExpanded, setIsFABExpanded] = useState<boolean>(true);

	return (
		<>
			<View>
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
			</View>
			<NewCollectionFABWithDialog isExtended={isFABExpanded} />
		</>
	);
};

export default LibraryViewWithFAB;

const styles = StyleSheet.create({
	content: {
		flex: 1,
		padding: 0,
		overflow: "hidden",
		display: "flex",
		gap: 20,
	},
});
