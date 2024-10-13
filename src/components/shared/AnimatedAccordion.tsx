import {
	Animated,
	View,
	StyleSheet,
	RegisteredStyle,
	ViewStyle,
} from "react-native";

import {
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

interface IProps {
	isExpanded: boolean;
	children: React.ReactNode;
	style?: RegisteredStyle<ViewStyle>;
	viewKey?: any;
	duration?: number;
}

const AnimatedAccordion: React.FC<IProps> = ({
	isExpanded,
	children,
	viewKey,
	style,
	duration = 500,
}) => {
	const height = useSharedValue(0);

	const derivedHeight = useDerivedValue(() =>
		withTiming(height.value * Number(isExpanded), {
			duration,
		})
	);
	const bodyStyle = useAnimatedStyle(() => ({
		height: derivedHeight.value,
	}));

	return (
		<Animated.View
			key={`accordionItem_${viewKey}`}
			style={[styles.animatedView, bodyStyle, style]}
		>
			<View
				onLayout={e => {
					height.value = e.nativeEvent.layout.height;
				}}
				style={styles.wrapper}
			>
				{children}
			</View>
		</Animated.View>
	);
};

export default AnimatedAccordion;

const styles = StyleSheet.create({
	wrapper: {
		width: "100%",
		position: "absolute",
		display: "flex",
		alignItems: "center",
	},
	animatedView: {
		width: "100%",
		overflow: "hidden",
	},
});
