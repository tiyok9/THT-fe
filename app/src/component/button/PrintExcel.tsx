import PdfViewer from "../../service/PdfViewer";
const excel = async (search: string, kategori: string) => {
  return await PdfViewer.getExcel(search, kategori);
};
const PrintExcel = ({
  search,
  kategori,
}: {
  search: string;
  kategori: string;
}) => {
  return (
    <button
      onClick={() => excel(search, kategori)}
      className="font-semibold rounded bg-green-500 text-white px-4 py-2 flex items-center hover:bg-green-600 mr-6"
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
        <path d="M6 9V2h12v7"></path>
        <path d="M19 9v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9"></path>
        <path d="M8 17h8"></path>
      </svg>
      Export Excel
    </button>
  );
};

export default PrintExcel;
