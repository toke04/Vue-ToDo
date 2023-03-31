const app = Vue.createApp({
  data() {
    return {
      newTodo: "",
      todos: [],
    };
  },
  mounted() {
    this.todos = JSON.parse(localStorage.getItem("vue-todos") || []);
  },
  computed: {
    writingMessage() {
      if (this.newTodo !== "")
        return (
          "おー、「" + this.newTodo + "」というタスクを登録するんだね😊ええで〜"
        );
      if (this.newTodo === "")
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
      this.saveLocalStorage();
    },
    editTodo(todo) {
      todo.isEditing = !todo.isEditing;
    },
    updateTodo(todo) {
      todo.isEditing = !todo.isEditing;
      this.saveLocalStorage();
    },
    deleteTodo(index) {
      if (window.confirm("削除してもよろしいでしょうか？")) {
        this.todos.splice(index, 1);
        this.saveLocalStorage();
      }
    },
    saveLocalStorage() {
      localStorage.setItem("vue-todos", JSON.stringify(this.todos));
    },
  },
});

app.mount("#app");
