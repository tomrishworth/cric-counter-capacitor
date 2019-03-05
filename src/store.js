import Vue from "vue";
import Vuex from "vuex";
import { uniqueId } from "lodash";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    innings: [],
    currentOver: [],
    ballPosition: 0,
    ballTypes: {
      valid: {
        id: "valid",
        extra: false
      },
      wide: {
        id: "wide",
        label: "Wide",
        labelPlural: "Wides",
        extra: true
      },
      noBall: {
        id: "noBall",
        label: "No Ball",
        labelPlural: "No Balls",
        extra: true
      },
      bye: {
        id: "bye",
        label: "Bye",
        labelPlural: "Byes",
        extra: true
      },
      legBye: {
        id: "legBye",
        label: "Leg Bye",
        labelPlural: "Leg Byes",
        extra: true
      },
      wicket: {
        id: "wicket",
        label: "Wicket",
        labelPlural: "Wickets",
        extra: false
      }
    }
  },
  mutations: {
    setBall: (state, payload) => {
      const ball = payload;
      ball.id = uniqueId();
      if (payload.type == "valid" || payload.type == "wicket") {
        ball.position = state.ballPosition;
      }
      state.currentOver.push(ball);
      if (payload.type === "wicket") {
        state.wickets++;
      }
    },
    endOver: state => {
      state.innings.push(state.currentOver);
      state.currentOver = [];
      state.ballPosition = 0;
    },
    endInnings: state => {
      state.innings = [];
      state.currentOver = [];
      state.ballPosition = 0;
    },
    setBallPosition: state => {
      state.ballPosition++;
    },
    undo: state => {
      const lastItem = state.currentOver[state.currentOver.length - 1];
      if (lastItem.type == "valid" || lastItem.type == "wicket") {
        state.ballPosition--;
      }
      state.currentOver.pop();
    }
  },
  actions: {
    addBall: ({ commit }, payload) => {
      if (payload.type == "valid" || payload.type == "wicket") {
        commit("setBallPosition");
      }
      commit("setBall", payload);
    },
    endOver: ({ commit }) => {
      commit("endOver");
    },
    endInnings: ({ commit }) => {
      commit("endInnings");
    },
    undo: ({ commit }) => {
      commit("undo");
    }
  },
  getters: {
    ballLabel: state => type => {
      return state.ballTypes[type].label;
    },
    runs: state => {
      const currentOverRuns = state.currentOver.reduce((runs, ball) => {
        return runs + ball.value;
      }, 0);
      const inningsRuns = state.innings.reduce((totalRuns, overs) => {
        return (
          totalRuns +
          overs.reduce((overRuns, ball) => {
            return overRuns + ball.value;
          }, 0)
        );
      }, 0);
      return currentOverRuns + inningsRuns;
    },
    overs: state => {
      return state.innings.length;
    },
    wickets: state => {
      const currentOverWickets = state.currentOver.reduce(
        (numWickets, ball) => {
          if (ball.type == "wicket") {
            numWickets++;
          }
          return numWickets;
        },
        0
      );
      const inningsWickets = state.innings.reduce((totalWickets, overs) => {
        return (
          totalWickets +
          overs.reduce((overWickets, ball) => {
            if (ball.type == "wicket") {
              overWickets++;
            }
            return overWickets;
          }, 0)
        );
      }, 0);
      return currentOverWickets + inningsWickets;
    }
  }
});
