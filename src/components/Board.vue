<template>
  <div>
    <h1>{{ board.name }}</h1>
    <div class="board">
      <div v-for="(card, index) in board.cards" :key="index">
        <TaskCard
          @input="updateCard($event, index);"
          @release="releaseBoardModal"
          :index="index"
          :card="card"
        />
      </div>
    </div>
    <div class="overlay" v-if="showModal" @keyup.esc="showModal = false;">
      <div class="modal">
        <div class="modal-header">
          <span class="close" @click="showModal = false;">&times;</span>
        </div>
        <div class="modal-content text-center">
          <h2>Ready to release?</h2>
          <button @click="showModal = false;">Cancel</button
          >&nbsp;&nbsp;&nbsp;&nbsp;<button
            @click="releaseBoard"
            class="positive"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskCard from "./TaskCard";

export default {
  name: "Board",
  components: {
    TaskCard
  },
  data() {
    return {
      boardIndex: this.$route.params.index,
      showModal: false
    };
  },
  watch: {
    state(value) {
      localStorage.setItem("todo", JSON.stringify(value));
    },
    $route() {
      this.boardIndex = this.$route.params.index;
    }
  },
  computed: {
    board() {
      return this.$store.getters.getBoard[this.boardIndex].board;
    }
  },
  methods: {
    updateCard(value, index) {
      this.$store.dispatch("update", {
        boardIndex: this.boardIndex,
        cardIndex: index,
        cardValue: value
      });
    },
    releaseBoardModal() {
      this.showModal = true;
    },
    releaseBoard() {
      this.$store.dispatch("releaseBoard", this.boardIndex);
      this.showModal = false;
    }
  },
  mounted() {
    if (localStorage.todo) {
      const local = JSON.parse(localStorage.todo);
      this.$store.dispatch("getLocalStorage", local);
    }
  }
};
</script>
