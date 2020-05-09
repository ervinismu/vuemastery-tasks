import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin, uuid } from './utils'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  getters: {
    getTask (state) {
      console.log('=== [GETTER] GET TASK')
      console.log(`task: ${state}`)
      console.log('===')

      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  },
  mutations: {
    CREATE_TASK (state, { tasks, name }) {
      console.log('=== [STORE] CREATE TASK')
      console.log(`tasks: ${tasks}`)
      console.log(`name: ${name}`)
      console.log('===')

      tasks.push({
        name,
        id: uuid(),
        description: ''
      })
    },
    UPDATE_TASK (state, { task, key, value }) {
      console.log('=== [STORE] UPDATE TASK')
      console.log(`task: ${task}`)
      console.log(`key: ${key}`)
      console.log(`value: ${value}`)
      console.log('===')

      task[key] = value
      // Vue.set(task, key, value)
    },
    MOVE_TASK (state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      console.log('=== [STORE] MOVE TASKS')
      console.log(`from tasks : ${fromTasks}`)
      console.log(`toTasks: ${toTasks}`)
      console.log(`fromTaskIndex: ${fromTaskIndex}`)
      console.log(`toTaskIndex: ${toTaskIndex}`)
      console.log('===')

      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
      toTasks.splice(toTaskIndex, 0, taskToMove)
    },
    MOVE_COLUMN (state, { fromColumnIndex, toColumnIndex }) {
      console.log('=== [STORE] MOVE COLUMN')
      console.log(`fromColumnIndex: ${fromColumnIndex}`)
      console.log(`toColumnIndex: ${toColumnIndex}`)
      console.log('===')

      const columnList = state.board.columns
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]

      columnList.splice(toColumnIndex, 0, columnToMove)
    }
  }
})
