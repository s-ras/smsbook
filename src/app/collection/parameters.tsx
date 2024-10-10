import { useState } from "react";
import { List } from "react-native-paper";

import useActiveStore from "@state/activeStore";

import { StyleSheet, View } from "react-native";

import Animated, { useAnimatedRef } from "react-native-reanimated";

import NewParameterFAB from "@components/collection/NewParameterFAB";
import useParameters from "@hooks/useParameters";

const Parameters: React.FC = () => {
	const acid = useActiveStore(state => state.activeCollectionId!);

	const parameters = useParameters.get(acid);

	const [isFABExpanded, setIsFABExpanded] = useState<boolean>(true);

	const scrollRef = useAnimatedRef<Animated.ScrollView>();

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
					<View style={styles.content}>
						{parameters.map(p => {
							return (
								<List.Item
									style={styles.listItem}
									title={p.label}
									key={p.id}
									left={props => (
										<List.Icon
											{...props}
											icon="function"
										/>
									)}
									right={props => (
										<List.Icon
											{...props}
											icon="arrow-left"
										/>
									)}
								/>
							);
						})}
					</View>
				</Animated.ScrollView>
			</View>
			<NewParameterFAB isExtended={isFABExpanded} />
		</>
	);
};

export default Parameters;

const styles = StyleSheet.create({
	content: {
		flex: 1,
		padding: 0,
		overflow: "hidden",
		display: "flex",
		gap: 20,
	},
	listItem: {
		padding: 20,
	},
});
