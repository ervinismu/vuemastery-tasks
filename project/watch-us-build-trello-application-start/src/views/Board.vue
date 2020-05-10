<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div 
        class="column"
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        draggable
        @drop="moveTaskOrColumn($event, column.tasks, $columnIndex)"
        @dragover.prevent
        @dragenter.prevent
        @dragstart.self="pickupColumn($event, $columnIndex)"
      >

        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>

        <div class="list-reset">
          <div 
            class="task"
            v-for="(task, $taskIndex) of column.tasks"
            :key="$taskIndex"
            draggable
            @dragstart="pickupTask($event, $taskIndex, $columnIndex)"
            @click="goToTask(task)"
            @dragover.prevent
            @dragenter.prevent
            @drop.stop="moveTaskOrColumn($event, column.tasks, $columnIndex, $taskIndex)"
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
          <input
            type="text"
            class="block p-2 w-full bg-transparent"
            placeholder="+ Enter new task"
            @keyup.enter="createTask($event, column.tasks)"
          />
        </div>

      </div>
      
      <div class="column flex">
        <input
          class="p-2 mr-2 flex-grow"
          placeholder="New column name"
          v-model="newColumnName"
          @keyup.enter="createColumn"
        />
      </div>
    </div>

    <div 
      class="task-bg"
      v-if="isTaskOpen"
      @click.self="close"
    >
      <router-view/>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['board']),
    isTaskOpen () {
      return this.$route.name === 'task'
    }
  },
  methods: {
    goToTask (task) {
      console.log('=== [BOARD | METHODS] GO TO TASK')

      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    close () {
      console.log('=== [BOARD | METHODS] CLOSE')

      this.$router.push({ name: 'board' })
    },
    createTask (e, tasks) {
      console.log('=== [BOARD | METHODS] CREATE TASK')

      this.$store.commit('CREATE_TASK', {
        tasks,
        name: e.target.value
      })
      e.target.value = ''
    },
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
    pickupColumn (e, fromColumnIndex) {
      console.log('=== [BOARD | METHODS] PICK UP COLUMN')
      console.log(`fromColumnIndex : ${fromTaskIndex}`)
      console.log('===')
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')
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
    },
    createColumn () {
      this.$store.commit('CREATE_COLUMN', {
        name: this.newColumnName
      })
      this.newColumnName = ''
    }
  }
}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}

.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0,0,0,0.5);
}
</style>
