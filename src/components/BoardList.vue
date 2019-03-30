<template>
  <div>
    <div class="board-mini-container">
      <div
        class="board-mini"
        v-for="(workspace, index) in workspaces"
        :key="index"
        @click="toBoard(index);"
      >
        <p>{{ workspace.board.name }}</p>
        <div class="board-mini-task-container">
          <div
            class="board-mini-task"
            v-for="(cards, index) in workspace.board.cards"
            :key="index"
          >
            <div
              class="board-mini-task-cards"
              v-for="(tasks, index) in cards[1]"
              :key="index"
            ></div>
          </div>
        </div>
        <div class="delete-board" @click.stop="getShowBoardDeleteModal(index);">
          &times;
        </div>
      </div>
      <div class="new-board" @click="showNewBoardModal">+</div>
    </div>
    <div class="overlay" v-if="showModal" @keyup.esc="showModal = false;">
      <div class="modal form">
        <div class="modal-header">
          <span class="close" @click="showModal = false;">&times;</span>
        </div>
        <div class="modal-content">
          <input
            type="text"
            ref="modalInput"
            autofocus
            placeholder="Add board name and press enter"
            @keyup.enter="addBoard($event);"
          />
          <span class="enter">&#x21A9;</span>
        </div>
      </div>
    </div>
    <div
      class="overlay"
      v-if="showBoardDeleteModal"
      @keyup.esc="showBoardDeleteModal = false;"
    >
      <div class="modal">
        <div class="modal-header">
          <span class="close" @click="showBoardDeleteModal = false;"
            >&times;</span
          >
        </div>
        <div class="modal-content">
          <div class="modal-content text-center">
            <h2>Delete "{{ workspaces[boardToDelete].board.name }}"</h2>
            <button @click="showBoardDeleteModal = false;">Cancel</button
            >&nbsp;&nbsp;&nbsp;&nbsp;<button
              @click="deleteBoard"
              class="positive"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoardList",
  props: {},
  components: {},
  data() {
    return {
      showModal: false,
      showBoardDeleteModal: false,
      boardToDelete: null
    };
  },
  computed: {
    workspaces() {
      return this.$store.state.boards;
    }
  },
  methods: {
    showNewBoardModal() {
      this.showModal = !this.showModal;
      this.$nextTick(() => {
        this.$refs.modalInput.focus();
      });
    },
    addBoard({ target }) {
      if (target.value === "") {
        return;
      }
      this.$store.dispatch("newBoard", target.value);
      this.showModal = false;
    },
    getShowBoardDeleteModal(index) {
      this.boardToDelete = index;
      this.showBoardDeleteModal = true;
    },
    deleteBoard() {
      if (this.boardToDelete !== null) {
        this.$store.dispatch("deleteBoard", this.boardToDelete);
      }
      this.showBoardDeleteModal = false;
    },
    toBoard(index) {
      this.$router.push({ name: "boards", params: { index: index } });
    }
  }
};
</script>
