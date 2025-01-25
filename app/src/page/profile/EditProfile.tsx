import { useState } from "react";
import Modal from "../../component/modal/modal";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Input from "../../component/input/Input";
import { useModal } from "../../context/UseModal";
import { useAlert } from "../../context/UseAlert";
import ApiProfile from "../../service/ApiProfile";
import PathResource from "../../service/PathResource";
import { useAuth } from "../../context/Auth";
import ButtonAnimation from "../../component/button/ButtonAnimation";

type Params = {
  posisi: string;
  img: FileList;
  name: string;
  id: string;
};

const submitMessage = async (params: Params) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("posisi", params.posisi);
  formData.append("name", params.name);
  if (params.img[0]) {
    formData.append("img", params.img[0]);
  }
  return await ApiProfile.updateProfile(formData, params.id);
};

const FileUpload = ({
  register,
  watch,
  data,
  handleImageRemove,
  errors,
  errMessage,
}: any) => (
  <div className="flex flex-col">
    <label className="mb-1 text-gray-700 font-medium">Upload Image</label>
    <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
      <input
        type="file"
        {...register("img", { required: false })}
        accept="image/*"
        className="hidden"
        id="imageUpload"
      />
      <label
        htmlFor="imageUpload"
        className="cursor-pointer flex flex-col items-center justify-center"
      >
        {watch("img") || data ? (
          <div className="">
            <img
              src={
                watch("img") && watch("img").length > 0
                  ? URL.createObjectURL(watch("img")?.[0])
                  : PathResource.imgProfile(data)
              }
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md"
            />
            <p className="mt-2 text-sm text-gray-700">
              {watch("img") && watch("img").length > 0
                ? watch("img")?.[0].name
                : data}
            </p>
            <button
              onClick={handleImageRemove}
              className="absolute top-0 right-0 text-black rounded-full p-1 hover:cursor-pointer transition z-50"
            >
              &times;
            </button>
          </div>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-gray-400 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m10 12V4m-5 16l-5-5m10 5l-5-5"
              />
            </svg>
            <span className="text-gray-600">
              Drag & drop atau klik untuk upload
            </span>
          </>
        )}
      </label>
      {errors?.img && (
        <p className="mt-2 text-center text-pink-600 text-sm">
          {errors?.img?.message}
        </p>
      )}
      {errMessage?.img && (
        <p className="mt-2 text-center text-pink-600 text-sm">
          {errMessage?.img?.[0]}
        </p>
      )}
    </div>
  </div>
);

const InputGroup = ({
  label,
  name,
  register,
  placeholder,
  errors,
  errMessage,
  data,
}: any) => (
  <div className="flex flex-col">
    <label className="mb-1 text-gray-700 font-medium">{label}</label>
    <Input
      register={register}
      name={name}
      placeholder={placeholder}
      errors={errors}
      errMessage={errMessage}
      value={data}
    />
  </div>
);

const EditProfile = () => {
  const modal = useModal();
  const alert = useAlert();
  const { user, setUser } = useAuth();
  const [errMessage, setErrmessage] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitMessage,
    onSettled: async (data: any, error: any) => {
      if (data) {
        await queryClient.invalidateQueries({ queryKey: ["profile"] });
        setErrmessage("");
        alert.dispatch({
          type: "OPEN",
          position: "PROFILE",
          content: "Berhasil Update Profile",
          message: "success",
        });
        setUser(data);
        modal.closeModal();
        setLoading(false);
      }
      if (error) {
        if (data.status === 422) {
          setErrmessage(data.errors);
          setLoading(false);
        } else {
          setErrmessage(data.errors);
          alert.dispatch({
            type: "OPEN",
            position: "PROFILE",
            content: "Gagal Update Profile",
            message: "error",
          });
          modal.closeModal();

          setLoading(false);
        }
      }
    },
    onError(error, _variables, _context) {
      alert.dispatch({
        type: "OPEN",
        position: "PROFILE",
        content: "Gagal Update Profile",
        message: "error",
      });
      modal.closeModal();
      setLoading(false);
      setErrmessage(error);
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Params>({
    defaultValues: {
      id: user.id,
    },
  });
  const handleImageRemove = () => {
    setValue("img", null as unknown as FileList);
  };

  const onSubmit = async (params: Params) => {
    setLoading(true);
    await mutation.mutate(params);
  };

  return (
    <Modal loading={loading}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <InputGroup
            label="Nama"
            name="name"
            register={register}
            placeholder="Nama Anda"
            errors={errors}
            errMessage={errMessage}
            data={user.name}
          />
          <InputGroup
            label="Posisi"
            name="posisi"
            register={register}
            placeholder="Posisi Anda"
            errors={errors}
            errMessage={errMessage}
            data={user.posisi}
          />
        </div>

        <FileUpload
          register={register}
          handleImageRemove={handleImageRemove}
          errors={errors}
          errMessage={errMessage}
          data={user.img}
          watch={watch}
        />

        <div className="flex justify-end space-x-4 mt-5">
          <button
            type="button"
            onClick={!loading ? modal.closeModal : undefined}
            className="border hover:cursor-pointer border-blue-500 text-blue-500 px-6 py-2 rounded-md hover:bg-blue-100 transition"
          >
            Batalkan
          </button>
          <ButtonAnimation loading={loading} text={"Update"} />
        </div>
      </form>
    </Modal>
  );
};

export default EditProfile;
