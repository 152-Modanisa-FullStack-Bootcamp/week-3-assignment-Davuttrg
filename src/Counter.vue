<template>
  <div class="counter-container">
    <button id="button-decrease" @click="decrease">Decrease</button>
    <span id="count-text">{{ count }}k</span>
    <button id="button-increase" @click="increase">Increase</button>
  </div>
</template>

<script>
export default {
  name: "Counter",
  computed: {
    count() {
      return this.$store.state.count
    }
  },
  methods: {
    decrease() {
      this.$store.dispatch('decrement')
    },
    increase() {
      this.$store.dispatch('increment')
    },
  },
};
</script>
<style scoped>
.counter-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
}
</style>