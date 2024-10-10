import {
	createMaterialBottomTabNavigator,
	MaterialBottomTabNavigationEventMap,
	MaterialBottomTabNavigationOptions,
} from "react-native-paper/react-navigation";

import type {
	ParamListBase,
	TabNavigationState,
} from "@react-navigation/native";

import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialBottomTabNavigator();

const MaterialBottomTabs = withLayoutContext<
	MaterialBottomTabNavigationOptions,
	typeof Navigator,
	TabNavigationState<ParamListBase>,
	MaterialBottomTabNavigationEventMap
>(Navigator);

export default MaterialBottomTabs;
