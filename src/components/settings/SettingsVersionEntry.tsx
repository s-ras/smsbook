import Constants from "expo-constants";

import { List, useTheme } from "react-native-paper";

const SettingsVersionEntry: React.FC = () => {
	const theme = useTheme();

	const version = Constants.expoConfig?.version;

	return (
		<List.Item
			title="نسخه"
			description={version}
			left={props => (
				<List.Icon
					{...props}
					color={theme.colors.primary}
					icon="application-cog"
				/>
			)}
		/>
	);
};

export default SettingsVersionEntry;
