import Path from "./Path";

const getProduk = ({
  page,
  col,
  sort,
  search,
  kategori,
}: {
  page: number;
  col: string;
  sort: string;
  search: string;
  kategori: string;
}) =>
  Path.Get(
    `produk?page=${page}&sort=${col}&desc=${sort}&search=${search}&kategori=${kategori}`
  );
const addProduct = (formData: any) => Path.Post(formData, "produk/store");
const updateProduk = (formData: any, id: string) =>
  Path.Post(formData, `produk/update/${id}`);
const getProdukShow = (id: string) => Path.GetNoTerm(`produk/${id}`);
const deleteProduk = (formData: any, id: string) =>
  Path.Post(formData, `produk/${id}`);
const ApiProduk = {
  getProduk,
  addProduct,
  getProdukShow,
  updateProduk,
  deleteProduk,
};
export default ApiProduk;
