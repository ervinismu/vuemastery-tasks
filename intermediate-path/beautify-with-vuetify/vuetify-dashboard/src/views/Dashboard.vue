<template>
  <div>
    <h1>Dashboard</h1>
    <v-data-table
      :headers="headers"
      :items="employees"
      :items-per-page="5"
      class="elevation-1"
      @click:row="selectRow"
      :multi-sort="true"
    >
    </v-data-table>
    <v-snackbar
      v-model="snackbar"
    >
			You have selected {{ selectedEmployee.name }},
			{{ selectedEmployee.title }}
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import employeesData from '../data/employees.json'

export default {
  name: 'DashboardPage',
  data () {
    return {
      snackbar: false,
      selectedEmployee: {
				name: '',
				title: ''
			},
			headers: [
				{ text: 'Employee ID', value: 'id' },
				{ text: 'Name', value: 'name' },
				{ text: 'Position Title', value: 'title' },
				{ text: 'Salary', value: 'salary' }
			],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        // The rest of the data was removed 
        // to shorten the length of the code sample 
        // in this article
      ],
      employees: employeesData
    }
  },
  methods: {
    selectRow(event) {
			this.snackbar = true
			this.selectedEmployee.name = event.name
			this.selectedEmployee.title = event.title
    }
  }
}
</script>
