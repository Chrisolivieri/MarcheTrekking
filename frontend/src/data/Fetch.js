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

export const newTrekkingRoute = async (formValue, images) => {
  const formData = new FormData();
  formData.append("name", formValue.name);
  formData.append("description", formValue.description);
  formData.append("distance", formValue.distance);
  formData.append("duration", formValue.duration);
  formData.append("heightDifference", formValue.heightDifference);
  formData.append("difficulty", formValue.difficulty);
  formData.append("start", JSON.stringify(formValue.start));
  formData.append("end", JSON.stringify(formValue.end));
  formData.append("coordinates", JSON.stringify(formValue.coordinates));

  images.forEach((image) => {
    formData.append("images", image);
  });

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/trekkingRoutes`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    if (response.status === 400) {
      return console.log("percorso non inserito");
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (loginFormValue) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(loginFormValue),
    });
    const data = await response.json();
    alert("loggato");
    return data;
  } catch (error) {
    if (error.status === 401) {
      alert("errore");
    }
  }
};

export const register = async (registerFormValue, avatar) => {
  const formData = new FormData();
  formData.append("avatar", avatar);
  formData.append("name", registerFormValue.name);
  formData.append("surname", registerFormValue.surname);
  formData.append("email", registerFormValue.email);
  formData.append("password", registerFormValue.password);
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (response.status === 400) {
      alert("Errore: utente già registrato con questa email.");
      return;
    }
    alert("registrato");
    return data;
  } catch (error) {
    alert("errore");
  }
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
