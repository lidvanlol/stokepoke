import {
  
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { FlexRow, Page, PrimaryButton, SecondaryButton } from "../components";
import { ExtraIngredient } from "../components/extraIngredients";
import {
  ButtonText,
  HomeScreenNavigationProps,
  HomeStackParamList,
  Screens,
} from "../types";

import { useSteps } from "../hooks";

export const StepThree = () => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const { params } =
    useRoute<RouteProp<HomeStackParamList, Screens.StepThree>>();
  const { setCurrentStep } = useSteps();

  useFocusEffect(() => {
    setCurrentStep(3);
  });
  const nextHandler = () => {
    if (params) {
      if (params.isFavouriteEdit) {
        navigation.navigate({
          name: Screens.FinalStep,
          key: Screens.FinalStep,
          params: { isFavouriteEdit: true },
        });
      }
    } else {
      navigation.navigate({
        name: Screens.FinalStep,
        key: Screens.FinalStep,
      });
    }
  };
  return (
    <Page progressBar>
      <ExtraIngredient />
      <FlexRow gap={15} marginBottom={50}>
        <SecondaryButton
          fontWeight
          text={ButtonText.back}
          onPress={() => navigation.goBack()}
        />
        <PrimaryButton
          fontWeight
          withIcon
          text={ButtonText.next}
          onPress={nextHandler}
        />
      </FlexRow>
    </Page>
  );
};
