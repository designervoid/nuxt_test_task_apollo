<template>
  <div>
    <ValidationComponent
      vuex-module="country"
      vuex-state="countryDetails"
      :form-fields="{ country: '' }"
      :focus-fields="{ country: false }"
      :blur-fields="{ country: null }"
      :validation-fields="{
        form: {
          country: { required: validateHelpers.required },
        },
      }"
      :inputs-meta="[
        {
          label: 'Your Country:',
          key: 'country',
          placeholder: 'Enter country',
        },
      ]"
    />
  </div>
</template>

<script>
import ValidationComponent from "@/components/ValidationComponent"
import { required } from "vuelidate/lib/validators"
import { mapState, mapMutations } from "vuex"

export default {
  name: "Country",
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
    ...mapState("country", ["editable"]),
  },
  methods: {
    ...mapMutations("country", ["SET_EDITABLE_STATE"]),
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
