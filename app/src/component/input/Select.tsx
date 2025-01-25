import { useQuery } from "@tanstack/react-query";
import InputSekeleton from "../skeleton/InputSekeleton";
import ApiKategori from "../../service/ApiKategori";

const dataKategori = async () => {
  return await ApiKategori.getKategori();
};
const Select = ({ register, errors, errMessage, id_kategori = "" }: any) => {
  const { data, isSuccess, isLoading } = useQuery<any>({
    queryKey: ["kategori"],
    queryFn: dataKategori,
  });
  return (
    <>
      {isLoading && <InputSekeleton />}
      {isSuccess && (
        <select
          {...register("id_kategori", { required: true })}
          className=" w-full text-gray-700 block border-gray-300 border-1 rounded-md py-2 pl-4"
        >
          <option value={""}>Pilih Kategori</option>
          {data.data.map((item: { id: string; nama_kategori: string }) => (
            <option
              key={item.id}
              value={item.id}
              selected={id_kategori == item.id}
            >
              {item.nama_kategori}
            </option>
          ))}
        </select>
      )}
      {errors?.id_kategori && ( // dynamically access error for the specific field
        <p className="mt-2 text-start text-pink-600 text-sm">
          {errors?.id_kategori.message || "This field is required."}
        </p>
      )}

      {errMessage?.id_kategori && ( // Check if there's a custom error message
        <p className="mt-2 text-start text-pink-600 text-sm">
          {errMessage?.id_kategori?.[0]}
        </p>
      )}
    </>
  );
};

export default Select;
