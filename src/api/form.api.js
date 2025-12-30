import api from "./axios";

export const getForm = () => {
    return api.get("/form/getAll");
};

export const postForm = (payload) => {
    return api.post("/form/add", payload);
}

export const getCompletedForm = () => {
    return api.get("/filled-form/completed-forms")
}

export const getOption = () => {
    return api.get("/filled-form/get-form-title")
} 

export const getFormById = (id) => {
    return api.get(`/form/get/${id}`)
} 

export const postFilledForm = (payload) => {
    return api.post("/filled-form/save-filled-form", payload)
}

export const updateForm = (formId, payload) => {
    return api.put(`/form/update/${formId}`, payload);
}; 

export const deleteForm = (formId) => {
  return api.delete(`/form/delete/${formId}`);
}; 
