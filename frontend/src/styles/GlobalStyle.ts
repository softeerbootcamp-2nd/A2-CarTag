import { createGlobalStyle } from 'styled-components';
import { FONT_URL } from '../utils/url';

export const GlobalStyle = createGlobalStyle`
 
@font-face {
  font-family: 'Hyundai Sans Head Bold';
  src: local('HyundaiSansHead-Bold');
}
@font-face {
  font-family: 'Hyundai Sans Head Medium';
  src: local('${FONT_URL}HyundaiSansHeadKROTFMedium.otf');
}
@font-face {
  font-family: 'Hyundai Sans Head Regular';
  src: local('${FONT_URL}HyundaiSansHeadKROTFRegular.otf');
}
@font-face {
  font-family: 'Hyundai Sans Head Light';
  src: local('${FONT_URL}HyundaiSansHeadKROTFLight.otf');
}
@font-face {
  font-family: 'Hyundai Sans Text Bold';
  src: local('${FONT_URL}HyundaiSansHeadKROTFBold.otf');
}
@font-face {
  font-family: 'Hyundai Sans Text Medium';
  src: local('${FONT_URL}HyundaiSansHeadKROTFMedium.otf');
}
@font-face {
  font-family: 'Hyundai Sans Text Regular';
  src: local('${FONT_URL}HyundaiSansHeadKROTFRegular.otf');
  font-weight: 700;
}
@font-face {
  font-family: 'Hyundai Sans Text Light';
  src: local('${FONT_URL}HyundaiSansHeadKROTFLight.otf');
}
@font-face {
  font-family: 'Hyundai Sans Head KR Bold';
  src: local('${FONT_URL}HyundaiSansHeadKROTFBold.otf');
  font-weight: 700;
}
@font-face {
  font-family: 'Hyundai Sans Head KR Medium';
  src: local('${FONT_URL}HyundaiSansHeadKROTFMedium.otf');
}
@font-face {
  font-family: 'Hyundai Sans Head KR Regular';
  src: local('${FONT_URL}HyundaiSansHeadKROTFRegular.otf');
}
@font-face {
  font-family: 'Hyundai Sans Head KR Light';
  src: local('${FONT_URL}HyundaiSansHeadKROTFLight.otf');
}
@font-face {
  font-family: 'Hyundai Sans Text KR Bold';
  src: local('${FONT_URL}HyundaiSansHeadKROTFBold.otf');
}
@font-face {
  font-family: 'Hyundai Sans Text KR Medium';
  src: local('${FONT_URL}HyundaiSansHeadKROTFMedium.otf');
}
@font-face {
  font-family: 'Hyundai Sans Text KR Regular';
  src: local('${FONT_URL}HyundaiSansHeadKROTFRegular.otf');
}
@font-face {
  font-family: 'Hyundai Sans Text KR Light';
  src: local('${FONT_URL}HyundaiSansHeadKROTFLight.otf');
}
  `;
