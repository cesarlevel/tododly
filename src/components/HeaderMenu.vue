<template>
  <div>
    <div class="logo" @click="goHome">
      <div class="bar td"></div>
      <div class="bar in"></div>
      <div class="bar done"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderMenu",
  data() {
    return {};
  },
  computed: {
    route() {
      return this.$route.name;
    }
  },
  methods: {
    goHome() {
      this.$router.push({ name: "boardList" });
    }
  }
};
</script>
