import axios from "@/api/axios";

export const reqGetTodoList = () => axios("todo/all");

export const reqDeleteTodo = (data) => axios.post("/todo/delete", data);

export const reqCreateTodo = data => {
    return axios.post("/todo/save", data);
}

export const reqUpdateTodo = (...data) => {
    if (data.length === 1) return axios.post("/todo/update", data[0]);
    return axios.post("/todo/update-all", data);
}