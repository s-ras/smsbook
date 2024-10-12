import { create } from "zustand";

import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

interface IToast {
	id: string;
	text: string;
	icon: string;
}

interface IState {
	toasts: IToast[];
}

interface IAction {
	add: (t: string, i?: string) => void;
	remove: (tid: string) => void;
}

const initialState: IState = {
	toasts: [],
};

const useToastStore = create<IState & IAction>(set => ({
	...initialState,

	add: (t, i = "check") =>
		set(state => {
			const id = uuid();
			return {
				toasts: [...state.toasts, { id: id, text: t, icon: i }],
			};
		}),

	remove: tid =>
		set(state => {
			return {
				toasts: state.toasts.filter(t => t.id !== tid),
			};
		}),
}));

export default useToastStore;
