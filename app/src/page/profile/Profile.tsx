import Temp from "../../component/template/Temp";
import EditProfile from "./EditProfile";
import { useModal } from "../../context/UseModal";
import { useAlert } from "../../context/UseAlert";
import Alert from "../../component/alert/Alert";
import { useAuth } from "../../context/Auth";
import PathResource from "../../service/PathResource";
import UserPng from "../../../public/User.png";

const Profile = () => {
  const modal = useModal();
  const alert = useAlert();
  const { user } = useAuth();
  return (
    <>
      {modal.state.isOpen && modal.state.position === "PROFILE" && (
        <EditProfile />
      )}
      <Temp>
        {alert.state?.isOpen && alert.state?.position === "PROFILE" && (
          <Alert />
        )}
        <main className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative w-32 h-32">
              <img
                src={user?.img ? PathResource.imgProfile(user?.img) : UserPng}
                alt="Profile"
                className="w-full h-full rounded-full border-4 border-gray-300 object-cover"
              />
              <button
                onClick={modal.profileModal}
                className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-full p-2 shadow-md hover:bg-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
              </button>
            </div>
          </div>
          <h1 className="font-normal text-2xl tracking-wider mb-6 mt-4 capitalize">
            {user.name}
          </h1>
          <div className="grid grid-cols-3">
            <div className="w-full col-span-2 max-w-[90%] ">
              <label
                htmlFor="nama"
                className="block text-gray-700 font-semibold mb-1"
              >
                Nama Kandidat
              </label>

              <div className="relative border border-gray-400/50 w-full  rounded-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>

                <span className="block w-full pl-10 pr-4 py-2  text-gray-700">
                  {user.name}
                </span>
              </div>
            </div>
            <div className="w-full col-span-1  max-w-[90%]">
              <label
                htmlFor="Posisi"
                className="block text-gray-700 font-semibold mb-1"
              >
                Posisi Kandidat
              </label>

              <div className="relative border border-gray-400/50 w-full  rounded-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>

                <span className="block w-full pl-10 pr-4 py-2  rounded-lg text-gray-700">
                  {user.posisi}
                </span>
              </div>
            </div>
          </div>
        </main>
      </Temp>
    </>
  );
};
export default Profile;
