import Path from "./Path";

const getProfile = () => Path.Get(`profile`);
const updateProfile = (formData: any, id: string) =>
  Path.Post(formData, `profile/update/${id}`);
const ApiProfile = {
  getProfile,
  updateProfile,
};
export default ApiProfile;
