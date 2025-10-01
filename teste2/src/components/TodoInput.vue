<template>
  <div class="input-container">
    <div class="input-wrapper">
      <input
        v-model="taskText"
        @keyup.enter="handleAdd"
        type="text"
        placeholder="Adicione uma nova tarefa..."
        class="task-input"
        ref="inputField"
      />
      <button @click="handleAdd" class="add-button">
        <span class="plus-icon">+</span>
        <span class="add-text">Adicionar</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoInput',
  data() {
    return {
      taskText: ''
    }
  },
  methods: {
    handleAdd() {
      if (this.taskText.trim()) {
        this.$emit('add-task', this.taskText)
        this.taskText = ''
        this.$refs.inputField.focus()
      }
    }
  },
  mounted() {
    this.$refs.inputField.focus()
  }
}
</script>