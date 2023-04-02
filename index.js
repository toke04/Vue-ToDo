const app = Vue.createApp({
  data() {
    return {
      newTodo: "",
      todos: [],
      canEditTodo: true,
      canDeleteTodo: true
    };
  },
  mounted() {
    this.todos = JSON.parse(localStorage.getItem("vue-todos") || []);
  },
  computed: {
    writingMessage() {
      if (this.newTodo !== "")
        return (
            `おー、「${this.newTodo}」というタスクを登録するんだね😊ええで〜`
        );
      return "さあ、👆タスクを登録するんだ！カモン！😊";
    },
  },
  methods: {
    createTodo() {
      if (this.newTodo === "") return;
      const todo = {
        title: this.newTodo,
        isEditing: false,
        isDone: false,
      };
      this.todos.push(todo);
      this.newTodo = "";
      this.saveTodos();
    },
    editTodo(todo) {
      todo.isEditing = true;
      this.disableEditAndDeleteTodo();
    },
    cancelEdit(todo, index) {
      const savedTodo = JSON.parse(localStorage.getItem("vue-todos"))[index];
      todo.title = savedTodo.title;
      this.enableEditAndDeleteTodo();
      todo.isEditing = false;
      this.saveTodos()
    },
    updateTodo(todo) {
      this.enableEditAndDeleteTodo();
      todo.isEditing = false;
      this.saveTodos();
    },
    deleteTodo(index) {
      if (window.confirm("削除してもよろしいでしょうか？")) {
        this.todos.splice(index, 1);
        this.enableEditAndDeleteTodo()
        this.saveTodos();
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
