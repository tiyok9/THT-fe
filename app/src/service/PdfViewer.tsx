const RootPath = `${import.meta.env.VITE_API}/api`;

const Get = async (path: string) => {
  const URLs = `${RootPath}/${path}`;
  const tokens = localStorage.getItem("token");

  try {
    const response = await fetch(URLs, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tokens}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed Get Excel");
    }
    const blob = await response.blob();
    const file = new Blob([blob], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  } catch (error) {
    throw new Error("Failed Get Excel");
  }
};

const getExcel = (search: string, kategori: string) =>
  Get(`produk/printexcel/excel?search=${search}&kategori=${kategori}`);

const PdfViewer = {
  getExcel,
};

export default PdfViewer;
