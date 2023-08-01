import { createGlobalStyle } from 'styled-components';
import { FONT_URL } from '../utils/url';

export const GlobalStyle = createGlobalStyle`
 
@font-face {
  font-family: 'Hyundai Sans Head Bold';
  src: url('${FONT_URL}HyundaiSansHead-Bold.otf') format("opentype");
}

@font-face {
  font-family: 'Hyundai Sans Head Medium';
  src: url('${FONT_URL}HyundaiSansHeadKROTFMedium.otf') format("opentype");
}
@font-face {
  font-family: 'Hyundai Sans Head Regular';
  src: url('${FONT_URL}HyundaiSansHeadKROTFRegular.otf') format("opentype");
}
@font-face {
  font-family: 'Hyundai Sans Head Light';
  src: url('${FONT_URL}HyundaiSansHeadKROTFLight.otf') format("opentype");
}
@font-face {
  font-family: 'Hyundai Sans Text Bold';
  src: url('${FONT_URL}HyundaiSansHeadKROTFBold.otf') format("opentype");
}
@font-face {
  font-family: 'Hyundai Sans Text Medium';
  src: url('${FONT_URL}HyundaiSansHeadKROTFMedium.otf') format("opentype");
}
@font-face {
  font-family: 'Hyundai Sans Text Regular';
  src: url('${FONT_URL}HyundaiSansHeadKROTFRegular.otf') format("opentype");
  font-weight: 700;
}
@font-face {
  font-family: 'Hyundai Sans Text Light';
  src: url('${FONT_URL}HyundaiSansHeadKROTFLight.otf') format("opentype");
}
@font-face {
  font-family: 'Hyundai Sans Head KR Bold';
  src: url('${FONT_URL}HyundaiSansHeadKROTFBold.otf') format("opentype");
  font-weight: 700;
}
@font-face {
  font-family: 'Hyundai Sans Head KR Medium';
  src: url('${FONT_URL}HyundaiSansHeadKROTFMedium.otf') format("opentype");
}
@font-face {
  font-family: 'Hyundai Sans Head KR Regular';
  src: url('${FONT_URL}HyundaiSansHeadKROTFRegular.otf') format("opentype");
}
@font-face {
  font-family: 'Hyundai Sans Head KR Light';
  src: url('${FONT_URL}HyundaiSansHeadKROTFLight.otf') format("opentype");
}
@font-face {
  font-family: 'Hyundai Sans Text KR Bold';
  src: url('${FONT_URL}HyundaiSansHeadKROTFBold.otf') format("opentype");
}
@font-face {
  font-family: 'Hyundai Sans Text KR Medium';
  src: url('${FONT_URL}HyundaiSansHeadKROTFMedium.otf') format("opentype");
}
@font-face {
  font-family: 'Hyundai Sans Text KR Regular';
  src: url('${FONT_URL}HyundaiSansHeadKROTFRegular.otf') format("opentype");
}
@font-face {
  font-family: 'Hyundai Sans Text KR Light';
  src: url('${FONT_URL}HyundaiSansHeadKROTFLight.otf') format("opentype");
}
  `;
