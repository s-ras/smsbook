import { useState } from "react";

import { List, useTheme } from "react-native-paper";

import SettingsThemeDialog from "./SettingsThemeDialog";

const SettingsThemeEntry: React.FC = () => {
	const theme = useTheme();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<List.Item
				onPress={() => setIsOpen(true)}
				title="پوسته"
				description="انتخاب پوسته نرم‌افزار"
				left={props => (
					<List.Icon
						{...props}
						color={theme.colors.primary}
						icon="format-paint"
					/>
				)}
				right={props => (
					<List.Icon
						{...props}
						color={theme.colors.primary}
						icon="arrow-left"
					/>
				)}
			/>
			<SettingsThemeDialog
				isOpen={isOpen}
				close={() => setIsOpen(false)}
			/>
		</>
	);
};

export default SettingsThemeEntry;
