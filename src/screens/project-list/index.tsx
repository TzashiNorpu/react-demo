import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useEffect, useState } from "react";
import React from "react";
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  const debouncedParam = useDebounce(param, 300);

  const client = useHttp();

  // param 改变时从接口获取数据
  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
    /* fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });*/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
    /* fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    }); */
  });
  return (
    <Container>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  );
};
const Container = styled.div`
  padding: 3.2rem;
`;
