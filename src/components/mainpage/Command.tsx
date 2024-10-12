import useCollections from "@hooks/useCollections";
import useCommandData from "@hooks/useCommandData";
import { SelectCommands } from "@schema/commands";
import useToastStore from "@state/toastStore";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
	ActivityIndicator,
	Button,
	Surface,
	Text,
	TouchableRipple,
	useTheme,
} from "react-native-paper";

import { SendDirectSms } from "react-native-send-direct-sms";

interface IProps {
	cmd: SelectCommands;
}

const Command: React.FC<IProps> = ({ cmd }) => {
	const [mode, setMode] = useState<"idle" | "confirm" | "pending">("idle");

	const theme = useTheme();

	const add = useToastStore(state => state.add);

	const data = useCommandData.getString(cmd.id);
	const collection = useCollections.select(cmd.collection_id);

	const color = () => {
		if (mode === "idle") {
			return theme.colors.primary;
		} else if (mode === "confirm") {
			return theme.colors.errorContainer;
		} else {
			return theme.colors.inversePrimary;
		}
	};

	const textColor = () => {
		if (mode === "idle") {
			return theme.colors.onPrimary;
		} else if (mode === "confirm") {
			return theme.colors.onErrorContainer;
		} else {
			return theme.colors.scrim;
		}
	};

	const handlePress = () => {
		if (data.length === 0) {
			add("هیچ داده‌ای برای این دستور تعریف نشده است");
			return;
		}
		if (mode === "idle") {
			setMode("confirm");
		}
	};

	const handleSend = async () => {
		setMode("pending");
		console.log(`to ${collection.number} sending ${data}`);
		await SendDirectSms(collection.number, data);
		setMode("idle");
	};

	return (
		<Surface
			elevation={2}
			style={{ ...styles.container, backgroundColor: color() }}
		>
			<TouchableRipple
				borderless
				style={styles.ripple}
				onPress={mode === "idle" ? handlePress : undefined}
			>
				<View style={styles.innerContainer}>
					{mode === "idle" && (
						<Text
							variant="titleMedium"
							numberOfLines={1}
							style={{ color: textColor() }}
						>
							{cmd.name}
						</Text>
					)}
					{mode === "confirm" && (
						<View style={styles.confirm}>
							<Button
								mode="contained"
								style={{ width: "100%" }}
								onPress={handleSend}
							>
								تایید
							</Button>
							<Button
								mode="contained"
								style={{ width: "100%" }}
								onPress={() => setMode("idle")}
							>
								لغو
							</Button>
						</View>
					)}
					{mode === "pending" && (
						<ActivityIndicator
							animating
							size="large"
							color={textColor()}
						/>
					)}
				</View>
			</TouchableRipple>
		</Surface>
	);
};

export default Command;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 10,
		borderRadius: 22,
		height: 130,
	},
	ripple: {
		flex: 1,
		borderRadius: 22,
	},
	innerContainer: {
		flex: 1,
		padding: 5,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	confirm: {
		flex: 1,
		display: "flex",
		gap: 10,
		alignItems: "center",
		justifyContent: "center",
	},
});
