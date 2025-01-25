import { createContext, useContext, ReactNode, useReducer } from "react";

interface MyContextType {
  state: any;
  dispatch: any;
  closeModal: () => void;
  deleteModal: (params: string) => void;
  logout: () => void;
  profileModal: () => void;
}
interface MyContextProviderProps {
  children: ReactNode;
}
type Alert = {
  value: string;
  isOpen: boolean;
  type: string;
  position: string;
};
type typeAlert = {
  CLOSE_MODAL: string;
  OPEN: string;
};
export const alertContext = createContext<MyContextType | undefined>(undefined);

const initialModal: Alert = {
  isOpen: false,
  value: "",
  position: "",
  type: "",
};
const alertType: typeAlert = {
  OPEN: "OPEN",
  CLOSE_MODAL: "CLOSE_MODAL",
};
const alertReducer = (state: any, action: any) => {
  switch (action.type) {
    case alertType.OPEN:
      return {
        ...state,
        isOpen: true,
        value: action.value,
        type: action.type,
        position: action.position,
      };

    case alertType.CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
        value: "",
        position: "",
        type: "",
      };
    default:
      break;
  }
};
export function useModal() {
  const context = useContext(alertContext);
  if (!context) {
    throw new Error("useModal must be used within a modalprovider");
  }
  return context;
}

export const Modal = ({ children }: MyContextProviderProps) => {
  const [state, dispatch] = useReducer(alertReducer, initialModal);
  const closeModal = () => {
    dispatch({ type: alertType.CLOSE_MODAL });
  };
  const deleteModal = (id: string) => {
    dispatch({
      isOpen: true,
      value: id,
      type: "OPEN",
      position: "PRODUK",
    });
  };

  const profileModal = () => {
    dispatch({
      isOpen: true,
      value: "",
      type: "OPEN",
      position: "PROFILE",
    });
  };

  const logout = () => {
    dispatch({
      isOpen: true,
      value: "",
      type: "OPEN",
      position: "LOGOUT",
    });
  };
  return (
    <alertContext.Provider
      value={{ state, dispatch, closeModal, deleteModal, profileModal, logout }}
    >
      {children}
    </alertContext.Provider>
  );
};

export default Alert;
