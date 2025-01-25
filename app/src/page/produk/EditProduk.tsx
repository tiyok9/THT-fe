import { useEffect, useState } from "react";
import Temp from "../../component/template/Temp";
import Select from "../../component/input/Select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Input from "../../component/input/Input";
import ApiProduk from "../../service/ApiProduk";
import { useLocation, useNavigate } from "react-router";
import { useAlert } from "../../context/UseAlert";
import LoadingSekeleton from "../../component/skeleton/LoadingSekeleton";
import PathResource from "../../service/PathResource";

type MessageProps = {
  id: string;
  nama_produk: string;
  img: FileList;
  id_kategori: string;
  harga_beli: string;
  stok: string;
};
const submitMessage = async (params: MessageProps) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("nama_produk", params.nama_produk);
  formData.append("id_kategori", params.id_kategori);
  formData.append("harga_beli", params.harga_beli);
  formData.append("stok", params.stok);
  if (params.img[0]) {
    formData.append("img", params.img[0]);
  }
  return await ApiProduk.updateProduk(formData, params.id);
};
const dataProduk = async (productId: string) => {
  return await ApiProduk.getProdukShow(productId);
};
export default function EditProduk() {
  const location = useLocation();
  const productId = location.state;
  const { data, isSuccess, isLoading, isError } = useQuery<any>({
    queryKey: ["produkShow", productId],
    queryFn: () => dataProduk(productId),
    enabled: !!productId,
  });

  const [errMessage, setErrmessage] = useState<any>("");
  const [_loading, setLoading] = useState(false);
  const alert = useAlert();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitMessage,
    onSettled: async (data: any, error: any) => {
      if (data) {
        await queryClient.invalidateQueries({
          queryKey: ["product"],
        });
        setErrmessage("");
        alert.dispatch({
          type: "OPEN",
          position: "PRODUK",
          content: "Berhasil Input Data",
          message: "success",
        });
        setLoading(false);

        navigate("/");
      }
      if (error) {
        const data = JSON.parse(error.message);
        if (data.status === 422) {
          setErrmessage(data.errors);
        } else {
          setErrmessage(data.errors);
          alert.dispatch({
            type: "OPEN",
            position: "PRODUK",
            content: "Gagal Mengupdate Produk",
            message: "error",
          });
          setLoading(false);

          navigate("/");
        }
      }
    },
    onError(error, _variables, _context) {
      setLoading(false);
      setErrmessage(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<MessageProps>();
  const handleImageRemove = () => {
    setValue("img", null as unknown as FileList);
  };
  const onSubmit = async (params: any) => {
    setLoading(true);
    await mutation.mutate(params);
  };
  useEffect(() => {
    if (data) {
      setValue("id", data.id);
    }
  }, [data, isSuccess]);
  return (
    <>
      <Temp>
        <main className="flex-1 overflow-y-auto">
          {isLoading && <LoadingSekeleton />}
          {isSuccess && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full mx-auto p-6 ">
                {/* Baris Pertama: Dua Input */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col">
                    <label className="mb-1 text-gray-700 font-medium">
                      Kategori
                    </label>
                    <Select
                      register={register}
                      errors={errors}
                      errMessage={errMessage}
                      id_kategori={data.id_kategori}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-gray-700 font-medium">
                      Nama Barang
                    </label>
                    <Input
                      register={register}
                      name="nama_produk"
                      placeholder="Nama Barang"
                      errors={errors}
                      errMessage={errMessage}
                      value={data.nama_produk}
                    />
                  </div>
                </div>

                {/* Baris Kedua: Tiga Input */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col">
                    <label className="mb-1 text-gray-700 font-medium">
                      Harga Beli
                    </label>
                    <Input
                      register={register}
                      name="harga_beli"
                      placeholder="Harga Beli"
                      errors={errors}
                      errMessage={errMessage}
                      value={data.harga_beli}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-1 text-gray-700 font-medium">
                      Stok Barang
                    </label>
                    <Input
                      register={register}
                      name="stok"
                      placeholder="Harga Stok"
                      errors={errors}
                      errMessage={errMessage}
                      value={data.stok}
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-gray-700 font-medium">
                    Upload Image
                  </label>
                  <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                    <input
                      type="file"
                      {...register("img", { required: false })}
                      accept="image/*"
                      className="hidden"
                      id="imageUpload"
                    />
                    <label
                      htmlFor="imageUpload"
                      className="cursor-pointer flex flex-col items-center justify-center"
                    >
                      {watch("img") || data.img ? (
                        <div className="">
                          <img
                            src={
                              watch("img") && watch("img").length > 0
                                ? URL.createObjectURL(watch("img")?.[0])
                                : PathResource.imgProduk(data.img)
                            }
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-md"
                          />
                          <p className="mt-2 text-sm text-gray-700">
                            {watch("img") && watch("img").length > 0
                              ? watch("img")?.[0].name
                              : data.img}
                          </p>

                          <button
                            onClick={handleImageRemove}
                            className=" absolute top-0 right-0 text-black rounded-full p-1 hover:cursor-pointer transition z-50"
                          >
                            &times;
                          </button>
                        </div>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12 text-gray-400 mb-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16V4m10 12V4m-5 16l-5-5m10 5l-5-5"
                            />
                          </svg>
                          <span className="text-gray-600">
                            Drag & drop atau klik untuk upload
                          </span>
                        </>
                      )}
                    </label>
                    {errors?.img && ( // dynamically access error for the specific field
                      <p className="mt-2 text-center text-pink-600 text-sm">
                        {errors?.img.message || "This field is required."}
                      </p>
                    )}

                    {errMessage?.img && ( // Check if there's a custom error message
                      <p className="mt-2 text-center text-pink-600 text-sm">
                        {errMessage?.img?.[0]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-5">
                  <button
                    type="button"
                    className="border hover:cursor-pointer border-blue-500 text-blue-500 px-6 py-2 rounded-md hover:bg-blue-100 transition"
                  >
                    Batalkan
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:cursor-pointer text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          )}
        </main>
        {isError && <h4>Error Go to Back</h4>}
      </Temp>
    </>
  );
}
