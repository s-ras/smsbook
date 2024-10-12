import { useState } from "react";

import { List, useTheme } from "react-native-paper";

import { useImport } from "@hooks/useImportExport";

const SettingsImportEntry: React.FC = () => {
	const theme = useTheme();

	const importDb = useImport();

	return (
		<List.Item
			onPress={() => importDb()}
			title="بازگردانی"
			description="بازگرداندن نسخه پشتیبان"
			left={props => (
				<List.Icon
					{...props}
					color={theme.colors.primary}
					icon="backup-restore"
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
	);
};

export default SettingsImportEntry;
