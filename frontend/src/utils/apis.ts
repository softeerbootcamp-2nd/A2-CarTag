const { VITE_API_URL: BASE_API_URL, VITE_IMG_URL } = import.meta.env;

export const TRIM_API = `${BASE_API_URL}/api/cars/types`;
export const IMG_URL = `${VITE_IMG_URL}`;
