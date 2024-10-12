import { useState } from "react";

import { Pressable, StyleSheet, View } from "react-native";

import Animated, {
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

interface IProps {
	summary: React.ReactNode;
	children: React.ReactNode;
	isExpanded: boolean;
	expand: (e: boolean) => void;
}

const Collapsible: React.FC<IProps> = ({
	summary,
	children,
	expand,
	isExpanded,
}) => {
	const height = useSharedValue(0);

	const derivedHeight = useDerivedValue(() =>
		withTiming((height.value + 30) * Number(isExpanded), {
			duration: 200,
		})
	);
	const bodyStyle = useAnimatedStyle(() => ({
		height: derivedHeight.value,
	}));

	return (
		<View>
			<Pressable
				style={styles.heading}
				onPress={() => {
					expand(!isExpanded);
				}}
			>
				{summary}
			</Pressable>
			<Animated.View style={[styles.animatedView, bodyStyle]}>
				<View
					onLayout={e => {
						height.value = e.nativeEvent.layout.height;
					}}
					style={styles.wrapper}
				>
					{children}
				</View>
			</Animated.View>
		</View>
	);
};

export default Collapsible;

const styles = StyleSheet.create({
	heading: {
		width: "100%",
		zIndex: 2,
	},
	content: {
		marginTop: 6,
		marginLeft: 24,
	},
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
