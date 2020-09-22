<template>
  <div class="app">
    <b-form-group
      v-for="(input, index) in inputsMeta"
      :key="index"
      :label="input.label"
    >
      <b-form-input
        v-model="$v.form[input.key].$model"
        :placeholder="input.placeholder"
        :state="validateField(input.key)"
        :disabled="!editableState"
        @focus="onFocusField(input.key)"
        @blur="onBlurField(input.key)"
      />
      <div
        v-if="!focus[input.key] && blur[input.key] !== null && editableState"
      >
        <div v-if="!$v.form[input.key].required" class="error-validation">
          * - required to fill input
        </div>
      </div>
    </b-form-group>
    <div v-if="!editableState">
      <b-btn variant="primary" @click="startEdit()"> Edit </b-btn>
    </div>
    <div v-else>
      <b-btn
        :disabled="isDisabledSaveButton"
        variant="success"
        @click="saveUserDetails()"
      >
        Save
      </b-btn>
      <b-btn variant="danger" @click="cancelEdit()"> Cancel </b-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex"

export default {
  name: "ValidationComponent",
  props: {
    vuexModule: {
      type: String,
      default: "",
    },
    vuexState: {
      type: String,
      default: "",
    },
    formFields: {
      type: Object,
      default() {
        return {}
      },
    },
    focusFields: {
      type: Object,
      default() {
        return {}
      },
    },
    blurFields: {
      type: Object,
      default() {
        return {}
      },
    },
    validationFields: {
      type: Object,
      default() {
        return {}
      },
    },
    inputsMeta: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      form: {
        ...this.formFields,
      },
      focus: {
        ...this.focusFields,
      },
      blur: {
        ...this.blurFields,
      },
    }
  },
  validations() {
    return {
      ...this.validationFields,
    }
  },
  computed: {
    ...mapState({
      watchingState(state) {
        return state[this.vuexModule][this.vuexState]
      },
      editableState(state) {
        return state[this.vuexModule].editable
      },
    }),
    /*
     ** Если одно поле невалидное - возвращаем false, далее чтобы срабатывал эффект disable ставим знак логического отрицания
     ** Допустим, let isFieldsValid = true (все поля валидны, значит кнопка должна быть активна) --> !isFieldsValid
     ** Иначе, let isFieldsValid = false (какое-то поле невалидно, значит кнопка должна быть неактивна) --> !isFieldsValid
     */
    isDisabledSaveButton() {
      let arrayOfValues = Object.keys(this.form).map((e) =>
        this.validateField(e)
      ) // [true, true, true, false, null] for example
      let isFieldsInvalid =
        (arrayOfValues.includes(null) || arrayOfValues.includes(false)) &&
        this.editableState
      return isFieldsInvalid
    },
  },
  watch: {
    /*
     **  После того, как наш асинхронный action изменил объект userDetails, мы обновляем данные из поля data в нашел компоненте.
     **  На каждой итерации мы выполняем следующие действия:
     **  1) устанавливаем актуальное значение в поле data
     **  2) программно делаем фокус на инпут
     **  3) программно делаем блюр на инпут
     **  Если не делать шаг номер 2 и 3, тогда при нажатии кнопки "Edit" не будет видно валидации полей
     */
    watchingState(newValue) {
      for (let [key, value] of Object.entries(newValue)) {
        this.setField(key, value)
        this.onFocusField(key)
        this.onBlurField(key)
      }
    },
  },
  created() {
    this.$emit("getData")
  },
  methods: {
    ...mapMutations({
      SET_EDITABLE_STATE(commit, payload) {
        commit(`${this.vuexModule}/SET_EDITABLE_STATE`, payload)
      },
    }),
    /*
     ** Установка значений из модуля `@/store/user.js`
     */
    setField(key, value) {
      this.form[key] = value
    },
    /*
     ** При фокусе на инпут не показываем пользователю валидации
     */
    onFocusField(key) {
      this.focus[key] = true
      this.blur[key] = null
    },
    /*
     ** При блюре с инпута показываем прошла валидация или нет
     */
    onBlurField(key) {
      if (!this.$v.form[key].$invalid) {
        this.focus[key] = false
        this.blur[key] = true
      } else {
        this.focus[key] = false
        this.blur[key] = false
      }
    },
    /*
     ** Если нет режима редактирования - игнорируем все валидации
     ** Иначе если блюр эффект сработал и поле валидное, тогда возвращаем true
     */
    validateField(key) {
      if (!this.editableState) {
        return null
      } else {
        return this.blur[key] && !this.$v.form[key].$invalid
      }
    },
    /*
     ** Первым параметром указываем объект в поле data
     ** Вторым параметром указываем значение, которое мы хотим присвоить всем полям объекта
     */
    parseObject(object, value) {
      for (let element in object) {
        object[element] = value
      }
    },
    /*
     ** Сбрасываем до начального состояния все поля из объектов this.blur и this.focus
     */
    refreshUserActions() {
      this.parseObject(this.blur, null)
      this.parseObject(this.focus, false)
    },
    /*
     **  Отмена редактирования
     */
    cancelEdit() {
      this.SET_EDITABLE_STATE(false)
      this.$emit("getData")
      this.refreshUserActions()
    },
    /*
     ** Начало редактирования
     */
    startEdit() {
      this.SET_EDITABLE_STATE(true)
    },
    /*
     ** Сохранить пользовательские данные
     */
    saveUserDetails() {
      this.SET_EDITABLE_STATE(false)
      this.$emit("saveData", { ...this.form })
      this.refreshUserActions()
    },
  },
}
</script>

<style lang="css">
.error-validation {
  color: #dc3545;
}
</style>
