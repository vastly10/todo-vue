<template>
  <div>
    <div id="header" style="margin-top: 30px">
      <b-input-group size="lg">
        <b-input-group-prepend>
          <b-button variant="outline-info" @click="doneAll">
            <b-icon icon="check"/>
          </b-button>
        </b-input-group-prepend>
        <b-form-input placeholder="할 일을 등록하세요." v-model="newTodoTitle" @keyup.enter="addTodo" autofocus/>
      </b-input-group>
    </div>

    <div class="list-view">
      <b-list-group>
        <b-list-group-item class="d-flex align-items-center justify-content-center todo-item" v-for="todo in todos" :key="todo.id">
          <b-button class="border-0" variant="outline-secondary" @click="check(todo)">
            <b-icon :icon="handleByCompleted(todo, 'check', 'circle')"/>
          </b-button>
          <b-form-input v-if="todo.edit" v-model="editingTitle" @keyup.enter="doneEdit(todo)" @blur="doneEdit(todo)" @keyup.esc="cancelEdit(todo)"/>
          <p v-else class="flex-grow-1 todo-item-title"
             :style="handleByCompleted(todo, {textDecorationLine : 'line-through'})"
             @dblclick="editing(todo)">
            {{ todo.title }}
          </p>
          <b-button class="border-0 flex-shrink-1" variant="outline-warning" @click="removeTodo(todo.id)">
            <b-icon icon="x-circle"/>
          </b-button>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import {reqGetTodoList, reqCreateTodo, reqUpdateTodo, reqDeleteTodo} from "@/api/request";
import {copyTodo, Todo} from "@/model/todo";

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

function createTodoElementWithTodo(todo) {
  let todoElement = new TodoElement(todo.title);
  todoElement.id = todo.id;
  todoElement.completed = todo.completed;
  return todoElement;
}

function copyAndMod(todo, action) {
  const copiedTodo = copyTodo(todo);
  action(copiedTodo);
  return copiedTodo;
}

const reverseCompleted = todo => {
  todo.completed = !todo.completed;
  return todo
};

const copyAndReverseCompleted = todo => copyAndMod(todo, reverseCompleted);

export default {
  name: "Main",
  data() {
    return {
      todos: this.fetchData(),
      newTodoTitle: '',
      editingTitle: ''
    }
  },
  methods: {
    addTodo() {
      reqCreateTodo(new Todo(this.newTodoTitle))
        .then(response => this.todos.push(createTodoElementWithTodo(response.data)));
      this.newTodoTitle = '';
    },
    removeTodo(id) {
      reqDeleteTodo(id)
        .then(response => {
          if (response.statusText === 'OK') this.todos = this.todos.filter(todo => todo.id !== id);
        })
    },
    check(todo) {
      let copiedTodo = copyAndReverseCompleted(todo);
      reqUpdateTodo(copiedTodo)
        .then(response => {
          if (response.statusText === 'OK') todo.completed = copiedTodo.completed;
        });
    },
    doneAll() {
      const targetTodos = this.todos
          .filter(todo => todo.completed === false)
          .map(copyAndReverseCompleted);

      reqUpdateTodo(...targetTodos)
          .then(response => {
            if (response.statusText === 'OK') this.todos.forEach(todo => todo.completed = true)
          });
    },
    handleByCompleted(todo, complete, notYet) {
      return todo.completed ? complete : notYet;
    },
    editing(todo) {
      this.editingTitle = todo.title;
      todo.edit = true;
    },
    doneEdit(todo) {
      let updatedTodo = copyAndMod(todo, copy => copy.title = this.editingTitle);
      reqUpdateTodo(updatedTodo)
        .then(response => {
          if (response.statusText === 'OK') {
            todo.title = this.editingTitle;
            todo.edit = false;
          }
        });
    },
    cancelEdit(todo) {
      todo.edit = false;
      this.editingTitle = '';
    },
    fetchData() {
      reqGetTodoList().then(response => this.todos = response.data.map(createTodoElementWithTodo))
    }
  }
}
</script>

<style scoped>
.list-view {
  margin-top: 30px;
  text-align: left;
}
.todo-item {
  padding-left: 8px;
  padding-right: 8px;
}
.todo-item-title {
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: large;
  margin-top: 16px;
  margin-left: 15px;
}
</style>