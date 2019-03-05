<template>
  <div class="text-center">
    <div v-if="ball.type == 'valid'" class="ball shadow" :class="ball.type">
      <div>{{ ball.value }}</div>
      <div class="ball-type">{{ ball.value > 1 ? ballType.labelPlural : ballType.label }}</div>
    </div>
    <div v-if="ball.type == 'wicket'" class="ball shadow" :class="ball.type">
      <div v-if="ball.value > 1">{{ ball.value }}</div>
      <div class="ball-type">{{ ballType.label }}</div>
    </div>
    <div
      v-if="ball.type == 'wide' || ball.type == 'noBall' || ball.type == 'bye' || ball.type == 'legBye'"
      class="ball shadow"
      :class="ball.type"
    >
      <div v-if="ball.value > 1">
        <div>{{ ball.value }}</div>
        <div class="ball-type">{{ ballType.labelPlural }}</div>
      </div>
      <div v-else class="ball-type">{{ ballType.label }}</div>
    </div>
    <div class="ball-position" v-if="ball.type == 'valid' || ball.type == 'wicket'">
      <strong>#{{ball.position}}</strong>
    </div>
  </div>
</template>

<script>
export default {
  props: ["ball"],
  computed: {
    ballType() {
      return this.$store.state.ballTypes[this.ball.type];
    }
  }
};
</script>

<style lang="scss" scoped>
.ball {
  width: 52px;
  height: 52px;
  margin-left: 3px;
  margin-right: 3px;
  margin-bottom: 3px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ball 500ms linear;
}

.ball-type {
  font-size: 11px;
}

.ball-position {
  font-size: 12px;
  text-transform: uppercase;
}

.wide,
.bye,
.noBall,
.legBye {
  background-color: var(--warning);
  color: #fff;
}

.wicket {
  background-color: var(--danger);
  color: #fff;
}

@keyframes ball {
  0% {
    transform: matrix3d(0.5, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  5.81% {
    transform: matrix3d(0.742, 0, 0, 0, 0, 0.742, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  11.61% {
    transform: matrix3d(0.94, 0, 0, 0, 0, 0.94, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  17.42% {
    transform: matrix3d(1.045, 0, 0, 0, 0, 1.045, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  23.12% {
    transform: matrix3d(1.071, 0, 0, 0, 0, 1.071, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  30.33% {
    transform: matrix3d(1.049, 0, 0, 0, 0, 1.049, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  37.44% {
    transform: matrix3d(1.016, 0, 0, 0, 0, 1.016, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  44.54% {
    transform: matrix3d(0.997, 0, 0, 0, 0, 0.997, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  51.65% {
    transform: matrix3d(0.992, 0, 0, 0, 0, 0.992, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  80.28% {
    transform: matrix3d(1.001, 0, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  100% {
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
}
</style>
