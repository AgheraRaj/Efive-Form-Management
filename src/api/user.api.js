import api from "./axios";

export const getUser = () => {
    return api.get("/user/getAllUsers");
} // yes

export const getFilterUsers = (params = {}) => {
    return api.get("/user/getUserByUsernameAndRole", {
    params: {
      username: params.name || undefined,
      role: params.role || undefined,
    },
  })
} //yes

export const getProfile = () => {
    return api.get("/user/getProfile")
} //yes

export const changePasswordApi = (payload) => {
    return api.put("/user/changePassword", payload)
}

export const createUser = (payload) => {
    return api.post("/user/addUserWithImage", payload, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
} //yes

export const updateUser = (id, formData) => {
  return api.put(`/user/editUser/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}; //yes

export const deleteUser = (userId) => {
  return api.delete(`/user/deleteUser/${userId}`);
}; //yes

export const updateProfileImage = (formData) => {
    return api.post("/user/editProfilePicture", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}; //yes
