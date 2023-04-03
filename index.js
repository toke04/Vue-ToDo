const app = Vue.createApp({
  data() {
    return {
      newTodo: "",
      todos: JSON.parse(localStorage.getItem("vue-todos") || "[]"),
      canEditTodo: true,
      canDeleteTodo: true,
      editedTodo: ""
    };
  },
  computed: {
    writingMessage() {
      if (this.newTodo !== "") {
        return `おー、「${this.newTodo}」というタスクを登録するんだね😊ええで〜`;
      }
      return "さあ、👆タスクを登録するんだ！カモン！😊";
    },
    getMaxId(){
      if (this.todos.length === 0) {
        return 0;
      } else {
        return Math.max(...this.todos.map((todo) => todo.id)) + 1;
      }
    },
  },
  methods: {
    createTodo() {
      if (this.newTodo === "") return;
      const todo = {
        id: this.getMaxId,
        title: this.newTodo,
        isDone: false,
      };
      this.todos.push(todo);
      this.newTodo = "";
      this.saveTodos();
    },
    editTodo(todo) {
      this.editedTodo = {...todo}
      this.disableEditAndDeleteTodo();
    },
    cancelEdit(todo, index) {
      const savedTodo = JSON.parse(localStorage.getItem("vue-todos"))[index];
      todo.title = savedTodo.title;
      this.enableEditAndDeleteTodo();
      this.editedTodo = ""
      this.saveTodos();
    },
    updateTodo(todo, index) {
      if (this.editedTodo.title === ''){
        this.deleteTodo(index)
      } else {
        const selectedTodo = this.todos.find((todo) => todo.id === this.editedTodo.id)
        selectedTodo.title = this.editedTodo.title
        this.enableEditAndDeleteTodo();
        this.editedTodo = ""
        this.saveTodos();
      }
    },
    deleteTodo(index) {
      if (window.confirm("削除してもよろしいでしょうか？")) {
        this.todos.splice(index, 1);
        this.enableEditAndDeleteTodo();
        this.saveTodos();
        location.reload();
      }
    },
    enableEditAndDeleteTodo() {
      this.canEditTodo = true;
      this.canDeleteTodo = true;
    },
    disableEditAndDeleteTodo() {
      this.canEditTodo = false;
      this.canDeleteTodo = false;
    },
    saveTodos() {
      localStorage.setItem("vue-todos", JSON.stringify(this.todos));
    },
  },
});

app.mount("#app");
