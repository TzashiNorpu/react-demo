import {useMemo} from "react";
import {URLSearchParamsInit, useSearchParams} from "react-router-dom"
import {cleanObject} from "utils";

export const useUrlQueryParam = <V extends string>(keys: V[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  /* return [keys.reduce((prev, key) => {
    return {...prev, [key]: searchParams.get(key) || ''}
  }, {} as {[key in V]: string}), searchParams] as const */
  return [
    useMemo(
      () => keys.reduce((prev, key) => {
        return {...prev, [key]: searchParams.get(key) || ''}
      }, {} as {[key in V]: string}),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{[key in V]: unknown}>) => {
      const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit;
      return setSearchParam(o);
    }
  ] as const
}