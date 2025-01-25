const URL = `${import.meta.env.VITE_API}`;

const Get = (path: string) => {
  const RootPath = `${URL}/storage/${path}`;

  return RootPath;
};
const imgProduk = (props: string) => Get(`/produk/${props}`);
const imgProfile = (props: string) => Get(`/profile/${props}`);

const PathResource = {
  imgProduk,
  imgProfile,
};
export default PathResource;
