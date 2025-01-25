const Navbar = ({
  setSidebarOpen,
  isSidebarOpen,
}: {
  setSidebarOpen: (isSidebarOpen: boolean) => void;
  isSidebarOpen: boolean;
}) => {
  return (
    <header className="p-4 flex items-center gap-2">
      <button
        className="md:hidden text-blue-900"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        &#9776;
      </button>
      <h2 className="text-xl font-semibold">Daftar Produk</h2>
    </header>
  );
};

export default Navbar;
