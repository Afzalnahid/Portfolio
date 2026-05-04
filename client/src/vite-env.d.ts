/// <reference types="vite/client" />

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "@shared/const" {
  export const COOKIE_NAME: string;
  export const ONE_YEAR_MS: number;
}
