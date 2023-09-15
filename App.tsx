import React from "react";


import { NavigationContainer } from "@react-navigation/native";
import { AllProviders } from "./src/utils";
import { MainNavigator } from "./src/navigation/navigators/MainNavigator";


export default function App() {
  return (
    <NavigationContainer>
      <AllProviders>
        <MainNavigator />
      </AllProviders>
    </NavigationContainer>
  );
}


