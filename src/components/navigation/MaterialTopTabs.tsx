import type {
	ParamListBase,
	TabNavigationState,
} from "@react-navigation/native";

import {
	createMaterialTopTabNavigator,
	type MaterialTopTabNavigationOptions,
	type MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";

import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext<
	MaterialTopTabNavigationOptions,
	typeof Navigator,
	TabNavigationState<ParamListBase>,
	MaterialTopTabNavigationEventMap
>(Navigator);

export default MaterialTopTabs;
