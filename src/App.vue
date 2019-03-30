<template>
  <div id="app">
    <HeaderMenu />
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderMenu from "./components/HeaderMenu";

export default {
  name: "App",
  components: {
    HeaderMenu
  },
  created() {
    if (localStorage.todo) {
      const local = JSON.parse(localStorage.todo);
      this.$store.dispatch("getLocalStorage", local);
    }
  }
};
</script>

<style>
html,
body {
  background: #f6f9fc;
  margin: 0;
}

.no-flex {
  flex: 0 0 0% !important;
}

.text-center {
  text-align: center !important;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  padding: 20px 40px 40px 40px;
  width: 1100px;
  margin: 0 auto;
}

#app h1 {
  color: #2c3e50;
  margin-top: 0;
}

button {
  margin: 0;
  padding: 10px 20px;
  text-align: center;
  border: 1px solid #ffffff;
  border-radius: 4px;
  background: transparent;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
}

button.positive {
  background: #ffffff;
  color: #6772e5;
}

.logo {
  display: block;
  width: 36px;
  height: 36px;
  background: #6772e5;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  margin-bottom: 40px;
}

.logo .bar {
  display: block;
  position: absolute;
  width: 6px;
  height: 24px;
  top: 6px;
  border-radius: 6px;
  left: 6px;
  background: #ffffff;
}

.logo .bar.in,
.logo .bar.done {
  height: 14px;
}

.logo .bar.in {
  left: 15px;
}

.logo .bar.done {
  left: 24px;
}

.board {
  display: flex;
}

.board > div {
  flex: 1 0 25%;
  padding: 10px;
}

.board > div:first-child {
  padding-left: 0;
}

.board > div:last-child {
  padding-right: 0;
}

.task-card {
  background: white;
  box-sizing: border-box;
  border-radius: 6px;
  box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.15),
    0 18px 36px -18px rgba(0, 0, 0, 0.3);
}

.task-card.is-empty-highlight {
  background: white;
}

.task-card-title {
  padding: 16px 16px 8px 16px;
  text-align: left;
  font-size: 14px;
  display: flex;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: bold;
  align-items: center;
}

.task-card-title > * {
  flex: 1 0 auto;
}

.task-card-title .btn-release {
  cursor: pointer;
  height: 19px;
}

.task-card-content {
  padding: 8px;
}

.task-card-content input {
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid Gainsboro;
  border-radius: 4px;
}

.task-card-content input:focus {
  border: 1px solid #6772e5;
  outline: none;
  box-shadow: 0 0 0 2px rgba(103, 114, 229, 0.2);
}

.task-card-content ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.task-card-content ul > div {
  min-height: 46px;
}

.task-card-content ul > div:empty {
  border: 2px dashed Gainsboro;
  box-sizing: border-box;
  border-radius: 4px;
  content: "";
  position: relative;
}

.task-card-content ul > div.is-empty-highlight:empty {
  border-color: #6772e5;
}

.task-card-content ul > div:empty::after {
  content: "";
  line-height: 46px;
  color: SlateGray;
}

.task-card-content ul > div.is-empty-highlight:empty::after {
  color: #6772e5;
}

.task-card-content ul li {
  text-align: left;
  padding: 16px;
  display: flex;
  position: relative;
  align-items: center;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(50, 50, 93, 0.025),
    0 2px 4px 0 rgba(50, 50, 93, 0.1), 0 4px 8px 0 rgba(50, 50, 93, 0.025);
}

.task-card-content ul li.sortable-drag {
  background: #fff;
  opacity: 1;
}

.task-card-content ul li.sortable-chosen {
  opacity: 1 !important;
}

.task-card-content ul li.sortable-ghost {
  opacity: 1;
  background: #fff;
}

.task-card-content ul li {
  margin-bottom: 8px;
}

.task-card-content ul li:last-child {
  margin-bottom: 0;
}

.task-card-content ul li > span {
  flex: 1 0 auto;
  display: block;
  max-width: 250px;
  line-height: 18px;
  padding-right: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-card-content ul li.is-done > span {
  text-decoration: line-through;
  opacity: 0.6;
}

.task-card-content ul li > span.task-priority {
  width: 4px;
  display: inline-block;
  height: 20px;
  border-radius: 10px;
  padding: 0;
  margin-right: 16px;
  flex: none;
  background: red;
}

.task-card-content ul li > span.task-priority.is-done {
  background: SlateGray !important;
}

.task-card-content ul li > span > small {
  opacity: 0.6;
}

.task-card-content ul li > span.edit-task {
  display: block;
  width: 24px;
  height: 24px;
  font-size: 18px;
  border-radius: 24px;
  padding: 0;
  line-height: 16px;
  font-weight: bold;
  text-align: center;
  color: rgba(0, 0, 0, 0.25);
  background: white;
  position: absolute;
  top: 14px;
  right: 10px;
  cursor: pointer;
}

.task-card-content ul li:hover > span.edit-task {
  color: rgba(0, 0, 0, 1);
}

.board-mini-container,
.board-mini-task-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}

.board-mini-task-container {
  height: 78px;
  overflow: hidden;
}

.board-mini,
.new-board {
  position: relative;
  background: white;
  box-sizing: border-box;
  cursor: pointer;
  margin-right: 20px;
  margin-bottom: 20px;
  width: 200px;
  height: 120px;
  font-size: 16px;
  padding: 8px;
  border-radius: 6px;
  box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.15),
    0 18px 36px -18px rgba(0, 0, 0, 0.1);
}

.new-board {
  box-shadow: inset 0 0 0 4px Gainsboro;
  color: Gainsboro;
  font-weight: bold;
  text-align: center;
  line-height: 104px;
  font-size: 40px;
  background: transparent;
}

.new-board:hover {
  box-shadow: inset 0 0 0 4px #6772e5;
  color: #6772e5;
}

.board-mini p {
  margin: 0;
  padding: 8px;
  max-width: 200px;
  line-height: 18px;
  padding-right: 24px;
  padding-top: 4px;
  padding-bottom: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.board-mini-task {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex: 0 0 33.33%;
  padding: 4px;
  box-sizing: border-box;
}

.board-mini-task-cards {
  background: rgba(50, 50, 93, 0.15);
  flex: 1 0 100%;
  min-height: 6px;
  border-radius: 6px;
}

.board-mini-task-cards + .board-mini-task-cards {
  margin-top: 4px;
}

.delete-board {
  display: block;
  width: 28px;
  height: 28px;
  font-size: 28px;
  border-radius: 50%;
  line-height: 28px;
  text-align: center;
  color: rgba(50, 50, 93, 0.6);
  position: absolute;
  background: #ffffff;
  cursor: pointer;
  top: 6px;
  right: 6px;
  opacity: 0.3;
}

.board-mini:hover .delete-board {
  opacity: 1;
}

.overlay {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(103, 114, 229, 0.8);
}

.modal {
  width: 100%;
  border-radius: 6px;
  background: transparent;
}

.modal.form {
  width: 360px;
}

.modal-header {
  font-weight: bold;
  font-size: 16px;
  line-height: 16px;
  padding: 16px 16px 0;
}

.modal-content {
  padding: 16px;
  position: relative;
}

.modal-header {
  text-align: right;
}

.modal .close {
  display: block;
  width: 36px;
  height: 36px;
  font-size: 36px;
  border-radius: 50%;
  line-height: 36px;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  position: absolute;
  top: 20px;
  right: 40px;
  cursor: pointer;
}

.modal input {
  width: 100%;
  border: none;
  padding: 20px 40px 20px 20px;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;
  margin-bottom: 0;
  background: rgba(103, 114, 229, 1);
  color: #ffffff;
  outline: none;
}

.modal input::placeholder {
  color: #ffffff;
  opacity: 0.6;
}

.modal-content {
  color: #ffffff;
}

.modal-content span.enter {
  font-size: 20px;
  color: #ffffff;
  position: absolute;
  bottom: 27px;
  right: 34px;
}
</style>
