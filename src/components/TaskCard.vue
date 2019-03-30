<template>
  <div class="task-card">
    <div class="task-card-title">
      <span>{{ card[0] }}</span
      ><span
        @click="releaseBoard"
        class="no-flex btn-release"
        v-if="index === 2"
        >🚀</span
      >
    </div>
    <div class="task-card-content">
      <input
        v-if="index === 0"
        type="text"
        v-model="listInput"
        placeholder="Press enter to add a task"
        @keyup.enter="addItem($event);"
      />
      <ul ref="listGroup">
        <Draggable
          v-model="list"
          :options="{ group: 'cards', forceFallback: true }"
          @start="onStart"
          @end="onEnd"
        >
          <li
            v-for="(item, index) in list"
            :key="index"
            :class="{ 'is-done': cardIsDone }"
          >
            <span
              class="task-priority"
              :class="{ 'is-done': cardIsDone }"
              :style="colorTest(index)"
            ></span>
            <span
              >{{ item.value }}<br /><small>{{ item.time }}</small></span
            >
            <!-- <span class="edit-task" @click="editTask">&hellip;</span> -->
          </li>
        </Draggable>
      </ul>
    </div>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import moment from "moment";

export default {
  name: "TodoList",
  props: {
    card: {
      type: Array
    },
    index: {
      type: Number,
      default: 0
    }
  },
  components: {
    Draggable
  },
  data() {
    return {
      list: [],
      listInput: null
    };
  },
  watch: {
    card(value) {
      this.list = value[1] || [];
    },
    list(value) {
      this.$emit("input", this.list);
    }
  },
  computed: {
    cardIsDone() {
      return this.card[0] === "Done";
    },
    dragContainer() {
      return document.querySelectorAll("div:empty");
    },
    taskCard() {
      return document.querySelectorAll(".task-card");
    }
  },
  methods: {
    colorTest(index) {
      if (index >= 0 && index <= 1) {
        return { background: "OrangeRed" };
      } else if (index >= 2 && index <= 3) {
        return { background: "Gold" };
      } else if (index >= 4 && index <= 5) {
        return { background: "LightGreen" };
      } else {
        return { background: "DodgerBlue" };
      }
    },
    addItem({ target }) {
      const time = moment().format("MMMM Do YY");
      let checkDups = this.list.map(item => item.value);
      if (target.value === "" || checkDups.includes(target.value)) {
        return;
      }
      this.list.push({ value: target.value, time: time });
      this.listInput = null;
    },
    editTask() {
      alert("test");
    },
    releaseBoard() {
      this.$emit("release");
    },
    toggleHighlight(nodes, addOrRemove) {
      nodes.forEach(item => item.classList[addOrRemove]("is-empty-highlight"));
    },
    onStart() {
      this.toggleHighlight(this.dragContainer, "add");
      this.toggleHighlight(this.taskCard, "add");
    },
    onEnd() {
      this.toggleHighlight(this.dragContainer, "remove");
      this.toggleHighlight(this.taskCard, "remove");
    }
  }
};
</script>
