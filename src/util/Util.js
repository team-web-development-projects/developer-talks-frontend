const { NODE_ENV } = process.env;

// isPro, isDev
export const isPro = NODE_ENV === "production";
export const isDev = NODE_ENV === "development";



