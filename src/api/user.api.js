import api from "./axios";

export const getUser = (criteria = {}) => {
  return api.get("/user/getUserByUsernameAndRole", {
    params: {
      username: criteria.name || undefined,
      role: criteria.role || undefined,
    },
  });
}; 

export const getProfile = () => {
    return api.get("/user/getProfile")
} 

export const changePasswordApi = (payload) => {
    return api.put("/user/changePassword", payload)
} 

export const createUser = (payload) => {
    return api.post("/user/addUserWithImage", payload, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
} 

export const updateUser = (id, formData) => {
  return api.put(`/user/editUser/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}; 

export const deleteUser = (userId) => {
  return api.delete(`/user/deleteUser/${userId}`);
};

export const updateProfileImage = (formData) => {
    return api.post("/user/editProfilePicture", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
