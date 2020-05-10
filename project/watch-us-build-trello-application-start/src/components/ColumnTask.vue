<template>
  <div
    class="task"
    draggable
    @dragstart="pickupTask($event, taskIndex, columnIndex)"
    @click="goToTask(task)"
    @dragover.prevent
    @dragenter.prevent
    @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)"
  >
    <span class="w-full flex-no-shrink font-bold">
      {{ task.name }}
    </span>
    <p
      v-if="task.description"
      class="w-full flex-no-shrink mt-1 text-sm"
    >
      {{ task.description }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    },
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    board: {
      type: Object,
      required: true
    }
  },
  methods: {
    pickupTask (e, taskIndex, fromColumnIndex) {
      console.log('=== [BOARD | METHODS] PICK UP TASK')
      console.log(`taskIndex : ${taskIndex}`)
      console.log(`fromColumnIndex : ${fromColumnIndex}`)
      console.log('===')

      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-task-index', taskIndex)
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'task')
    },
    goToTask (task) {
      console.log('=== [BOARD | METHODS] GO TO TASK')

      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    moveTaskOrColumn (e, toTasks, toColumnIndex, toTaskIndex) {
      console.log('=== [BOARD | METHODS] MOVE TASK OR COLUMN')
      console.log(`toTasks : ${toTasks}`)
      console.log(`toColumnIndex : ${toColumnIndex}`)
      console.log(`toTaskIndex : ${toTaskIndex}`)
      console.log('===')

      const type = e.dataTransfer.getData('type')

      if (type === 'task') {
        this.moveTask(e, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length)
      } else {
        this.moveColumn(e, toColumnIndex)
      }
    },
    moveTask (e, toTasks, toTaskIndex) {
      console.log('=== [BOARD | METHODS] MOVE TASK')
      console.log(`toTasks : ${toTasks}`)
      console.log(`toTaskIndex : ${toTaskIndex}`)
      console.log('===')

      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      const fromTasks = this.board.columns[fromColumnIndex].tasks
      const fromTaskIndex = e.dataTransfer.getData('from-task-index')

      this.$store.commit('MOVE_TASK', {
        fromTasks,
        fromTaskIndex,
        toTasks,
        toTaskIndex
      })
    },
    moveColumn (e, toColumnIndex) {
      console.log('=== [BOARD | METHODS] MOVE COLUMN')
      console.log(`toColumnIndex : ${toColumnIndex}`)
      console.log('===')

      const fromColumnIndex = e.dataTransfer.getData('from-column-index')

      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex
      })
    }
  }
}
</script>
<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
