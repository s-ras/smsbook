import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { reloadAsync } from "expo-updates";
import useToastStore from "@state/toastStore";

const useImport = () => {
	return async () => {
		let result = await DocumentPicker.getDocumentAsync({
			copyToCacheDirectory: true,
			multiple: false,
		});

		if (result.assets) {
			if (
				!(
					await FileSystem.getInfoAsync(
						FileSystem.documentDirectory + "SQLite"
					)
				).exists
			) {
				await FileSystem.makeDirectoryAsync(
					FileSystem.documentDirectory + "SQLite"
				);
			}

			const base64 = await FileSystem.readAsStringAsync(
				result.assets[0].uri,
				{
					encoding: FileSystem.EncodingType.Base64,
				}
			);

			await FileSystem.writeAsStringAsync(
				FileSystem.documentDirectory + "SQLite/database.db",
				base64,
				{ encoding: FileSystem.EncodingType.Base64 }
			);

			await reloadAsync();
		}
	};
};

const useExport = () => {
	const add = useToastStore(state => state.add);
	return async () => {
		const permissions =
			await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
		if (permissions.granted) {
			const base64 = await FileSystem.readAsStringAsync(
				FileSystem.documentDirectory + "SQLite/database.db",
				{
					encoding: FileSystem.EncodingType.Base64,
				}
			);

			await FileSystem.StorageAccessFramework.createFileAsync(
				permissions.directoryUri,
				"database.db",
				"application/octet-stream"
			)
				.then(async uri => {
					await FileSystem.writeAsStringAsync(uri, base64, {
						encoding: FileSystem.EncodingType.Base64,
					});
				})
				.catch(e => console.log(e));

			add("فایل با موفقیت ایجاد شد");
		} else {
			add("دسترسی مورد نیاز به اپلیکیشن داده نشد");
		}
	};
};

const useReset = () => {
	return async () => {
		await FileSystem.deleteAsync(
			FileSystem.documentDirectory + "SQLite/database.db",
			{ idempotent: true }
		);

		await reloadAsync();
	};
};

export { useImport, useExport, useReset };
