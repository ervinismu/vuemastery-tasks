<template>
  <div>

    <h1>Events for {{ user.user.name }}</h1>

    <EventCard v-for="event in event.events" :key="event.id" :event="event"/>

    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">Prev Page</router-link>
    </template> |
    <router-link :to="{ name: 'event-list', query: { page: page + 1 } }" rel="prev">Next Page</router-link>

  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard
  },
  created() {
    this.$store.dispatch('event/fetchEvents', {
      perPage: 3, // how many items to display per page
      page: this.page // what page we're on
    })
  },
  computed: {
    hasNextEvent() {
      return this.event.eventsTotal > this.page * this.perPage
    },
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    ...mapState(['event', 'user'])
  }
}
</script>
