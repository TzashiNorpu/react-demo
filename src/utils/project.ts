import { useEffect } from "react";
import {
  QueryClient,
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { Project } from "screens/project-list/list";
import { useProjectsSearchParams } from "screens/project-list/util";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  // const {run, ...result} = useAsync<Project[]>();
  // useEffect(() => {
  // run(client("projects", {data: cleanObject(param || {})}))
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
  // }, [param]);

  // return result;

  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  /* const {run, ...asyncResult} = useAsync();
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'PATCH'
    }))
  }
  return {
    mutate,
    ...asyncResult
  } */
  /* const [searchParams] = useProjectsSearchParams();
  const queryClient = useQueryClient();
  const queryKey = ['projetcs',searchParams];
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess:()=>queryClient.invalidateQueries(queryKey),
      async onMutate(target:Partial<Project>){
        const previous =queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey,(old?:Project[])=>{
          return old?.map(project=>project.id===target.id?{...project,...target}:project)||[]
        })
        return {previous};
      },
      onError(error,newItem,context){
        queryClient.setQueryData(queryKey,context?.previous);
      }
    }
  ); */

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  /* const {run, ...asyncResult} = useAsync();
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'POST'
    }))
  }
  return {
    mutate,
    ...asyncResult
  } */
  // const queryClient = useQueryClient();
  /* return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
      {
        onSuccess:()=>queryClient.invalidateQueries('projects')
      }
  ); */
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    // id undefined 时不请求
    {
      enabled: Boolean(id),
    }
  );
};
