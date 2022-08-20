import React, { ReactNode, useCallback } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import * as authThunk from "store/auth.slice";
import { useDispatch, useSelector } from "react-redux";
export interface AuthForm {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

interface iAuthContext {
  user: User | null;
  login: (form: AuthForm) => Promise<void>;
  register: (form: AuthForm) => Promise<void>;
  logout: () => Promise<void>;
}

// const AuthContext = React.createContext<iAuthContext | undefined>(undefined);

// AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();
  const dispatch = useDispatch();
  useMount(() => {
    // bootstrapUser().then(setUser);
    // run(bootstrapUser())
    // run(dispatch(authThunk.bootstrap))
  });
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  // const login = (form: AuthForm) => auth.login(form).then(user => setUser(user));
  /*  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null)); */

  /* return (
    <AuthContext.Provider
      children={children}
      value={{user, login, register, logout}}
    />
  ); */
  return children;
};

export const useAuth = () => {
  /* const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  } */
  // const dispatch:(...args:unknown[])=>Promise<User> = useDispatch();
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(authThunk.selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authThunk.login(form)),
    []
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authThunk.register(form)),
    []
  );
  const logout = useCallback(() => dispatch(authThunk.logout()), [dispatch]);
  return {
    user,
    login,
    logout,
    register,
  };
};
