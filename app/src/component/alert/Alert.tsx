import { Fragment, useEffect } from "react";
import { useAlert } from "../../context/UseAlert";

const Alert = () => {
  const alert = useAlert();
  useEffect(() => {
    if (alert.state?.isOpen && alert.state?.position) {
      const timeoutId = setTimeout(() => {
        alert.closeAlert();
      }, 4000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [alert.state?.isOpen, alert.state?.position]);
  return (
    <Fragment>
      <div
        className={`mb-4 rounded-lg relative ${
          alert.state?.message == "success" ? "bg-green-600" : "bg-red-500"
        } px-6 py-5 text-base text-sky-100 xs:text-[14px] xs:px-3`}
        role="alert"
      >
        {alert.state?.content}
        <a onClick={() => alert.closeAlert()} className="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-3 top-[35%] icon icon-tabler icon-tabler-x w-[22px] h-[22px] xs:w-[18px] xs:h-[18px]"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M18 6l-12 12"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </a>
      </div>
    </Fragment>
  );
};

export default Alert;
