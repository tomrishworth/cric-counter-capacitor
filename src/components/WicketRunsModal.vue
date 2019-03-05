<template>
  <div>
    <button class="btn btn-outline-secondary btn-block" @click="addWicketRuns(2)">2 Runs</button>
    <button class="btn btn-outline-secondary btn-block" @click="addWicketRuns(3)">3 Runs</button>
    <button class="btn btn-outline-secondary btn-block" @click="addWicketRuns(4)">4 Runs</button>
    <button class="btn btn-outline-secondary btn-block" @click="addWicketRuns(5)">5 Runs</button>
  </div>
</template>

<script>
export default {
  methods: {
    addWicketRuns(value) {
      this.$emit("clicked", { value: value });
    }
  }
};
</script>
