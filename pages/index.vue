<template>
  <div class="page">
    Добро пожаловать в тестовый ЛК
    {{ userDetails }}
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "HomePage",
  computed: {
    ...mapState("user", ["userDetails"]),
  },
}
</script>
