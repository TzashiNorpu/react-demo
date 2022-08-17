import {useEffect} from "react";
import {Project} from "screens/project-list/list";
import {cleanObject} from "utils";
import {useHttp} from "./http";
import {useAsync} from "./use-async";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const {run, ...result} = useAsync<Project[]>();
  useEffect(() => {
    run(client("projects", {data: cleanObject(param || {})}))
    /* setIsLoading(true);
    client("projects", {data: cleanObject(debouncedParam)})
      .then(setList)
      .catch((error) => {
        setError(error);
        setList([]);
      })
      .finally(() => setIsLoading(false)); */

    /* fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });*/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result;
}