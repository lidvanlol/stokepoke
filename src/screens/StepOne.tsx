import { Page, PokeBowl, PrimaryButton } from "../components";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  ButtonText,
  HomeScreenNavigationProps,
  HomeStackParamList,
  Screens,
} from "../types";
import { useCallback, useMemo } from "react";
import { useBowls, useSteps } from "../hooks";

export const StepOne = () => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const { selectedBowl } = useBowls();
  const { params } = useRoute<RouteProp<HomeStackParamList, Screens.StepOne>>();
  const { setCurrentStep } = useSteps();

  const disabled = useMemo(() => !selectedBowl.id, [selectedBowl, params]);

  useFocusEffect(() => {
    setCurrentStep(1);
  });

  const buttonHandler = useCallback(() => {
    if (params) {
      if (params.isFavouriteEdit) {
        navigation.navigate({
          name: Screens.StepTwo,
          key: Screens.StepTwo,
          params: { isFavouriteEdit: true },
        });
      } else {
        navigation.navigate({
          name: Screens.StepTwo,
          key: Screens.StepTwo,
        });
      }
    } else {
      navigation.navigate({
        name: Screens.StepTwo,
        key: Screens.StepTwo,
      });
    }
  }, [params, selectedBowl]);

  return (
    <Page progressBar>
      <PokeBowl />
      <PrimaryButton
        disabled={disabled}
        withIcon
        text={ButtonText.next}
        onPress={buttonHandler}
      />
    </Page>
  );
};
