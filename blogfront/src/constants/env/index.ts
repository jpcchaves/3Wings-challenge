const { VITE_API_BASE_URL, VITE_BLOGPOST_V1, VITE_BLOGPOST_ENDPOINT } =
  import.meta.env;

export const baseURL = VITE_API_BASE_URL;
export const blogPostEndpoint = `/${VITE_BLOGPOST_V1}/${VITE_BLOGPOST_ENDPOINT}`;
