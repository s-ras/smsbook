import AsyncStorage from "@react-native-async-storage/async-storage";

import { create } from "zustand";

import { createJSONStorage, persist } from "zustand/middleware";

interface IState {
	preferedTheme: "AUTO" | "LIGHT" | "DARK";

	_hasHydrated: boolean;
}

interface IAction {
	setPreferedTheme: (t: "AUTO" | "LIGHT" | "DARK") => void;

	setHasHydrated: (a: boolean) => void;
}

const initialState: IState = {
	preferedTheme: "AUTO",

	_hasHydrated: false,
};

const useStore = create<IState & IAction>()(
	persist(
		(set, get) => ({
			...initialState,
			setPreferedTheme: t =>
				set(state => {
					return { preferedTheme: t };
				}),

			setHasHydrated: (a: boolean) => set({ _hasHydrated: a }),
		}),
		{
			name: "app-storage",
			storage: createJSONStorage(() => AsyncStorage),
			version: 0,
			migrate: (persistedState, version) => {
				if (version >= 1) {
					console.log("Incompatible veersion ! needs a reinstall");
					throw Error("INCOMPATIBLE STORE VERSION");
				} else {
					return persistedState;
				}
			},
			onRehydrateStorage: () => {
				return (state, error) => {
					if (error) {
						console.log(
							"error hydrating storage, application resets"
						);
					} else {
						state?.setHasHydrated(true);
					}
				};
			},
		}
	)
);

export default useStore;
