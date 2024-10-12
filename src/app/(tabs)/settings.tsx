import SettingsThemeEntry from "@components/settings/SettingsThemeEntry";
import ScrollView from "@components/ScrollView";
import SettingsExportEntry from "@components/settings/SettingsExportEntry";
import SettingsImportEntry from "@components/settings/SettingsImportEntry";
import SettingsResetEntry from "@components/settings/SettingsResetEntry";

const Settings = () => {
	return (
		<ScrollView>
			<SettingsThemeEntry />
			<SettingsExportEntry />
			<SettingsImportEntry />
			<SettingsResetEntry />
		</ScrollView>
	);
};

export default Settings;
