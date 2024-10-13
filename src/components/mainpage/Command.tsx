import { useState } from "react";

import { View, StyleSheet, PermissionsAndroid } from "react-native";

import * as Haptics from "expo-haptics";

import { SendDirectSms } from "react-native-send-direct-sms";

import {
	ActivityIndicator,
	Button,
	Chip,
	Surface,
	Text,
	TouchableRipple,
	useTheme,
} from "react-native-paper";

import useToastStore from "@state/toastStore";
import useCollections from "@hooks/useCollections";
import useCommandData from "@hooks/useCommandData";
import useJournal from "@hooks/useJournal";

import { SelectCommands } from "@schema/commands";
import { humanReadableDate } from "../../utils/dates";

interface IProps {
	cmd: SelectCommands;
}

const Command: React.FC<IProps> = ({ cmd }) => {
	const [mode, setMode] = useState<"idle" | "confirm" | "pending">("idle");

	const theme = useTheme();

	const add = useToastStore(state => state.add);

	const data = useCommandData.getString(cmd.id);
	const collection = useCollections.select(cmd.collection_id);
	const record = useJournal.insert(cmd.id);
	const lastRecord = useJournal.last(cmd.id);

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
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
		if (data.length === 0) {
			add("هیچ داده‌ای برای این دستور تعریف نشده است");
			return;
		}
		if (mode === "idle") {
			setMode("confirm");
		}
	};

	const checkPerm = async () => {
		return await PermissionsAndroid.check("android.permission.SEND_SMS");
	};

	const handleSend = async () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

		if (!(await checkPerm())) {
			await PermissionsAndroid.request("android.permission.SEND_SMS");
			if (!(await checkPerm())) {
				add("دسترسی ارسال پیام به اپلیکیشن داده نشده است", "alert");
				return;
			}
		}

		setMode("pending");

		try {
			if (!__DEV__) {
				await SendDirectSms(collection.number, data);
			}
			console.log(`to ${collection.number} sending ${data}`);
			add("پیام ارسال شد");
			record();
		} catch {
			add("خطا در ارسال پیام");
		}

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
						<View style={styles.previewMode}>
							<Text
								variant="titleMedium"
								numberOfLines={1}
								style={{ color: textColor() }}
							>
								{cmd.name}
							</Text>
							{lastRecord && (
								<Chip
									icon="history"
									style={{ borderRadius: 50 }}
								>
									{humanReadableDate(lastRecord.timestamp)}
								</Chip>
							)}
						</View>
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
								onPress={() => {
									Haptics.impactAsync(
										Haptics.ImpactFeedbackStyle.Heavy
									);
									setMode("idle");
								}}
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
	previewMode: {
		flex: 1,
		display: "flex",
		gap: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	lastRecordBox: {
		width: "80%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderRadius: 50,
		padding: 5,
	},
});
