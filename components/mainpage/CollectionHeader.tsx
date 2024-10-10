import { View, StyleSheet } from "react-native";
import { ICollection } from "@/models/library";
import { useTheme, Text, TouchableRipple, Icon } from "react-native-paper";

interface IProps {
	collection: ICollection;
}

const CollectionHeader: React.FC<IProps> = ({ collection }) => {
	const theme = useTheme();

	return (
		<View style={styles.headerOuterWrapper}>
			<View
				style={[
					styles.headerInnerWrapper,
					{ backgroundColor: theme.colors.primaryContainer },
				]}
			>
				<TouchableRipple
					style={styles.rippleWrapper}
					borderless
				>
					<View style={styles.inner}>
						<Text variant="titleMedium">{collection.name}</Text>
						<Icon
							source="chevron-down"
							size={35}
						/>
					</View>
				</TouchableRipple>
			</View>
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
		borderRadius: 22,
	},
	rippleWrapper: {
		width: "100%",
		borderRadius: 22,
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
