const RootPath = `${import.meta.env.VITE_API}/api`;

const Get = (path: string) => {
  const tokens = localStorage.getItem("token");
  const promise = new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${RootPath}/${path}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${tokens}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
          JSON.stringify({
            errors: errorData.errors,
            status: response.status,
          })
        );
      }
      const data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
  return promise;
};

const GetNoTerm = (path: string) => {
  const tokens = localStorage.getItem("token");

  const promise = new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${RootPath}/${path}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${tokens}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
          JSON.stringify({
            errors: errorData.errors,
            status: response.status,
          })
        );
      }
      const data = await response.json();
      resolve(data.data);
    } catch (error) {
      reject(error);
    }
  });
  return promise;
};

const Post = (formData: any, path: string) => {
  const tokens = localStorage.getItem("token");

  const promise = new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${RootPath}/${path}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${tokens}`,
        },
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          JSON.stringify({
            errors: errorData.errors,
            status: response.status,
          })
        );
      }
      const data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
  return promise;
};
const PostNoForm = (path: string) => {
  const tokens = localStorage.getItem("token");

  const promise = new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${RootPath}/${path}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${tokens}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          JSON.stringify({
            errors: errorData.errors,
            status: response.status,
          })
        );
      }
      const data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
  return promise;
};

const Delete = (path: string) => {
  const tokens = localStorage.getItem("token");

  const promise = new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${RootPath}/${path}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${tokens}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          JSON.stringify({
            errors: errorData.errors,
            status: response.status,
          })
        );
      }
      const data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
  return promise;
};

const Path = {
  Get,
  GetNoTerm,
  Post,
  PostNoForm,
  Delete,
};
export default Path;
