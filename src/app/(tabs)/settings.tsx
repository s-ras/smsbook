import ScrollView from "@components/shared/ScrollView";
import SettingsThemeEntry from "@components/settings/SettingsThemeEntry";
import SettingsExportEntry from "@components/settings/SettingsExportEntry";
import SettingsImportEntry from "@components/settings/SettingsImportEntry";
import SettingsResetEntry from "@components/settings/SettingsResetEntry";
import SettingsVersionEntry from "@components/settings/SettingsVersionEntry";

const Settings = () => {
	return (
		<ScrollView>
			<SettingsThemeEntry />
			<SettingsExportEntry />
			<SettingsImportEntry />
			<SettingsResetEntry />
			<SettingsVersionEntry />
		</ScrollView>
	);
};

export default Settings;
