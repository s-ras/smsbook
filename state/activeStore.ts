import { create } from "zustand";

interface IState {
	activeCollectionId: string | null;
}

interface IAction {
	setActiveCollectionId: (c: string) => void;

	reset: () => void;
}

const initialState: IState = {
	activeCollectionId: null,
};

const useActiveStore = create<IState & IAction>(set => ({
	...initialState,

	setActiveCollectionId: (c: string) =>
		set(() => ({ activeCollectionId: c })),

	reset: () => () => ({ ...initialState }),
}));

export default useActiveStore;
