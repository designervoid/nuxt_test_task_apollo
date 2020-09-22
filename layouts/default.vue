<template>
  <b-container>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link class="nav-link" to="/">
Home
</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/user">
User
</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/country">
Country
</router-link>
      </li>
    </ul>
    <nuxt />
  </b-container>
</template>

<script>
export default {
  name: "Layout",
}
</script>
