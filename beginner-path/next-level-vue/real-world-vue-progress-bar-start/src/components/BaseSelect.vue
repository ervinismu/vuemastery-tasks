<template>
  <div>
    <label for="" v-if="label">{{ label }}</label>
    <select :value="value"
            v-on="$listeners"
            @change="updateValue"
            v-bind="$attrs">
      <option v-for="option in options"
              :selected="option === value"
              :value="option"
              :key="option.id">
              {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from '../mixins/formFieldMixin.js'

export default {
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      required: true
    },
    value: [String, Number]
  }
}
</script>
