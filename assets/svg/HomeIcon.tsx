import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const HomeIcon: React.FC<SvgProps> = ({ color }) => {
  return (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
      <Path
        d="M3.5 9L12.5 2L21.5 9V20C21.5 20.5304 21.2893 21.0391 20.9142 21.4142C20.5391 21.7893 20.0304 22 19.5 22H5.5C4.96957 22 4.46086 21.7893 4.08579 21.4142C3.71071 21.0391 3.5 20.5304 3.5 20V9Z"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path d="M9.5 22V12H15.5V22" stroke={color} stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  );
};
