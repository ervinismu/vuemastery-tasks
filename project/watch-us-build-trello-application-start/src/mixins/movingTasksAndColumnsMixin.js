export default {
  props: {
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
    moveTaskOrColumn (transferData) {
      console.log('=== [BOARD | METHODS] MOVE TASK OR COLUMN')
      console.log('===')

      if (transferData.type === 'task') {
        this.moveTask(transferData)
      } else {
        this.moveColumn(transferData)
      }
    },
    moveTask ({ fromColumnIndex, fromTaskIndex }) {
      console.log('=== [BOARD | METHODS] MOVE TASK')
      console.log('===')

      const fromTasks = this.board.columns[fromColumnIndex].tasks

      this.$store.commit('MOVE_TASK', {
        fromTasks,
        fromTaskIndex,
        toTasks: this.column.tasks,
        toTaskIndex: this.column.taskIndex
      })
    },
    moveColumn ({ fromColumnIndex }) {
      console.log('=== [BOARD | METHODS] MOVE COLUMN')
      console.log('===')

      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex: this.columnIndex
      })
    }
  }
}
