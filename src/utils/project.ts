import {useCallback, useEffect} from "react";
import {Project} from "screens/project-list/list";
import {cleanObject} from "utils";
import {useHttp} from "./http";
import {useAsync} from "./use-async";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const {run, ...result} = useAsync<Project[]>();

  const fetchProjects = useCallback(() => client("projects", {data: cleanObject(param || {})}),[client, param]);
  useEffect(() => {
    run(fetchProjects(), {retry: fetchProjects});
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
  }, [param, run, fetchProjects]);
  return result;
}



export const useEditProject = () => {
  const client = useHttp();
  const {run, ...asyncResult} = useAsync();
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'PATCH'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
};

export const useAddProject = () => {
  const client = useHttp();
  const {run, ...asyncResult} = useAsync();
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'POST'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
};