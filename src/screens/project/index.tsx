import React from "react"
import {Link} from 'react-router-dom';
import {Navigate, Route, Routes, useLocation} from "react-router"
import {EpicScreen} from "screens/epic"
import {KanbanScreen} from "screens/kanban"
import styled from "@emotion/styled";
import {Menu} from "antd";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export const ProjectScreen = () => {
  const routeType = useRouteType();
  const menuItems = [
    {
      key: 'kanban',
      icon: <Link to={"kanban"}>看板</Link>,
    },
    {
      key: 'epic',
      icon: <Link to={"epic"}>任务组</Link>,
    },
  ];
  return (
    < Container >


      <Aside>
        <Menu mode={"inline"} selectedKeys={[routeType]} items={menuItems} />
      </Aside>
      <Main>
        <Routes>
          <Route path={"kanban"} element={<KanbanScreen />} />
          <Route path={"epic"} element={<EpicScreen />} />
          <Route index element={<Navigate to={'kanban'} replace={true} />}></Route>
        </Routes>
      </Main>
    </Container >
  );
};

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 20rem 1fr;
  overflow: hidden;
`;
