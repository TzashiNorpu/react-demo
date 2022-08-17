import {List} from "./list";
import {SearchPanel} from "./search-panel";
import {useState} from "react";
import React from "react";
import {useDebounce} from "utils";
import styled from "@emotion/styled";
import {Typography} from "antd";
import {useProjects} from "utils/project";
import {useUsers} from "utils/user";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  // const [users, setUsers] = useState([]);
  // const [list, setList] = useState([]);
  /* 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
 */
  const debouncedParam = useDebounce(param, 300);
  const {isLoading, error, data: list} = useProjects(debouncedParam);
  const {data: users} = useUsers();
  // const client = useHttp();

  // const {run, isLoading, error, data: list} = useAsync<Project[]>();
  // param 改变时从接口获取数据
  // useEffect(() => {
  // run(client("projects", {data: cleanObject(debouncedParam)}))
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
  // }, [debouncedParam]);

  // useMount(() => {
  // client("users").then(setUsers);
  /* fetch(`${apiUrl}/users`).then(async (response) => {
    if (response.ok) {
      setUsers(await response.json());
    }
  }); */
  // });
  return (
    <Container>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {
        error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null
      }
      <List loading={isLoading} users={users || []} dataSource={list || []}/* list={list} */ />
    </Container>
  );
};
const Container = styled.div`
  padding: 3.2rem;
`;
