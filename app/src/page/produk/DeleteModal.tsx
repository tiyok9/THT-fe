import { useState } from "react";
import Modal from "../../component/modal/modal";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModal } from "../../context/UseModal";
import ApiProduk from "../../service/ApiProduk";
import { useAlert } from "../../context/UseAlert";

type Params = {
  id: string;
};

const submitMessage = async (params: Params) => {
  const formData = new FormData();
  formData.append("_method", "DELETE");

  return await ApiProduk.deleteProduk(formData, params.id);
};
const DeleteModal = () => {
  const modal = useModal();
  const alert = useAlert();
  const queryClient = useQueryClient();
  const [_errMessage, setErrmessage] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: submitMessage,
    onSettled: async (data: any, error: any) => {
      if (data) {
        await queryClient.invalidateQueries({ queryKey: ["product"] });
        setErrmessage("");
        alert.dispatch({
          type: "OPEN",
          position: "PRODUK",
          content: "Berhasil Input Data",
          message: "success",
        });
        modal.closeModal();
        setLoading(false);
      }
      if (error) {
        if (data.status === 422) {
          setErrmessage(data.errors);
          setLoading(false);
        } else {
          setErrmessage(data.errors);
          alert.dispatch({
            type: "OPEN",
            position: "PRODUK",
            content: "Gagal Menghapus Produk",
            message: "error",
          });
          modal.closeModal();

          setLoading(false);
        }
      }
    },
    onError(error, _variables, _context) {
      alert.dispatch({
        type: "OPEN",
        position: "PRODUK",
        content: "Gagal Menghapus Produk",
        message: "error",
      });
      modal.closeModal();
      setLoading(false);
      setErrmessage(error);
    },
  });

  const { handleSubmit } = useForm<Params>({
    defaultValues: {
      id: modal.state.value,
    },
  });

  const onSubmit = async (params: Params) => {
    setLoading(true);
    await mutation.mutate(params);
  };

  return (
    <Modal loading={loading}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto p-6">
        <div className="span">Apakah Anda Akan Menghapus Produk Ini ?</div>
        <div className="flex justify-end space-x-4 mt-5">
          <button
            type="button"
            onClick={!loading ? modal.closeModal : undefined}
            className="border hover:cursor-pointer border-blue-500 text-blue-500 px-6 py-2 rounded-md hover:bg-blue-100 transition"
          >
            Batalkan
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:cursor-pointer text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            {loading ? (
              <div className="flex flex-row gap-1 items-center">
                <svg
                  className="animate-spin w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    d="M4 12a8 8 0 0 1 16 0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>
                Proses
              </div>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteModal;
