import { useState } from "react";

import { StyleSheet, View } from "react-native";

import Animated, { useAnimatedRef } from "react-native-reanimated";

import { Icon, Text } from "react-native-paper";

import useActiveStore from "@state/activeStore";
import useCommands from "@hooks/useCommands";

import NewCommandFAB from "@components/collections/NewCommandFAB";
import CommandsEntry from "@components/collections/CommandsEntry";

const Index: React.FC = () => {
	const acid = useActiveStore(state => state.activeCollectionId!);

	const commands = useCommands.get(acid);

	const [isFABExpanded, setIsFABExpanded] = useState<boolean>(true);

	const scrollRef = useAnimatedRef<Animated.ScrollView>();

	return (
		<>
			<View style={styles.main}>
				{commands.length > 0 ? (
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
							{commands.map(c => {
								return (
									<CommandsEntry
										key={c.id}
										command={c}
									/>
								);
							})}
						</View>
					</Animated.ScrollView>
				) : (
					<View style={styles.noContent}>
						<Icon
							source="progress-wrench"
							size={100}
						/>
						<Text variant="labelLarge">دستوری تعریف نشده‌است</Text>
					</View>
				)}
			</View>
			<NewCommandFAB isExtended={isFABExpanded} />
		</>
	);
};

export default Index;

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
