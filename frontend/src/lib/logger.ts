const isDev = process.env.NODE_ENV === "development";

export const logger = {
  debug: (...args: unknown[]) => {
    if (isDev) console.log("[debug]", ...args);
  },
  info: (...args: unknown[]) => {
    if (isDev) console.info("[info]", ...args);
  },
  error: (...args: unknown[]) => {
    console.error("[error]", ...args);
  },
};