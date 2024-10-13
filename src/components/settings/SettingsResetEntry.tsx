import { useState } from "react";

import { List, useTheme } from "react-native-paper";

import { useReset } from "@hooks/useImportExport";

import ConfirmationDialog from "@components/shared/ConfirmationDialog";

const SettingsResetEntry: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const theme = useTheme();

	const resetDb = useReset();

	return (
		<>
			<List.Item
				onPress={() => setIsOpen(true)}
				title="بازنشانی"
				description="بازنشانی پایگاه داده"
				left={props => (
					<List.Icon
						{...props}
						color={theme.colors.primary}
						icon="restore-alert"
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
			<ConfirmationDialog
				isOpen={isOpen}
				close={() => setIsOpen(false)}
				onConfirm={resetDb}
				title="بازنشانی پایگاه داده"
				description="آیا از انجام این کار مطمئن هستید؟"
			/>
		</>
	);
};

export default SettingsResetEntry;
