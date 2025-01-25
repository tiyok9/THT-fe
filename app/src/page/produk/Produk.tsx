import Alert from "../../component/alert/Alert";
import Temp from "../../component/template/Temp";
import { useAlert } from "../../context/UseAlert";
import TableProduct from "./TableProduk";
import DeleteModal from "./DeleteModal";
import { useModal } from "../../context/UseModal";

const Produk = () => {
  const alert = useAlert();
  const modal = useModal();
  return (
    <>
      {modal.state.isOpen && modal.state.position == "PRODUK" && (
        <DeleteModal />
      )}
      <Temp>
        <main className="flex-1 overflow-y-auto">
          {alert.state?.isOpen && alert.state?.position === "PRODUK" && (
            <Alert />
          )}
          <TableProduct />
        </main>
      </Temp>
    </>
  );
};
export default Produk;
