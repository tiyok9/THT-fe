import SignOut from "../../../public/SignOut.png";
import { useModal } from "../../context/UseModal";

const Logout = () => {
  const modal = useModal();

  return (
    <>
      <a
        href="#"
        onClick={() => modal.logout()}
        className="block py-2.5 rounded hover:bg-gray-100/50 pl-5"
      >
        <div className="flex flex-row gap-2 items-center">
          <img
            src={SignOut}
            className="w-5 h-5 object-contain max-w-full rounded"
            alt="SignOut"
          />
          <h1 className="text-xl font-light">Logout</h1>
        </div>
      </a>
    </>
  );
};

export default Logout;
