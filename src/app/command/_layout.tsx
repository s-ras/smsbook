import { useEffect } from "react";

import { Redirect, useRouter } from "expo-router";

import { Appbar } from "react-native-paper";

import useActiveStore from "@state/activeStore";
import useCommands from "@hooks/useCommands";

import EditCommandAction from "@components/commands/EditCommandAction";
import DeleteCommandAction from "@components/commands/DeleteCommandAction";

import Index from ".";

const CommandLayout: React.FC = () => {
	const router = useRouter();

	const [acid, setActiveCommandId] = useActiveStore(state => [
		state.activeCommandId!,
		state.setActiveCommandId,
	]);

	const command = useCommands.select(acid);

	if (!acid) {
		return <Redirect href="/collection" />;
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		return () => {
			setActiveCommandId(null);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Appbar.Header elevated>
				<Appbar.BackAction
					onPress={() => {
						router.navigate("/collection");
					}}
				/>
				<Appbar.Content
					title={command?.name}
					titleStyle={{ fontSize: 20 }}
				/>
				<EditCommandAction />
				<DeleteCommandAction />
			</Appbar.Header>
			<Index />
		</>
	);
};

export default CommandLayout;
