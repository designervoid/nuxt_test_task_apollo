<template>
  <div>
    <ValidationComponent
      vuex-module="user"
      vuex-state="userDetails"
      :form-fields="{ name: '', lastName: '' }"
      :focus-fields="{ name: false, lastName: false }"
      :blur-fields="{ name: null, lastName: null }"
      :validation-fields="{
        form: {
          name: { required: validateHelpers.required },
          lastName: { required: validateHelpers.required },
        },
      }"
      :inputs-meta="[
        {
          label: 'Your Name:',
          key: 'name',
          placeholder: 'Enter name',
        },
        {
          label: 'Your Last Name:',
          key: 'lastName',
          placeholder: 'Enter last name',
        },
      ]"
      @getData="getUserDetails"
      @saveData="saveUserDetails"
    />
  </div>
</template>

<script>
import ValidationComponent from "@/components/ValidationComponent"
import { required } from "vuelidate/lib/validators"
import { mapState, mapActions, mapMutations } from "vuex"

export default {
  name: "User",
  components: {
    ValidationComponent,
  },
  data() {
    return {
      validateHelpers: {
        required: required,
      },
    }
  },
  computed: {
    ...mapState("user", ["editable"]),
  },
  methods: {
    ...mapActions("user", ["getUserDetails", "saveUserDetails"]),
    ...mapMutations("user", ["SET_EDITABLE_STATE"]),
  },
  beforeRouteLeave(to, from, next) {
    if (this.editable) {
      // если пользователь подтверждает переход, тогда позволяем ему перейти на другую страницу
      let agreement = confirm(
        "Data from this page will not save. Are you sure you want to leave this page?"
      )
      if (agreement) {
        this.SET_EDITABLE_STATE(false)
        next()
      }
    } else {
      next()
    }
  },
}
</script>
