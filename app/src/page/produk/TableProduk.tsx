import { Fragment, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";

import TableServer from "../../component/table/TableServer";
import ErorSekeleton from "../../component/skeleton/ErorSekeleton";
import LoadingSekeleton from "../../component/skeleton/LoadingSekeleton";
import ApiProduk from "../../service/ApiProduk";
import PathResource from "../../service/PathResource";
import { Link, NavLink } from "react-router";
import SearchInput from "../../component/table/SearchInput";
import SelectKategori from "./SelectKategori";
import { useModal } from "../../context/UseModal";
import PrintExcel from "../../component/button/PrintExcel";

const tableReact = (deleteModal: (params: string) => void) => {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("", {
      header: "No",
      cell: (info) => info.row.index + 1,
    }),
    columnHelper.accessor("nama_produk", {
      header: "Nama Produk",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("img", {
      header: "Image",
      cell: (info) => {
        return (
          <img
            src={PathResource.imgProduk(info.getValue())}
            className="h-8 w-8"
            alt="image produk"
          />
        );
      },
    }),
    columnHelper.accessor("nama_kategori", {
      header: "Kategori",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("harga_jual", {
      header: "Harga Jual",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("harga_beli", {
      header: "Harga Beli",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("stok", {
      header: "Stok",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("", {
      header: "Action",
      cell: ({ row }: { row: { original: any } }) => {
        return (
          <div className="icon-table">
            <Link
              to="/produk/editproduk"
              state={row.original.id}
              className="hover:scale-75"
            >
              <img src="../../../public/edit.png" />
            </Link>

            <a
              onClick={() => deleteModal(row.original.id)}
              className="hover:scale-75 font-semibold rounded hover:cursor-pointer"
            >
              <img src="../../../public/delete.png" />
            </a>
          </div>
        );
      },
    }),
  ];
  return columns;
};

const getData = async (
  page: number,
  sorting: any,
  search: string,
  kategori: string
) => {
  let col = "";
  let sort = "";
  if (sorting) {
    col = sorting.id;
    sort = sorting.desc ? "desc" : "asc";
  }
  return await ApiProduk.getProduk({
    page,
    col,
    sort,
    search,
    kategori,
  });
};
const TableProduct = () => {
  const { deleteModal } = useModal();

  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState<any>();
  const [search, setSearch] = useState<any>("");
  const [kategori, setKategori] = useState<any>("");

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["product", page, sorting, search, kategori],
    queryFn: () => getData(page, sorting, search, kategori),
  });
  return (
    <Fragment>
      <div className={`grid mb-2 grid-cols-1 md:grid-cols-2 w-full `}>
        <div className="col-span-1 flex flex-col md:flex-row gap-2">
          <SearchInput
            setSearch={setSearch}
            setPage={setPage}
            search={search}
          />
          <SelectKategori setKategori={setKategori} />
        </div>

        <div className="col-span-1 flex mt-3 md:mt-0 md:justify-end">
          <PrintExcel search={search} kategori={search} />
          <NavLink
            to={"/produk/addproduk"}
            type="button"
            className="inset-y-0 right-0 flex items-center pr-3 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Tambah Produk
          </NavLink>
        </div>
      </div>
      {isLoading && <LoadingSekeleton />}
      {isError && <ErorSekeleton />}
      {isSuccess && (
        <TableServer
          data={data}
          tables={tableReact(deleteModal)}
          setPage={setPage}
          setSorting={setSorting}
          setSearch={setSearch}
          search={search}
        />
      )}
    </Fragment>
  );
};

export default TableProduct;
