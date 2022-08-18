import {useAuth} from "context/auth-context";
import React from "react";
import {Form, Input} from "antd";
import {LongButton} from "unauthenticated-app";
import {useAsync} from "utils/use-async";

export const LoginScreen = ({onError}: {onError: (error: Error) => void}) => {
  const {login} = useAuth();
  const {run, isLoading} = useAsync(undefined, {throwOnError: true});
  // const handleSumbit = (event: FormEvent<HTMLFormElement>) => {
  const handleSumbit = async (values: {username: string; password: string}) => {
    //  event.preventDefault();
    // const username = (event.currentTarget.elements[0] as HTMLInputElement)
    //   .value;
    // const password = (event.currentTarget.elements[1] as HTMLInputElement)
    //   .value; 
    // login({username, password});
    // login(values).catch((e) => onError(e));
    // await run(login(values)).catch(err => onError(err));
    try {
      await run(login(values));
    } catch (error) {
      onError(error as Error);
    }
    // run(login(values)).catch((e) => onError(e));
  };
  /*   const handleSumbit = async (values: {username: string; password: string}) => {
      try {
        await login(values);
      } catch (e) {
        onError(e);
      }
    };
   */
  return (
    <Form onFinish={handleSumbit}>
      {/*       {
        user ? <div>
          登录成功，用户名:{user?.name}
          token"{user?.token}
        </div> : null
      } */}
      <Form.Item
        name={"username"}
        rules={[{required: true, message: "请输入用户名"}]}
      >
        <Input placeholder={"用户名"} type="text" id={"userName"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{required: true, message: "请输入密码"}]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
