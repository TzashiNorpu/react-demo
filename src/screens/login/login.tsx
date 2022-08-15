import React from "react";
export const LoginScreen = () => {
  return (
    <form>
      <div>
        <label htmlFor="userName">用户名</label>
        <input type="text" id={"userName"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"} />
      </div>
      <button type={"submit"}>登录</button>
    </form>
  );
};
