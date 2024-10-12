import { useState } from "react";

import useActiveStore from "@state/activeStore";

import { StyleSheet, View } from "react-native";

import Animated, { useAnimatedRef } from "react-native-reanimated";

import NewParameterFAB from "@components/collections/NewParameterFAB";
import useParameters from "@hooks/useParameters";
import ParameterEntry from "@components/collections/ParameterEntry";
import { Icon, Text } from "react-native-paper";

const Parameters: React.FC = () => {
	const acid = useActiveStore(state => state.activeCollectionId!);

	const parameters = useParameters.get(acid);

	const [isFABExpanded, setIsFABExpanded] = useState<boolean>(true);

	const scrollRef = useAnimatedRef<Animated.ScrollView>();

	return (
		<>
			<View style={styles.main}>
				{parameters.length > 0 ? (
					<Animated.ScrollView
						ref={scrollRef}
						scrollEventThrottle={16}
						onScroll={e => {
							const currentScrollPosition =
								Math.floor(e.nativeEvent.contentOffset.y) ?? 0;
							setIsFABExpanded(currentScrollPosition <= 0);
						}}
					>
						<View style={styles.content}>
							{parameters.map(p => {
								return (
									<ParameterEntry
										key={p.id}
										param={p}
									/>
								);
							})}
						</View>
					</Animated.ScrollView>
				) : (
					<View style={styles.noContent}>
						<Icon
							source="alpha-x-box-outline"
							size={100}
						/>
						<Text variant="labelLarge">
							پارامتری تعریف نشده‌است
						</Text>
					</View>
				)}
			</View>
			<NewParameterFAB isExtended={isFABExpanded} />
		</>
	);
};

export default Parameters;

const styles = StyleSheet.create({
	main: {
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
