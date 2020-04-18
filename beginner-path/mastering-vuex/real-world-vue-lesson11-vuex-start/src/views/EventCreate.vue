<template>
  <div>
    <form @submit.prevent="createEvent">
      <label for="">Select a Category</label>
      <select v-model="event.category" id="">
        <option value="" v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>

      <h3>Name & describe your event</h3>
      <div class="field">
        <label for="">Title</label>
        <input type="text" v-model="event.title" placeholder="Add an event title" name="" id="">
      </div>
      <div class="field">
        <label for="">Description</label>
        <input type="text" placeholder="Add a description" v-model="event.description">
      </div>

      <h3>Where is your event?</h3>
      <div class="field">
        <label for="">Location</label>
        <input type="text" v-model="event.location" placeholder="Add a location">
      </div>

      <h3>When is your event?</h3>
      <div class="field">
        <label for="">Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <label for="">Select a time</label>
        <select name="" id="" v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit">
    </form>
  </div>
</template>

<script>
import DatePicker from 'vuejs-datepicker'

export default {
  components: {
    DatePicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      event: this.createFreshEventObject(),
      times,
      categories: this.$store.state.categories
    }
  },
  methods: {
    createEvent() {
      this.$store.dispatch('event/createEvent', this.event).then(() => {
        this.$router.push({
          name: 'event-show',
          params: { id: this.event.id }
        })
        this.event = this.createFreshEventObject()
      })
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
