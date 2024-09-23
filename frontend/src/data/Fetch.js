export const loadTrekkingRoutes = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/trekkingRoutes`
  );
  const data = await response.json();
  return data;
};

export const loadTrekkingRoute = async (params) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/trekkingRoutes/${params}`
  );
  const data = await response.json();
  return data;
};

export const login = async (loginFormValue) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(loginFormValue),
  });
  const data = await response.json();
  return data;
};

export const register = async (registerFormValue,avatar) => {
  const formData = new FormData();
  formData.append("avatar", avatar);
  formData.append("name", registerFormValue.name);
  formData.append("surname", registerFormValue.surname);
  formData.append("email", registerFormValue.email);
    formData.append("password", registerFormValue.password);

  const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
};

export const me = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error(response.status);
  }
  const data = await response.json();
  return data;
};

export const loadComments = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/trekkingRoutes/${id}/comments`
  );
  const data = await response.json();
  return data;
};

export const newComment = async (id, formValue) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/trekkingRoutes/${id}/comments`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formValue),
    }
  );
  const data = await response.json();
  return data;
};
