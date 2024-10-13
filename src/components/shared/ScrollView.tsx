import { StyleSheet, View } from "react-native";

import Animated, { useAnimatedRef } from "react-native-reanimated";

interface IProps {
	children: React.ReactNode;
}

const ScrollView: React.FC<IProps> = ({ children }) => {
	const scrollRef = useAnimatedRef<Animated.ScrollView>();

	return (
		<View>
			<Animated.ScrollView
				ref={scrollRef}
				scrollEventThrottle={16}
			>
				<View style={styles.content}>{children}</View>
			</Animated.ScrollView>
		</View>
	);
};

export default ScrollView;

const styles = StyleSheet.create({
	content: {
		flex: 1,
		padding: 0,
		overflow: "hidden",
	},
});
