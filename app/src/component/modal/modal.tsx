import { useModal } from "../../context/UseModal";

const modal = ({
  loading = false,
  children,
}: {
  loading: boolean | undefined;
  children: any;
}) => {
  const modal = useModal();

  return (
    <div className="modal-container inset-0 overflow-y-auto z-[1000] fixed bg-gray-500/30">
      <div className="drop-shadow-3xl flex mt-8 max-h-max">
        <div className=" w-[80vw] md:max-w-xl mx-auto rounded-xl shadow-lg px-5 py-5 relative bg-white ">
          <div className="modal-header p-4">
            <div className="flex">
              <div className="absolute right-5 top-3">
                <button
                  className="text-black"
                  onClick={!loading ? modal.closeModal : undefined}
                >
                  x
                </button>
              </div>
            </div>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default modal;
