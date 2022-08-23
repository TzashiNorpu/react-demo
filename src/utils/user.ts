import {useQuery} from "react-query";
import {User} from "types";
import {useHttp} from "./http";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  // const {run, ...result} = useAsync<User[]>();
  // useEffect(() => {
  // run(client("users", { data: cleanObject(param || {}) }));
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

  return useQuery<User[]>(["users", param], () =>
    client("users", {data: param})
  );
};
