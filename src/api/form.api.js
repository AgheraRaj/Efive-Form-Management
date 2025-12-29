import api from "./axios";

export const getForm = () => {
    return api.get("/form/getAll");
}; //yes

export const postForm = (payload) => {
    return api.post("/form/add", payload);
} // yes

export const getQuestion = () => {
    return api.get("/question/getQuestionsForAddForm");
}

export const getQuestionsByFormId = (formId) => {
  return api.get(`/question/getQuestionsByFormId/${formId}`);
};

export const postQuestion = (payload) => {
    return api.post("/question/add", payload)
}

export const postQuestionToForm = (formId, payload) => {
    return api.post(`/question/addAtExistingForm/${formId}`, payload)
}

export const getCompletedForm = () => {
    return api.get("/filled-form/completed-forms")
} //yes

export const getOption = () => {
    return api.get("/filled-form/get-form-title")
} //yes

export const getFormById = (id) => {
    return api.get(`/form/get/${id}`)
} //yes

export const postFilledForm = (payload) => {
    return api.post("/filled-form/save-filled-form", payload)
} //yes

export const updateForm = (formId, payload) => {
    return api.put(`/form/update/${formId}`, payload);
}; //yes

export const deleteForm = (formId) => {
  return api.delete(`/form/delete/${formId}`);
}; //yes

export const deleteQuestion = (id) => {
  return api.delete(`/question/deleteQuestion/${id}`);
}; 

export const updateQuestion = (id, payload) => {
  return api.put(`/question/editQuestion/${id}`, payload);
};
