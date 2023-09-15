import { View } from 'react-native';
import { Navigators } from '../../types';
import { useTheme } from '../../hooks';
import styled from 'styled-components/native';

import { HomeIcon, FavouriteIcon } from '../../../assets/svg';
import { CartItemsIcon } from './CartItemsIcon';

export const TabBar = ({ state, descriptors, navigation }: any) => {
  const { theme } = useTheme();

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const iconColor = isFocused ? theme.colors.secondary : theme.colors.primary;
        let icon: React.ReactNode;

        switch (label) {
          case Navigators.Home:
            icon = <HomeIcon color={iconColor} />;
            break;
          case Navigators.Favourites:
            icon = <FavouriteIcon color={iconColor} />;
            break;
          case Navigators.Cart:
            icon = <CartItemsIcon isFocused={isFocused} />;
            break;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        
        return (
          <StyledTabBar
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            key={index}
            onLongPress={onLongPress}>
            {icon}
            <StyledText isFocused={isFocused}>{label}</StyledText>
          </StyledTabBar>
        );
      })}
    </View>
  );
};

const StyledText = styled.Text<{ isFocused: boolean }>(
  ({ theme, isFocused }) => `
  color: ${isFocused ? theme.colors.secondary : theme.colors.primary}
`
);

const StyledTabBar = styled.TouchableOpacity(
  ({ theme }) => `
  height: 70px;
  flex: 1;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background};
`
);
