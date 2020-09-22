<template>
  <div>
    <validationComponent
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
