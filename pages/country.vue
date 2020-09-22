<template>
  <div>
    <validationComponent
      vuex-module="user"
      vuex-state="userDetails"
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
        }
      ]"
    />
  </div>
</template>

<script>
import validationComponent from "@/components/validationComponent"
import { required } from "vuelidate/lib/validators"

export default {
  name: "Test",
  components: {
    validationComponent,
  },
  data() {
    return {
      validateHelpers: {
        required: required,
      },
    }
  },
}
</script>
