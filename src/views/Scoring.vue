<template>
  <div class="home h-100 d-flex flex-column bg-light">
    <div
      class="bg-dark text-white border-bottom d-flex text-center mb-2 justify-content-center align-items-baseline"
    >
      <div>
        {{ score }} / {{ wickets }}
        <fa-icon :icon="['fal', 'angle-left']"/>
        <span class="text-xs ml-1">({{ overs }}.{{legalBalls.length}})</span>
      </div>
      <b-dropdown variant="link" right class="btn-dropdown" no-caret>
        <template slot="button-content">
          <fa-icon :icon="['far', 'ellipsis-v']"/>
        </template>
        <b-dropdown-item>View Previous Overs</b-dropdown-item>
        <b-dropdown-item>Start a new Innings</b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="pl-4 mb-5" style="height: 100px;">
      <div
        class="text-xxs font-weight-semibold text-uppercase mb-3"
      >Current Over (#{{ innings.length + 1}})</div>
      <div class="over current-over" ref="over">
        <div v-for="ball in currentOver" :key="ball.id">
          <ball :ball="ball"></ball>
        </div>
      </div>
    </div>

    <div class="bg-light">
      <div class="container">
        <div class="form-row mb-2">
          <div class="col-7">
            <div class="form-row mb-2">
              <div class="col">
                <button class="btn btn-regular btn-block" @click="addBall(0, 'valid')">Dot</button>
              </div>
              <div class="col">
                <button class="btn btn-regular btn-block" @click="addBall(1, 'valid')">1 Run</button>
              </div>
            </div>
            <div class="form-row mb-2">
              <div class="col">
                <button class="btn btn-regular btn-block" @click="addBall(2, 'valid')">2 Runs</button>
              </div>
              <div class="col">
                <button class="btn btn-regular btn-block" @click="addBall(3, 'valid')">3 Runs</button>
              </div>
            </div>
            <div class="form-row mb-2">
              <div class="col">
                <button class="btn btn-regular btn-block" @click="addBall(4, 'valid')">4 Runs</button>
              </div>
              <div class="col">
                <button class="btn btn-regular btn-block" @click="addBall(6, 'valid')">6 Runs</button>
              </div>
            </div>
            <div>
              <div class="btn-group w-100">
                <button class="btn btn-regular btn-block" @click="addBall(0, 'wicket')">Wicket</button>
                <button class="btn btn-secondary" @click="openWicketRunsModal">+</button>
              </div>
            </div>
          </div>
          <div class="col-5">
            <div class="btn-group w-100 mb-2">
              <button class="btn btn-regular btn-block" @click="addBall(1, 'wide')">Wide</button>
              <button class="btn btn-secondary" @click="openExtrasModal('wide')">+</button>
            </div>
            <div class="btn-group w-100 mb-2">
              <button class="btn btn-regular btn-block" @click="addBall(1, 'bye')">Bye</button>
              <button class="btn btn-secondary" @click="openExtrasModal('bye')">+</button>
            </div>
            <div class="btn-group w-100 mb-2">
              <button class="btn btn-regular btn-block" @click="addBall(1, 'legBye')">Leg Bye</button>
              <button class="btn btn-secondary" @click="openExtrasModal('legBye')">+</button>
            </div>
            <div class="btn-group w-100 mb-2">
              <button class="btn btn-regular btn-block" @click="addBall(1, 'noBall')">No Ball</button>
              <button class="btn btn-secondary" @click="openExtrasModal('noBall')">+</button>
            </div>
          </div>
        </div>
        <div class="form-row mb-4">
          <div class="col-6">
            <button
              :disabled="currentOver.length == 0"
              @click="undo"
              class="btn btn-link btn-block"
            >Undo last ball</button>
          </div>
          <div class="col-6">
            <button class="btn btn-link btn-block" v-b-modal.endOverModal>End of Over</button>
          </div>
        </div>

        <div v-if="innings.length">
          <button
            class="text-xxs font-weight-semibold text-uppercase mb-2"
            v-b-toggle.collapse1
          >View Previous Overs</button>
          <!-- <div class="mb-2" v-for="(overs, index) in innings.slice().reverse()" :key="index"> -->
          <b-collapse id="collapse1">
            <div class="mb-2" v-for="(overs, index) in innings" :key="index">
              <div class="text-xs text-muted mb-1">Over {{ index + 1}}</div>
              <div class="over">
                <div v-for="ball in overs" :key="ball.id">
                  <ball :ball="ball"></ball>
                </div>
              </div>
            </div>
          </b-collapse>
        </div>

        <div>
          <button
            class="btn btn-outline-primary btn-block"
            v-b-modal.endInningsModal
          >Start a New Innings</button>
        </div>
      </div>
    </div>

    <div class="mb-2"></div>

    <!-- Modals-->
    <b-modal
      v-model="showExtrasModal"
      :title="'Add ' + extrasModalType + 's'"
      size="sm"
      class="text-center"
      hide-footer
    >
      <extras-modal :type="extrasModalType" @clicked="addExtras"></extras-modal>
    </b-modal>

    <b-modal
      v-model="showWicketRunsModal"
      :title="'Add runs to this wicket'"
      size="sm"
      class="text-center"
      hide-footer
    >
      <wicket-runs-modal @clicked="addWicketRuns"></wicket-runs-modal>
    </b-modal>

    <b-modal id="endOverModal" hide-header size="sm" class="text-center" @ok="endOver">End the over?</b-modal>

    <b-modal
      id="endInningsModal"
      hide-header
      size="sm"
      class="text-center"
      @ok="endInnings"
    >End the innings?</b-modal>
  </div>
</template>

<script>
import Ball from "@/components/Ball.vue";
import ExtrasModal from "@/components/ExtrasModal.vue";
import WicketRunsModal from "@/components/WicketRunsModal.vue";

export default {
  name: "scoring",
  data() {
    return {
      showExtrasModal: false,
      showWicketRunsModal: false,
      extrasModalType: null
    };
  },
  components: {
    Ball,
    ExtrasModal,
    WicketRunsModal
  },
  computed: {
    score() {
      return this.$store.getters.runs;
    },
    currentOver() {
      return this.$store.state.currentOver;
    },
    wickets() {
      return this.$store.getters.wickets;
    },
    overs() {
      return this.$store.getters.overs;
    },
    legalBalls() {
      return this.currentOver.filter(
        ball => ball.type == "valid" || ball.type == "wicket"
      );
    },
    innings() {
      return this.$store.state.innings;
    },
    ballPosition() {
      return this.$store.state.ballPosition;
    }
  },
  methods: {
    addBall(value, type) {
      this.$store.dispatch("addBall", {
        value: value,
        type: type
      });
    },
    addExtras(value) {
      this.addBall(value.value, value.type);
      this.showExtrasModal = false;
    },
    openExtrasModal(type) {
      this.extrasModalType = type;
      this.showExtrasModal = true;
    },
    undo() {
      this.$store.dispatch("undo");
    },
    endOver() {
      this.$store.dispatch("endOver");
    },
    endInnings() {
      this.$store.dispatch("endInnings");
    },
    openWicketRunsModal() {
      console.log("Here");
      this.showWicketRunsModal = true;
    },
    addWicketRuns(value) {
      this.addBall(value.value, "wicket");
      this.showWicketRunsModal = false;
    }
  },
  watch: {
    currentOver() {
      // console.log("HEre");
      const overWrapper = this.$refs.over;
      // console.log(overWrapper.scrollLeft);
      // console.log(overWrapper.scrollWidth);
      overWrapper.scrollLeft = overWrapper.scrollWidth;
      // overWrapper.scrollLeft = 10000;
      // console.log(overWrapper.scrollLeft);
    }
  }
};
</script>


<style lang="scss" scoped>
.over {
  display: flex;
  overflow-x: scroll;
}

.btn {
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>
