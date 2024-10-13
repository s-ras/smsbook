import { useEffect } from "react";

import { View, StyleSheet } from "react-native";

import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

import { useTheme, Text, TouchableRipple, Icon } from "react-native-paper";

interface IProps {
	name: string;
	isExpanded: boolean;
}

const CollectionHeader: React.FC<IProps> = ({ name, isExpanded }) => {
	const theme = useTheme();

	const rotation = useSharedValue<number>(isExpanded ? 180 : 0);
	const radius = useSharedValue<number>(isExpanded ? 30 : 0);

	useEffect(() => {
		rotation.value = withTiming(isExpanded ? 180 : 0, { duration: 200 });
		radius.value = withTiming(isExpanded ? 0 : 22, {
			duration: 200,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isExpanded]);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${rotation.value}deg` }],
	}));

	const animatedRadius = useAnimatedStyle(() => ({
		borderRadius: radius.value,
	}));

	return (
		<View style={styles.headerOuterWrapper}>
			<Animated.View
				style={[
					styles.headerInnerWrapper,
					{ backgroundColor: theme.colors.primaryContainer },
					animatedRadius,
				]}
			>
				<TouchableRipple
					style={styles.rippleWrapper}
					borderless
				>
					<View style={styles.inner}>
						<Text variant="titleMedium">{name}</Text>
						<Animated.View style={animatedStyle}>
							<Icon
								source={"chevron-down"}
								size={35}
							/>
						</Animated.View>
					</View>
				</TouchableRipple>
			</Animated.View>
		</View>
	);
};

export default CollectionHeader;

const styles = StyleSheet.create({
	headerOuterWrapper: {
		display: "flex",
		width: "100%",
		alignItems: "center",
	},
	headerInnerWrapper: {
		width: "85%",
		height: 60,
		borderTopLeftRadius: 22,
		borderTopRightRadius: 22,
	},
	rippleWrapper: {
		width: "100%",
		borderTopLeftRadius: 22,
		borderTopRightRadius: 22,
	},
	inner: {
		display: "flex",
		flexDirection: "row",
		height: "100%",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
	},
});
