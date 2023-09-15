import { ComponentProps, ComponentType, FC } from "react";
import {
  BaseProvider,
  BowlProvider,
  SauceProvider,
  SizeProvider,
  IngredientsProvider,
  ExtraIngredientsProvider,
  DishProvider,
  CartProvider,
  FavouriteDishProvider,
} from "../context";
import { ThemeProvider } from "styled-components";
import { useTheme } from "../hooks";
import { FormikProvider } from "formik";

type Providers = [ComponentType<any>, ComponentProps<any>?][];

const combineProviders = (providers: Providers): FC<React.PropsWithChildren> =>
  providers.reduce(
    (SumProviders, [Provider, props = {}]) =>
      ({ children }) =>
        (
          <SumProviders>
            <Provider {...props} value>
              <>{children}</>
            </Provider>
          </SumProviders>
        ),
    ({ children }) => <>{children}</>
  );

const { theme } = useTheme();

export const AllProviders = combineProviders([
  [ThemeProvider, { theme }],
  [FormikProvider],
  [BowlProvider],
  [SizeProvider],
  [BaseProvider],
  [SauceProvider],
  [IngredientsProvider],
  [ExtraIngredientsProvider],
  [DishProvider],
  [CartProvider],
  [FavouriteDishProvider],
]);
