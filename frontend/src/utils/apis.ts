const { VITE_API_URL: BASE_API_URL, VITE_IMG_URL: BASE_IMG_URL } = import.meta.env;

export const IMG_URL = `${BASE_IMG_URL}`;
export const TRIM_API = `${BASE_API_URL}/api/cars/types`;
export const MODEL_TYPE_API = `${BASE_API_URL}/api/modeltypes`;
export const OPTION_API = `${BASE_API_URL}/api/options`;
export const OUTER_COLOR_API = `${BASE_API_URL}/api/cars/colors/outer`;
export const OUTER_IMG_API = `${BASE_API_URL}/api/cars/colors/outer/images`;
export const INNER_COLOR_API = `${BASE_API_URL}/api/cars/colors/inner`;
export const DEFAULT_INFO_API = `${BASE_API_URL}/api/cars/infos/defaults`;
export const SHARE_INFO_API = `${BASE_API_URL}/api/quote/infos/shares`;
export const CAR_LIST_API = `${BASE_API_URL}/api/cars/list`;
export const QUOTE_LIST_API = `${BASE_API_URL}/api/quote/list`;
export const BOUGHT_INFO_API = `${BASE_API_URL}/api/quote/bought/infos?carid=1`;
export const HISTORIES_API = `${BASE_API_URL}/api/quote/histories/detail`;
