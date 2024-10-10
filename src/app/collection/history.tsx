import { useState } from "react";
import { View, StyleSheet } from "react-native";

import useJournal from "@hooks/useJournal";
import useActiveStore from "@state/activeStore";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import { Icon, List, Text } from "react-native-paper";
import ClearHistoryFAB from "@components/collection/ClearHistoryFab";

const History: React.FC = () => {
	const acid = useActiveStore(state => state.activeCollectionId!);

	const journal = useJournal.get(acid);

	const [isFABExpanded, setIsFABExpanded] = useState<boolean>(true);

	const scrollRef = useAnimatedRef<Animated.ScrollView>();

	return (
		<>
			<View>
				<Animated.ScrollView
					ref={scrollRef}
					scrollEventThrottle={16}
					contentContainerStyle={{ flexGrow: 1 }}
					onScroll={e => {
						const currentScrollPosition =
							Math.floor(e.nativeEvent.contentOffset.y) ?? 0;
						setIsFABExpanded(currentScrollPosition <= 0);
					}}
				>
					{journal.length > 0 ? (
						<View style={styles.content}>
							{journal.map(j => {
								return (
									<List.Item
										style={styles.listItem}
										title={j.command_name}
										description={Intl.DateTimeFormat(
											"fa-IR"
										).format(j.timestamp)}
										key={`${j.command_name}${j.timestamp}`}
										left={props => (
											<List.Icon
												{...props}
												icon="clock-check-outline"
											/>
										)}
									/>
								);
							})}
						</View>
					) : (
						<View style={styles.noContent}>
							<Icon
								source="clock-alert-outline"
								size={100}
							/>
							<Text variant="labelLarge">تاریخچه خالی است</Text>
						</View>
					)}
				</Animated.ScrollView>
			</View>
			{journal.length > 0 && (
				<ClearHistoryFAB isExtended={isFABExpanded} />
			)}
		</>
	);
};

export default History;

const styles = StyleSheet.create({
	content: {
		flex: 1,
		padding: 0,
		overflow: "hidden",
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
		height: 500,
	},
	listItem: {
		padding: 20,
	},
});
