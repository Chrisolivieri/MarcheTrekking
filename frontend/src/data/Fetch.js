export const loadTrekkingRoutes = async (page) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/trekkingRoutes/?page=${page}&perPage=5`
  );
  const data = await response.json();
  console.log(data);
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

    return {
      status: response.status,
      data: data,
    };
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
    if (response.status === 401) {
      alert("errore");
    }
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
    console.log(response);
    const data = await response.json();
    if (response.status === 400) {
      alert("Errore: utente già registrato con questa email.");
      return;
    }
    alert("registrato");
    console.log(data);
    return data;
  } catch (error) {
    alert(error);
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

export const editComment = async (trekkingId, commentId, editCommentData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/trekkingRoutes/${trekkingId}/comments/${commentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editCommentData),
      }
    );
    console.log(response);
    if (!response.ok) {
      throw new Error("Errore durante la modifica del commento");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Errore durante la modifica del commento");
  }
};

export const deleteComment = async (trekkingId, commentId) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/trekkingRoutes/${trekkingId}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Errore durante la cancellazione del commento");
  }
  return response.json();
};

export const addFavorite = async (userId, trekkingRouteId) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        userId,
        trekkingRouteId,
      }),
    });

    if (response.ok) {
      console.log("preferito inserito");
      const data = await response.json();
      return data;
    }
  } catch (error) {
    if (error.status === 400) {
      alert("preferito già inserito");
    }
  }
};

export const getAllFavorites = async (userId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/favorites/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFavorite = async (userId, trekkingRouteId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/favorites/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          trekkingRouteId,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserAvatar = async (image, id) => {
  const formData = new FormData();
  formData.append("avatar", image);

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/users/${id}/avatar`,

      {
        method: "PATCH",
        body: formData,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
