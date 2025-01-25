import Produk from "../page/produk/Produk";
import Profile from "../page/profile/Profile";
import Login from "../page/login/Login";
import { useAuth } from "../context/Auth";
import { Routes, Route } from "react-router";
import ProtectedRoute from "../component/auth/ProtectedRoute";
import AddProduk from "../page/produk/AddProduk";
import EditProduk from "../page/produk/EditProduk";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ApiProfile from "../service/ApiProfile";
import Loading from "../component/loading/Loading";
import ModalLogout from "../page/profile/ModalLogout";
import { useModal } from "../context/UseModal";
import Register from "../page/register/Register";

const dataUser = async () => {
  return await ApiProfile.getProfile();
};

const RouteContainer = () => {
  const { isSignedIn, setisSignedIn, setUser, isLoading, loading } = useAuth();
  const modal = useModal();
  const tokenString: string | null = localStorage.getItem("token");
  const { data, isSuccess, isError } = useQuery<any>({
    queryKey: ["userprofile"],
    queryFn: dataUser,
    enabled: Boolean(tokenString),
  });
  useEffect(() => {
    if (!tokenString) {
      isLoading(false);
      setisSignedIn(false);
    }
  }, [tokenString]);

  useEffect(() => {
    if (data) {
      setisSignedIn(true);
      setUser(data.data);
      isLoading(false);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) {
      setisSignedIn(false);
      setUser("");
      isLoading(false);
    }
  }, [isError]);

  return (
    <>
      {modal.state.isOpen && modal.state.position === "LOGOUT" && (
        <ModalLogout />
      )}

      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isAuth={isSignedIn}>
                <Produk />
              </ProtectedRoute>
            }
          />
          <Route
            path="/produk/addproduk"
            element={
              <ProtectedRoute isAuth={isSignedIn}>
                <AddProduk />
              </ProtectedRoute>
            }
          />
          <Route
            path="/produk/editproduk"
            element={
              <ProtectedRoute isAuth={isSignedIn}>
                <EditProduk />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={!isSignedIn ? <Login /> : <Produk />} />
          <Route
            path="/register"
            element={!isSignedIn ? <Register /> : <Produk />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuth={isSignedIn}>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default RouteContainer;
