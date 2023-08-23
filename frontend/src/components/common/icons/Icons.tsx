import React from 'react';
import { theme } from '../../../styles/theme';

interface ISvg extends React.SVGProps<SVGSVGElement> {
  active?: boolean;
}

export function ArrowUp({ ...props }: ISvg) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M6.16475 15.3352C6.36445 15.5349 6.67695 15.5531 6.89716 15.3897L6.96025 15.3352L11.8125 10.4832L16.6648 15.3352C16.8645 15.5349 17.177 15.5531 17.3972 15.3897L17.4602 15.3352C17.6599 15.1355 17.6781 14.8231 17.5147 14.6028L17.4602 14.5398L12.2102 9.28975C12.0105 9.09005 11.698 9.0719 11.4778 9.23529L11.4148 9.28975L6.16475 14.5398C5.94508 14.7594 5.94508 15.1156 6.16475 15.3352Z"
        fill={props.fill}
      />
    </svg>
  );
}

export function ArrowDown({ ...props }: ISvg) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M17.8352 9.66475C17.6355 9.46505 17.323 9.4469 17.1028 9.61029L17.0398 9.66475L12.1875 14.5168L7.33525 9.66475C7.13555 9.46505 6.82305 9.4469 6.60284 9.61029L6.53975 9.66475C6.34005 9.86445 6.3219 10.177 6.48529 10.3972L6.53975 10.4602L11.7898 15.7102C11.9895 15.9099 12.302 15.9281 12.5222 15.7647L12.5852 15.7102L17.8352 10.4602C18.0549 10.2406 18.0549 9.88442 17.8352 9.66475Z"
        fill={props.fill}
      />
    </svg>
  );
}

export function ArrowLeft({ ...props }: ISvg) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <g clipPath="url(#clip0_2522_6830)">
        <path
          d="M14.0002 6L15.4102 7.41L10.8302 12L15.4102 16.59L14.0002 18L8.00016 12L14.0002 6Z"
          fill={props.fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_2522_6830">
          <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 1 24 0)" />
        </clipPath>
      </defs>
    </svg>
  );
}
export function ArrowRight({ ...props }: ISvg) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <g clipPath="url(#clip0_2522_2451)">
        <path
          d="M9.99984 6L8.58984 7.41L13.1698 12L8.58984 16.59L9.99984 18L15.9998 12L9.99984 6Z"
          fill={props.fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_2522_2451">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function SearchIcon({ ...props }: ISvg) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="24px icon=carbon:search">
        <path
          id="Vector"
          d="M21.75 20.6895L16.086 15.0255C17.4471 13.3914 18.1258 11.2956 17.981 9.17389C17.8362 7.05219 16.8789 5.06801 15.3084 3.6341C13.7379 2.2002 11.6751 1.42697 9.54896 1.47528C7.42288 1.52359 5.39726 2.38971 3.8935 3.89347C2.38974 5.39723 1.52362 7.42284 1.47531 9.54893C1.427 11.675 2.20023 13.7379 3.63413 15.3084C5.06804 16.8789 7.05222 17.8361 9.17392 17.981C11.2956 18.1258 13.3915 17.4471 15.0255 16.086L20.6895 21.75L21.75 20.6895ZM3 9.74996C3 8.41494 3.39588 7.1099 4.13758 5.99987C4.87928 4.88983 5.93348 4.02467 7.16688 3.51378C8.40028 3.00289 9.75748 2.86921 11.0669 3.12966C12.3762 3.39011 13.579 4.03299 14.523 4.97699C15.467 5.921 16.1098 7.12373 16.3703 8.4331C16.6307 9.74248 16.4971 11.0997 15.9862 12.3331C15.4753 13.5665 14.6101 14.6207 13.5001 15.3624C12.3901 16.1041 11.085 16.5 9.75 16.5C7.96039 16.498 6.24466 15.7862 4.97922 14.5207C3.71378 13.2553 3.00198 11.5396 3 9.74996Z"
          fill="#414344"
        />
      </g>
    </svg>
  );
}

export function CancelIcon({ ...props }: ISvg) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
        fill={theme.color.gray800}
      />
    </svg>
  );
}

export function CheckIcon({ active, ...props }: ISvg) {
  const color = active ? theme.color.activeBlue : theme.color.gray200;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.7 18.025L4 12.325L5.425 10.9L9.7 15.175L18.875 6L20.3 7.425L9.7 18.025Z"
        fill={color}
      />
    </svg>
  );
}

export function CloseIcon({ ...props }: ISvg) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5L12 10.59L6.41 5Z"
        fill="#414344"
      />
    </svg>
  );
}
export function Bubble({ ...props }: ISvg) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="323"
      height="206"
      viewBox="0 0 323 206"
      fill="none"
      {...props}
    >
      <path
        d="M319 -1.74845e-07C321.209 -7.82809e-08 323 1.79086 323 4L323 202C323 204.209 321.209 206 319 206L15.3559 206C13.1468 206 11.3559 204.209 11.3559 202L11.3559 62.4907C11.3559 61.1542 10.6884 59.9059 9.57672 59.1639L1.49188 53.7669C0.305753 52.9751 0.305753 51.2319 1.49188 50.4401L9.57672 45.0431C10.6884 44.3011 11.3559 43.0528 11.3559 41.7163L11.3559 3.99999C11.3559 1.79085 13.1468 -1.35441e-05 15.3559 -1.34475e-05L319 -1.74845e-07Z"
        fill="white"
      />
      <path
        d="M319 -1.74845e-07C321.209 -7.82809e-08 323 1.79086 323 4L323 202C323 204.209 321.209 206 319 206L15.3559 206C13.1468 206 11.3559 204.209 11.3559 202L11.3559 62.4907C11.3559 61.1542 10.6884 59.9059 9.57672 59.1639L1.49188 53.7669C0.305753 52.9751 0.305753 51.2319 1.49188 50.4401L9.57672 45.0431C10.6884 44.3011 11.3559 43.0528 11.3559 41.7163L11.3559 3.99999C11.3559 1.79085 13.1468 -1.35441e-05 15.3559 -1.34475e-05L319 -1.74845e-07Z"
        fill="#A2C7E7"
        fillOpacity="0.3"
      />
    </svg>
  );
}

export function LoadingIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path
        d="M26.0998 32.0332C22.6961 33.9979 18.6941 34.6583 14.8396 33.8912C10.9851 33.1242 7.54079 30.9821 5.14846 27.864C2.75612 24.7459 1.57886 20.8645 1.836 16.9428C2.09315 13.0211 3.76715 9.32663 6.54616 6.54762C9.32517 3.76862 13.0197 2.09461 16.9413 1.83747C20.863 1.58032 24.7445 2.75758 27.8626 5.14992C30.9806 7.54226 33.1227 10.9865 33.8898 14.8411C34.6568 18.6956 33.9964 22.6975 32.0317 26.1013"
        stroke="#DADCDD"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LoadingIcon2() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="32" viewBox="0 0 36 32" fill="none">
      <path
        d="M1.80005 15.9999H12.6M23.4001 15.9999H34.2001M9.90005 30.0291L15.3 20.6763M20.7001 11.3235L26.1001 1.9707M26.1001 30.0291L20.7001 20.6763M15.3 11.3235L9.90005 1.9707"
        stroke="#DADCDD"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LoadingIcon3() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M6.99998 12.3996C9.98231 12.3996 12.4 9.98195 12.4 6.99961C12.4 4.01727 9.98231 1.59961 6.99998 1.59961C4.01764 1.59961 1.59998 4.01727 1.59998 6.99961C1.59998 9.98195 4.01764 12.3996 6.99998 12.3996Z"
        stroke="#DADCDD"
        strokeWidth="3"
      />
    </svg>
  );
}

export function CopyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <g clipPath="url(#clip0_6_29499)">
        <path
          d="M17 7H13V9H17C18.65 9 20 10.35 20 12C20 13.65 18.65 15 17 15H13V17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7ZM11 15H7C5.35 15 4 13.65 4 12C4 10.35 5.35 9 7 9H11V7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H11V15ZM8 11H16V13H8V11ZM17 7H13V9H17C18.65 9 20 10.35 20 12C20 13.65 18.65 15 17 15H13V17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7ZM11 15H7C5.35 15 4 13.65 4 12C4 10.35 5.35 9 7 9H11V7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H11V15ZM8 11H16V13H8V11Z"
          fill="#00397B"
        />
      </g>
      <defs>
        <clipPath id="clip0_6_29499">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function NorthWest({ active, ...props }: ISvg) {
  const color = active ? theme.color.white : theme.color.gray200;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      {...props}
    >
      <path d="M0 8H1.6V2.728L10.872 12L12 10.872L2.728 1.6H8V0H0V8Z" fill={color} />
    </svg>
  );
}
