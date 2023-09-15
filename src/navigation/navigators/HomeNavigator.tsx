import { createStackNavigator } from "@react-navigation/stack";
import { HomeStackParamList, Screens } from "../../types";
import {
  StepOne,
  FinalStep,
  Locations,
  StepTwo,
  StepThree,
} from "../../screens";

const sharedOptions = {
  headerShown: false,
};

const HomeStack = createStackNavigator<HomeStackParamList>();
export const HomeNavigator = () => {


  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={Screens.StepOne}
        component={StepOne}
        options={sharedOptions}
      />
      <HomeStack.Screen
        name={Screens.StepTwo}
        component={StepTwo}
        options={sharedOptions}
      />
      <HomeStack.Screen
        name={Screens.StepThree}
        component={StepThree}
        options={sharedOptions}
      />
      <HomeStack.Screen
        name={Screens.FinalStep}
        component={FinalStep}
        options={sharedOptions}
      />
      <HomeStack.Screen
        name={Screens.Locations}
        component={Locations}
        options={sharedOptions}
      />
    </HomeStack.Navigator>
  );
};
