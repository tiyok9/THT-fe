import { createContext, useContext, ReactNode, useReducer } from "react";

interface MyContextType {
  state: any;
  dispatch: any;
  closeAlert: () => void;
}
interface MyContextProviderProps {
  children: ReactNode;
}
type Alert = {
  content: string;
  isOpen: boolean;
  type: string;
  position: string;
  message: string;
};
type typeAlert = {
  CLOSE_ALERT: string;
  OPEN: string;
};
export const alertContext = createContext<MyContextType | undefined>(undefined);

const initialModal: Alert = {
  isOpen: false,
  content: "",
  message: "",
  position: "",
  type: "",
};
const alertType: typeAlert = {
  OPEN: "OPEN",
  CLOSE_ALERT: "CLOSE_ALERT",
};
const alertReducer = (state: any, action: any) => {
  switch (action.type) {
    case alertType.OPEN:
      return {
        ...state,
        isOpen: true,
        content: action.content,
        type: action.type,
        position: action.position,
        message: action.message,
      };

    case alertType.CLOSE_ALERT:
      return {
        ...state,
        isOpen: false,
        content: "",
        message: "",
        position: "",
        type: "",
      };
    default:
      break;
  }
};
export function useAlert() {
  const context = useContext(alertContext);
  if (!context) {
    throw new Error("useAlert must be used within a alertProvider");
  }
  return context;
}

export const Alert = ({ children }: MyContextProviderProps) => {
  const [state, dispatch] = useReducer(alertReducer, initialModal);
  const closeAlert = () => {
    dispatch({ type: alertType.CLOSE_ALERT });
  };
  return (
    <alertContext.Provider value={{ state, dispatch, closeAlert }}>
      {children}
    </alertContext.Provider>
  );
};

export default Alert;
