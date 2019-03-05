<template>
  <div v-if="type">
    <button
      class="btn btn-outline-secondary btn-block"
      @click="addExtras(2)"
    >2 {{ballType.labelPlural}}</button>
    <button
      class="btn btn-outline-secondary btn-block"
      @click="addExtras(3)"
    >3 {{ballType.labelPlural}}</button>
    <button
      class="btn btn-outline-secondary btn-block"
      @click="addExtras(4)"
    >4 {{ballType.labelPlural}}</button>
    <button
      class="btn btn-outline-secondary btn-block"
      @click="addExtras(5)"
    >5 {{ballType.labelPlural}}</button>
  </div>
</template>

<script>
export default {
  props: ["type"],
  methods: {
    addExtras(value) {
      this.$emit("clicked", { value: value, type: this.type });
    }
  },
  computed: {
    ballType() {
      return this.$store.state.ballTypes[this.type];
    }
  }
};
</script>
