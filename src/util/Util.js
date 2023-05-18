const { NODE_ENV } = process.env;

export const isPro = NODE_ENV === "production";
export const isDev = NODE_ENV === "development";
