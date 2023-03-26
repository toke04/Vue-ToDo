const app = Vue.createApp({
  data () {
    return {
      newTodo: '',
      todos: []
    }
  },
  mounted () {
    this.todos = JSON.parse(localStorage.getItem('todos') || [])
  },
  methods: {
    createTodo () {
      if (this.newTodo === '') return
      const todo = {
        title: this.newTodo,
        isEditing: false,
        isDone: false
      }
      this.todos.push(todo)
      this.newTodo = ''
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    editTodo (todo) {
      todo.isEditing = !todo.isEditing
    },
    updateTodo (todo) {
      todo.title = todo.title
      todo.isEditing = !todo.isEditing
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    deleteTodo (index) {
      if (window.confirm('削除してもよろしいでしょうか？')) {
        this.todos.splice(index, 1)
        localStorage.setItem('todos', JSON.stringify(this.todos))
      }
    }
  }
})

app.mount('#app')
