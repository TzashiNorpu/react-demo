import React from "react";
import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListActions,
  selectProjectModalOpen,
} from "./project-list.slice";

export const ProjectModal = () =>
  // props: {projecModalOpen: boolean, onClose: () => void}
  {
    const dispatch = useDispatch();
    const projecModalOpen = useSelector(selectProjectModalOpen);
    return (
      <Drawer
        // visible={props.projecModalOpen}
        visible={projecModalOpen}
        width={"100%"}
        // onClose={props.onClose}
        onClose={() => dispatch(projectListActions.closeProjectModal())}
      >
        <h2>Project Modal</h2>
        {/* <Button onClick={props.onClose}></Button> */}
        <Button
          onClick={() => dispatch(projectListActions.closeProjectModal())}
        ></Button>
      </Drawer>
    );
  };
