import axios from "@/api/axios";

export const getAllMember = () => axios("dbTest");
export const reqGetTodoList = () => axios("todo/all");
export const reqDeleteTodo = (data) => axios.post("/todo/delete", data);
// export const reqSaveTodo = (data) => axios.post("/todo/save", data);
export const reqSaveTodo = (...data) => {
    if (data.length === 0) throw new Error("empty parameter");
    if (data.length === 1) return axios.post("/todo/save", data[0]);
    return axios.post("/todo/save-all", data);
};
