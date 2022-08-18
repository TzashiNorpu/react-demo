import {List} from "./list";
import {SearchPanel} from "./search-panel";
import React from "react";
import {useDebounce, useDocumenTitle} from "utils";
import styled from "@emotion/styled";
import {Typography} from "antd";
import {useProjects} from "utils/project";
import {useUsers} from "utils/user";
import {useProjectsSearchParams} from "./util";

export const ProjectListScreen = () => {
  /* const [param, setParam] = useState({
    name: "",
    personId: "",
  }); */
  /*   const [, setParam] = useState({
      name: "",
      personId: "",
    }); */
  /*  const [param, setParam] = useUrlQueryParam(['name', 'personId']);
   const projectParam = {...param, personId: Number(param.personId) || undefined}; */
  // const [users, setUsers] = useState([]);
  // const [list, setList] = useState([]);
  /* 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
 */

  useDocumenTitle('项目列表', false);
  const [param, setParam] = useProjectsSearchParams();
  // const debouncedParam = useDebounce(projectParam, 300);
  const {isLoading, error, data: list} = useProjects(useDebounce(param, 300));
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
      {/* <Test /> */}
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {
        error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null
      }
      <List loading={isLoading} users={users || []} dataSource={list || []}/* list={list} */ />
    </Container>
  );
};

// ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
