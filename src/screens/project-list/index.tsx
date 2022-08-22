import { List } from "./list";
import { SearchPanel } from "./search-panel";
import React from "react";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectModal, useProjectsSearchParams } from "./util";
import {
  ButtonNoPadding,
  ErrorBox,
  Row,
  ScreenContainer,
} from "components/lib";

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

  useDocumentTitle("项目列表", false);
  const [param, setParam] = useProjectsSearchParams();
  // const debouncedParam = useDebounce(projectParam, 300);
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 300));
  const { data: users } = useUsers();
  const { open } = useProjectModal();
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
    <ScreenContainer>
      <Row between={true}>
        {/* <Test /> */}
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type={"link"}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <List
        loading={isLoading}
        users={users || []}
        dataSource={list || []} /* list={list} */
      />
    </ScreenContainer>
  );
};

// ProjectListScreen.whyDidYouRender = true;
