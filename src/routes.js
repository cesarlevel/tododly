import Board from "./components/Board.vue";
import BoardList from "./components/BoardList.vue";

export const routes = [
  { path: "/", redirect: "/boards/" },
  {
    name: "boardList",
    path: "/boards/",
    component: BoardList
  },
  {
    name: "boards",
    path: "/boards/:index",
    component: Board
  },
  {
    redirect: "/boards/",
    path: "*"
  }
];
