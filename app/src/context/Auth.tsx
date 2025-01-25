// AuthContext.js
import React, { createContext, useMemo } from "react";
import ApiLogin from "../service/ApiLogin";
import { redirect } from "react-router";

interface AuthContextType {
  signIn: (data: any) => Promise<void>;
  signOut: () => void;
  refreshToken: (data: any) => Promise<void>;
}

const AuthContext = createContext<any>(undefined);

export const AuthProvider = ({
  children,
  loading,
  isLoading,
  setisSignedIn,
  setUser,
  user,
  isSignedIn,
}: any) => {
  const authContext = React.useMemo<AuthContextType>(
    () => ({
      signIn: async (data: any) => {
        isLoading(true);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        setisSignedIn(true);
        setUser(data.user);
        isLoading(false);
      },
      refreshToken: async () => {
        const refreshToken = async (refreshtoken: string) => {
          const formData = new FormData();
          formData.append("refresh_token", refreshtoken);

          return await ApiLogin.refreshToken(formData);
        };
        try {
          const refreshtoken = localStorage.getItem("refresh_token");
          if (refreshtoken) {
            const data: any = await refreshToken(refreshtoken);
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            setisSignedIn(true);
            isLoading(false);
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token");
            setUser("");
            setisSignedIn(false);
            isLoading(false);
            redirect("/login");
          }
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          setUser("");
          setisSignedIn(false);
          isLoading(false);
          redirect("/");
        }
      },
      signOut: async () => {
        isLoading(true);

        try {
          const logout = await ApiLogin.logout();
          if (logout) {
            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token");
            setUser("");
            setisSignedIn(false);
            isLoading(false);
            redirect("/");
          }
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          setUser("");
          setisSignedIn(false);
          isLoading(false);
          redirect("/login");
        }
      },
    }),
    []
  );
  const authContextValue = useMemo(
    () => ({
      authContext,
      isLoading,
      loading,
      setisSignedIn,
      isSignedIn,
      setUser,
      user,
    }),
    [authContext, isLoading, loading, setisSignedIn, setUser, user, isSignedIn]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
