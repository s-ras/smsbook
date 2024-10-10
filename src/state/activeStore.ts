import { create } from "zustand";

interface IState {
	activeCollectionId: number | null;
}

interface IAction {
	setActiveCollectionId: (c: number) => void;

	reset: () => void;
}

const initialState: IState = {
	activeCollectionId: null,
};

const useActiveStore = create<IState & IAction>(set => ({
	...initialState,

	setActiveCollectionId: (c: number) =>
		set(() => ({ activeCollectionId: c })),

	reset: () => () => ({ ...initialState }),
}));

export default useActiveStore;
