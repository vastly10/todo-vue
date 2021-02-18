class Todo {
    constructor(title) {
        this.id = 0;
        this.title = title;
        this.completed = false;
    }
}

const copyTodo = ({id, title, completed}) => {
    let copyTodo = new Todo(title);
    copyTodo.id = id;
    copyTodo.completed = completed;
    return copyTodo
}

export {Todo, copyTodo};