function *keyGen() {
    let key = 0;
    for (;;) yield key++;
}
const keyGenerator = keyGen();
const generateKey = (gen) => gen.next().value;

class Todo {
    constructor(title) {
        this.id = generateKey(keyGenerator);
        this.title = title || "Todo List" + this.id;
        this.completed = false;
    }
}

const makeSampleData = () => {
    let sampleData = [];
    for (let i = 0; i < 5; i ++) {
        sampleData.push(new Todo());
    }
    return sampleData;
};

const copyTodo = ({id, title, completed}) => {
    let copyTodo = new Todo(title);
    copyTodo.id = id;
    copyTodo.completed = completed;
    return copyTodo
}
export {Todo, copyTodo, makeSampleData};