import ky from "ky";
import { env } from "./_env";

export const baseApiExternal = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
});
export const baseApiInternal = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_INTERNAL_URL,
});

interface iApi {
  baseApiExternal: typeof baseApiExternal;
  baseApiInternal: typeof baseApiInternal;
}

export const api: iApi = {
  baseApiExternal,
  baseApiInternal,
};
