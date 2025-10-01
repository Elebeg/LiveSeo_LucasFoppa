<template>
  <div class="todo-container">
    <div class="header">
      <h1>Minhas Tarefas</h1>
    </div>
    
    <TodoInput @add-task="addTask" />
    
    <!-- Filtros -->
    <div class="filters">
      <button 
        v-for="filter in filters" 
        :key="filter.value"
        @click="currentFilter = filter.value"
        :class="['filter-btn', { active: currentFilter === filter.value }]"
      >
        {{ filter.label }} ({{ getFilterCount(filter.value) }})
      </button>
    </div>
    
    <div v-if="filteredTasks.length === 0" class="empty-state">
      <div class="empty-icon">📋</div>
      <p>{{ emptyMessage }}</p>
    </div>
    
    <transition-group name="list" tag="div" class="tasks-list" v-else>
      <TodoItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @toggle="toggleTask"
        @remove="removeTask"
        @edit="editTask"
      />
    </transition-group>
    
    <div v-if="tasks.length > 0" class="footer">
      <div class="stats">
        <span class="stat-item">
         {{ completedCount }} concluídas
        </span>
        <span class="stat-item">
         {{ pendingCount }} pendentes
        </span>
      </div>
      <button 
        v-if="completedCount > 0" 
        @click="clearCompleted"
        class="clear-btn"
      >
        Limpar concluídas
      </button>
    </div>
  </div>
</template>

<script>
import TodoInput from './TodoInput.vue'
import TodoItem from './TodoItem.vue'

export default {
  name: 'TodoList',
  components: {
    TodoInput,
    TodoItem
  },
  data() {
    return {
      tasks: [],
      currentFilter: 'all',
      filters: [
        { value: 'all', label: 'Todas' },
        { value: 'active', label: 'Ativas' },
        { value: 'completed', label: 'Concluídas' }
      ]
    }
  },
  computed: {
    completedCount() {
      return this.tasks.filter(t => t.completed).length
    },
    pendingCount() {
      return this.tasks.length - this.completedCount
    },
    // Filtro as tarefas aqui ao invés de no template
    // Computed é mais eficiente porque cacheia o resultado
    filteredTasks() {
      switch(this.currentFilter) {
        case 'active':
          return this.tasks.filter(t => !t.completed)
        case 'completed':
          return this.tasks.filter(t => t.completed)
        default:
          return this.tasks
      }
    },
    emptyMessage() {
      if (this.tasks.length === 0) {
        return 'Nenhuma tarefa ainda. Adicione uma acima!'
      }
      switch(this.currentFilter) {
        case 'active':
          return 'Nenhuma tarefa ativa! 🎉'
        case 'completed':
          return 'Nenhuma tarefa concluída ainda.'
        default:
          return 'Nenhuma tarefa ainda.'
      }
    }
  },
  methods: {
    addTask(taskText) {
      this.tasks.unshift({
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toLocaleString('pt-BR')
      })
    },
    toggleTask(taskId) {
      const task = this.tasks.find(t => t.id === taskId)
      if (task) {
        task.completed = !task.completed
      }
    },
    removeTask(taskId) {
      const index = this.tasks.findIndex(t => t.id === taskId)
      if (index > -1) {
        this.tasks.splice(index, 1)
      }
    },
    editTask({ id, newText }) {
      const task = this.tasks.find(t => t.id === id)
      if (task) {
        task.text = newText
      }
    },
    clearCompleted() {
      this.tasks = this.tasks.filter(t => !t.completed)
    },
    getFilterCount(filter) {
      switch(filter) {
        case 'active':
          return this.pendingCount
        case 'completed':
          return this.completedCount
        default:
          return this.tasks.length
      }
    }
  },
  watch: {
    tasks: {
      handler(newTasks) {
        localStorage.setItem('vue-todos', JSON.stringify(newTasks))
      },
      deep: true
    }
  },
  mounted() {
    const saved = localStorage.getItem('vue-todos')
    if (saved) {
      this.tasks = JSON.parse(saved)
    }
  }
}
</script>