<template>
  <div class="page">
    Добро пожаловать в тестовый ЛК
    {{ userDetails }}
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
export default {
  name: "HomePage",
  computed: {
    ...mapState("user", ["userDetails"]),
  },
  created() {
    this.getUserDetails();
  },
  methods: {
    ...mapActions("user", ["getUserDetails"]),
  }
}
</script>
