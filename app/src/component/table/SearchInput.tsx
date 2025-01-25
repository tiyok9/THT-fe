import { useCallback, useEffect, useState } from "react";
import UseDebonce from "../hook/UseDebounce";

const SearchInput = ({ setSearch, setPage, search }: any) => {
  const [value, setValue] = useState<any>(search);

  const debounce = UseDebonce(value, 500);
  useEffect(() => {
    setPage(1);
    setSearch(debounce);
  }, [debounce]);

  const addTodo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return (
    <div className="relative w-full  md:self-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input
        className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-400"
        placeholder="Cari barang..."
        value={value}
        onChange={addTodo}
      />
    </div>
  );
};

export default SearchInput;
