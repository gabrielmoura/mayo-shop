import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { AxiosResponse } from "axios";
import { Spinner } from "@chakra-ui/react";
import Api from "../util/Api";
import ApiWithToken from "../util/ApiWithToken";


export interface User {
  id: string;
  email?: string;
  name: string;
  imageUrl?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

interface AuthContextType {
  user: User | undefined;
  authenticated: boolean;
  signIn: (formData: ILoginForm, callback: VoidFunction) => void;
  handleLogout: (callback: VoidFunction) => void;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export let AuthContext = React.createContext<AuthContextType>(null!);

AuthContext.displayName = "AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>();
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const validateUser: Promise<boolean> =
    ApiWithToken.get("/auth/verify")
      .then(() => {
        return true;
      }).catch(() => {
      handleLogout(() => {
        router.push("/login");
      });
      return false;
    });

  useEffect(() => {
    const getLogin = async () => {
      const token = localStorage.getItem("token");
      if (token && await validateUser) {
        setAuthenticated(true);
        setLoading(false);
        ApiWithToken.get("/auth/verify")
          .then((res) => {
            const { userId, username } = res.data;
            setUser({
              email: undefined,
              id: userId,
              name: username
            });
          });
      }
      setLoading(false);
    };
    getLogin();
    const interval = setInterval(() => {
        getLogin();
      }
      , 1000 * 60); // 1 min
    return () => clearInterval(interval);
  }, [authenticated]);


  const signIn = useCallback((formData: ILoginForm, callbak: VoidFunction) => {
    Api.post("/auth/login", formData).then((res: AxiosResponse<LoginResponse>) => {
      const { user, token } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("imageUrl", user?.imageUrl ?? "/img/undraw_profile.svg");
      setUser(user);
      setAuthenticated(true);
      setLoading(false);
      callbak();
    });
  }, []);

  const handleLogout = useCallback((callback: VoidFunction) => {
    setAuthenticated(false);
    setUser(undefined);
    localStorage.clear();
    return callback();
  }, []);

  if (loading) {
    return <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />;
  }


  let value = { user, signIn, handleLogout, authenticated };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}