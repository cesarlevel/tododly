import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    boards: []
  },
  mutations: {
    update(state, payload) {
      state.boards[payload.boardIndex].board.cards[payload.cardIndex][1] =
        payload.cardValue;
      localStorage.setItem("todo", JSON.stringify(state));
    },
    getLocalStorage(state, payload) {
      this.replaceState(Object.assign(state, payload));
    },
    newBoard(state, payload) {
      state.boards.push({
        board: {
          name: payload,
          cards: [["To Do", []], ["In Progress", []], ["Done", []]]
        }
      });
      localStorage.setItem("todo", JSON.stringify(state));
    },
    releaseBoard(state, payload) {
      state.boards[payload].board.cards[2][1].splice(
        0,
        state.boards[payload].board.cards[2][1].length
      );
      localStorage.setItem("todo", JSON.stringify(state));
    },
    deleteBoard(state, payload) {
      state.boards.splice(payload, 1);
      localStorage.setItem("todo", JSON.stringify(state));
    }
  },
  actions: {
    update({ commit }, payload) {
      commit("update", payload);
    },
    getLocalStorage({ commit }, payload) {
      commit("getLocalStorage", payload);
    },
    newBoard({ commit }, payload) {
      commit("newBoard", payload);
    },
    releaseBoard({ commit }, payload) {
      commit("releaseBoard", payload);
    },
    deleteBoard({ commit }, payload) {
      commit("deleteBoard", payload);
    }
  },
  getters: {
    getBoard: state => {
      return state.boards;
    }
  }
});
