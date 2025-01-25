import InputSekeleton from "../../component/skeleton/InputSekeleton";
import { useQuery } from "@tanstack/react-query";
import ApiKategori from "../../service/ApiKategori";
import { useEffect, useState } from "react";
import UseDebonce from "../../component/hook/UseDebounce";
const dataKategori = async () => {
  return await ApiKategori.getKategori();
};
const SelectKategori = ({
  setKategori,
}: {
  setKategori: (params: string) => void;
}) => {
  const { data, isSuccess, isLoading } = useQuery<any>({
    queryKey: ["kategori"],
    queryFn: dataKategori,
  });
  const [selectedValue, setSelectedValue] = useState("");
  const debounce = UseDebonce(selectedValue, 500);
  useEffect(() => {
    setKategori(debounce);
  }, [debounce]);
  return (
    <>
      {isLoading && <InputSekeleton />}
      {isSuccess && (
        <div className="relative w-full md:self-center">
          {/* Ikon hanya tampil di luar dropdown, bukan di dalam daftar select */}
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M3 2.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5V4h1a.5.5 0 0 1 0 1h-1v1.5h1a.5.5 0 0 1 0 1h-1V9h1a.5.5 0 0 1 0 1h-1v1.5h1a.5.5 0 0 1 0 1h-1V14a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1h-1a.5.5 0 0 1 0-1h1V10h-1a.5.5 0 0 1 0-1h1V7.5h-1a.5.5 0 0 1 0-1h1V5h-1a.5.5 0 0 1 0-1h1V2.5zM4 3v10h8V3H4z" />
          </svg>

          {/* Dropdown Select */}
          <select
            className={`w-full text-gray-700 block border-2 rounded-md py-2 pl-10 pr-4  "border-gray-300"
            `}
            onChange={(e) => setSelectedValue(e.target.value)}
            value={selectedValue}
          >
            <option value={""}>Pilih Kategori</option>
            {data.data.map((item: { id: string; nama_kategori: string }) => (
              <option key={item.id} value={item.nama_kategori}>
                {item.nama_kategori}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

export default SelectKategori;
