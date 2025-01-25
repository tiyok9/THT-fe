import { UseFormRegister } from "react-hook-form";

interface InputProps {
  register: UseFormRegister<any>;
  name: string;
  placeholder: string;
  value?: string;
  errors?: any;
  errMessage?: any;
}

const Input = ({
  register,
  name,
  placeholder,
  value = "",
  errors,
  errMessage,
}: InputProps) => {
  return (
    <>
      <input
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        {...register(name, { required: true })}
        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 w-full"
      />
      {errors?.[name] && ( // dynamically access error for the specific field
        <p className="mt-2 text-start text-pink-600 text-sm">
          {errors[name]?.message || "This field is required."}
        </p>
      )}

      {errMessage?.[name]?.[0] && ( // Check if there's a custom error message
        <p className="mt-2 text-start text-pink-600 text-sm">
          {errMessage[name]?.[0]}
        </p>
      )}
    </>
  );
};

export default Input;
