const app = Vue.createApp({
  data() {
    return {
      newTodo: "",
      todos: [],
      canClickEditButton: true,
      canDelete: true
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
      this.toggleIsEditing(todo);
      this.disableEdit();
      this.disableDelete()
    },
    cancelEdit(todo, index) {
      const savedTodo = JSON.parse(localStorage.getItem("vue-todos"))[index];
      todo.title = savedTodo.title;
      this.canClickEditButton = true;
      this.canDelete = true;
      this.toggleIsEditing(todo);
      this.saveTodos()
    },
    updateTodo(todo) {
      this.canClickEditButton = true;
      this.canDelete = true;
      this.toggleIsEditing(todo);
      this.saveTodos();
    },
    toggleIsEditing(todo) {
      todo.isEditing = todo.isEditing ? false : true;
    },
    disableEdit() {
      this.canClickEditButton = false;
    },
    disableDelete() {
      this.canDelete = false;
    },
    deleteTodo(index) {
      if (window.confirm("削除してもよろしいでしょうか？")) {
        this.todos.splice(index, 1);
        this.saveTodos();
      }
    },
    saveTodos() {
      localStorage.setItem("vue-todos", JSON.stringify(this.todos));
    },
  },
});

app.mount("#app");
