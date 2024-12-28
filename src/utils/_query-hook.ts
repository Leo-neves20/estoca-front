import {
  useQuery,
  type UseQueryResult,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { HTTPError } from "ky";
import { useMemo } from "react";
import { api } from "@/service";

export type BaseResponse<TResponse> = UseQueryResult<TResponse, HTTPError>;

type BaseParams = {
  urlParams: string;
  queryKey: (string | number)[];
  options?: Exclude<UseQueryOptions, " queryKey" | "queryKey">;
  requestType?: "internal" | "external";
};

export const Query = <TResponse>(
  params: BaseParams
): BaseResponse<TResponse> => {
  const { options, queryKey, requestType = "external", urlParams } = params;

  const memoizedQueryKey = useMemo(() => {
    return queryKey;
  }, [queryKey]);

  return useQuery({
    queryKey: memoizedQueryKey,
    queryFn: async () => {
      try {
        const apiInstance =
          requestType === "external"
            ? api.baseApiExternal
            : api.baseApiInternal;
        return await apiInstance.get(urlParams);
      } catch (error) {
        if (error instanceof HTTPError) {
          throw error;
        }
        throw new Error("Unexpected error");
      }
    },
    ...options,
  }) as BaseResponse<TResponse>;
};
