import { create } from "zustand";

interface IState {
	activeCollectionId: number | null;
	activeCommandId: number | null;
}

interface IAction {
	setActiveCollectionId: (c: number | null) => void;

	setActiveCommandId: (c: number | null) => void;

	reset: () => void;
}

const initialState: IState = {
	activeCollectionId: null,
	activeCommandId: null,
};

const useActiveStore = create<IState & IAction>(set => ({
	...initialState,

	setActiveCollectionId: (c: number | null) =>
		set(() => ({ activeCollectionId: c })),

	setActiveCommandId: (c: number | null) =>
		set(() => ({ activeCommandId: c })),

	reset: () => () => ({ ...initialState }),
}));

export default useActiveStore;
