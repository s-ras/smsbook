import { List, useTheme } from "react-native-paper";

import { useExport } from "@hooks/useImportExport";

const SettingsExportEntry: React.FC = () => {
	const theme = useTheme();

	const exportDb = useExport();

	return (
		<List.Item
			onPress={() => exportDb()}
			title="پشتیبان‌گیری"
			description="ایجاد پشتیبان از پایگاه داده"
			left={props => (
				<List.Icon
					{...props}
					color={theme.colors.primary}
					icon="content-save"
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

export default SettingsExportEntry;
