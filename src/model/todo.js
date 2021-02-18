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

class TodoElement{
    constructor(title) {
        this.todo = new Todo(title);
        this.edit = false;
    }
    get id() {
        return this.todo.id;
    }
    set id(id) {
        this.todo.id = id;
    }
    get title() {
        return this.todo.title;
    }
    set title(title) {
        this.todo.title = title;
    }
    get completed() {
        return this.todo.completed;
    }
    set completed(completed) {
        this.todo.completed = completed;
    }
}

export {Todo, copyTodo};