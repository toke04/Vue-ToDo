const app = Vue.createApp({
  data() {
    return {
      newTodo: "",
      todos: JSON.parse(localStorage.getItem("vue-todos") || "[]"),
      editedTodo: "",
    };
  },
  computed: {
    writingMessage() {
      if (this.newTodo !== "") {
        return `おー、「${this.newTodo}」というタスクを登録するんだね😊ええで〜`;
      }
      return "さあ、👆タスクを登録するんだ！カモン！😊";
    },
    currentTodos() {
      return this.todos;
    },
  },
  methods: {
    createTodo() {
      if (this.newTodo === "") return;
      const todo = {
        id: this.getMaxId(),
        title: this.newTodo,
        isDone: false,
      };
      this.todos.push(todo);
      this.newTodo = "";
      this.saveTodos();
    },
    getMaxId() {
      if (this.todos.length === 0) {
        return 0;
      } else {
        return Math.max(...this.todos.map((todo) => todo.id)) + 1;
      }
    },
    saveTodos() {
      localStorage.setItem("vue-todos", JSON.stringify(this.todos));
    },
    editTodo(todo) {
      this.editedTodo = { ...todo };
    },
    cancelEdit(todo, index) {
      this.editedTodo = "";
    },
    updateTodo(todo, index) {
      if (this.editedTodo.title === "") {
        this.deleteTodo(index);
      } else {
        const selectedTodo = this.todos.find(
          (todo) => todo.id === this.editedTodo.id
        );
        selectedTodo.title = this.editedTodo.title;
        this.editedTodo = "";
        this.saveTodos();
      }
    },
    deleteTodo(index) {
      if (window.confirm("削除してもよろしいでしょうか？")) {
        this.todos.splice(index, 1);
        this.editedTodo = "";
        this.saveTodos();
      }
    },
  },
});

app.mount("#app");
