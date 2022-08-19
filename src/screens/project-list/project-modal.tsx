import React from "react";
import {Button, Drawer} from "antd";


export const ProjectModal = (props: {projecModalOpen: boolean, onClose: () => void}) => {
  return (
    <Drawer
      visible={props.projecModalOpen}
      width={'100%'}
      onClose={props.onClose}
    >
      <h2>Project Modal</h2>
      <Button onClick={props.onClose}></Button>
    </Drawer >
  );
};

