import 'styled-components';

interface IColor {
  // primary color 계열
  primaryColor: string;
  primaryColor100: string;
  primaryColor200: string;
  primaryColor300: string;
  primaryColor400: string;
  primaryColor500: string;
  primaryColor600: string;
  primaryColor700: string;
  primaryColor800: string;
  primaryColor900: string;

  // white 계열
  white: string;
  gray50: string;
  gray100: string;
  gray200: string;
  gray300: string;
  gray400: string;
  gray500: string;
  gray600: string;
  gray700: string;
  gray800: string;
  gray900: string;

  // blue 계열
  activeBlue: string;
  activeBlue2: string;
  skyBlue: string;

  //background 색상
  skyBlueCardBg: string;
  cardBg: string;
  cardBgOpacity05: string;
  blueBg: string;

  //sand 계열
  sand: string;
  sand2: string;
  lightSand: string;
}
declare module 'styled-components' {
  export interface DefaultTheme {
    color: IColor;
  }
}
