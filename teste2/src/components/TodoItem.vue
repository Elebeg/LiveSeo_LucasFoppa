<template>
  <div class="task-item" :class="{ completed: task.completed }">
    <button 
      @click="$emit('toggle', task.id)"
      class="checkbox"
      :class="{ checked: task.completed }"
    >
      <svg v-if="task.completed" class="check-icon" viewBox="0 0 24 24">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    </button>
    
    <div class="task-content">
      <input
        v-if="isEditing"
        v-model="editText"
        @keyup.enter="saveEdit"
        @keyup.esc="cancelEdit"
        @blur="saveEdit"
        ref="editInput"
        class="edit-input"
      />
      <span v-else class="task-text">
        {{ task.text }}
      </span>
      <span class="task-date">{{ task.createdAt }}</span>
    </div>
    
    <div class="task-actions">
      <button 
        v-if="!task.completed && !isEditing"
        @click="startEdit"
        class="action-btn edit-btn"
        title="Editar"
      >
        ✏️
      </button>
      <button 
        @click="$emit('remove', task.id)"
        class="action-btn remove-btn"
        title="Remover"
      >
        🗑️
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      editText: ''
    }
  },
  methods: {
    startEdit() {
      this.isEditing = true
      this.editText = this.task.text
      this.$nextTick(() => {
        this.$refs.editInput.focus()
        this.$refs.editInput.select()
      })
    },
    saveEdit() {
      if (this.editText.trim() && this.editText !== this.task.text) {
        this.$emit('edit', { id: this.task.id, newText: this.editText })
      }
      this.isEditing = false
    },
    cancelEdit() {
      this.isEditing = false
      this.editText = ''
    }
  }
}
</script>
