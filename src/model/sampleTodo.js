import {Todo} from "@/model/todo";

function *keyGen() {
    let key = 0;
    for (;;) yield key++;
}
const keyGenerator = keyGen();
//
const makeSampleData = () => {
    let sampleData = [];
    for (let i = 0; i < 5; i ++) {
        let sampleTodo = new Todo();
        sampleTodo.id = keyGenerator.next().value;
        sampleData.push(sampleTodo);
    }
    return sampleData;
};

export {makeSampleData}