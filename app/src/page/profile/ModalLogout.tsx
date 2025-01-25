import Modal from "../../component/modal/modal";
import { useAuth } from "../../context/Auth";
import { useModal } from "../../context/UseModal";

const ModalLogout = () => {
  const modal = useModal();
  const { authContext } = useAuth();
  const logout = () => {
    modal.closeModal;
    authContext.signOut();
  };
  return (
    <Modal loading={false}>
      <form className="w-full mx-auto p-6">
        <div className="span">Apakah Anda Akan Logout ?</div>
        <div className="flex justify-end space-x-4 mt-5">
          <button
            type="button"
            onClick={modal.closeModal}
            className="border hover:cursor-pointer border-blue-500 text-blue-500 px-6 py-2 rounded-md hover:bg-blue-100 transition"
          >
            Batalkan
          </button>
          <button
            type="submit"
            onClick={logout}
            className="bg-blue-500 hover:cursor-pointer text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Log Out
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalLogout;
