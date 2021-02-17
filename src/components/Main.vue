<template>
  <div>
    <div id="header" style="margin-top: 30px">
      <b-input-group size="lg">
        <b-input-group-prepend>
          <b-button variant="outline-info" @click="doneAll">
            <b-icon icon="check"/>
          </b-button>
        </b-input-group-prepend>
        <b-form-input placeholder="할 일을 등록하세요." v-model="newTodoTitle" @keyup.enter="addTodo"/>
      </b-input-group>
    </div>

    <div class="list-view">
      <b-list-group>
        <b-list-group-item class="d-flex align-items-center justify-content-center todo-item" v-for="todo in todos" :key="todo.id">
          <b-button class="border-0" variant="outline-secondary" @click="check(todo)">
            <b-icon :icon="handleByCompleted(todo, 'check', 'circle')"/>
          </b-button>
          <p class="flex-grow-1 todo-item-title" :style="handleByCompleted(todo, {textDecorationLine : 'line-through'})">
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
import {reqGetTodoList, reqSaveTodo, reqDeleteTodo} from "@/api/request";
import {Todo, copyTodo} from "@/model/todo";

export default {
  name: "Main",
  data() {
    return {
      todos: this.fetchData(),
      newTodoTitle: ''
    }
  },
  methods: {
    addTodo() {
      reqSaveTodo(new Todo(this.newTodoTitle))
        .then(response => this.todos.push(response.data));
      this.newTodoTitle = '';
    },
    removeTodo(id) {
      reqDeleteTodo(id)
        .then(response => {
          if (response.statusText === "OK") this.todos = this.todos.filter(todo => todo.id !== id);
        })
    },
    check(todo) {
      // 다른 함수로 뺄 수 있겠어
      let copiedTodo = copyTodo(todo);
      copiedTodo.completed = !copiedTodo.completed;
      reqSaveTodo(copiedTodo)
        .then(response => todo.completed = response.data.completed);
    },
    doneAll() {
      const targetTodos = this.todos
          .filter(todo => todo.completed === false)
          .map(todo => {
            //위랑 완전 중복
            const copiedTodo = copyTodo(todo);
            copiedTodo.completed = true;
            return copiedTodo;
          });
      reqSaveTodo(...targetTodos)
          .then(response => {
            if (response.statusText === 'OK')
            this.todos.forEach(todo => todo.completed = true)
          });
    },
    handleByCompleted(todo, complete, notYet) {
      return todo.completed ? complete : notYet;
    },
    fetchData() {
      reqGetTodoList()
        .then(response => this.todos = response.data)
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