<template>
  <div class="app">
    <b-form-group  label="Your Name:">
      <b-form-input
        v-model="$v.form.name.$model"
        placeholder="Enter name"
        :state="validateField('name')"
        :disabled="!editable"
        @focus="onFocusField('name')"
        @blur="onBlurField('name')"
      ></b-form-input>
      <div v-if="!focus.name && blur.name !== null && editable">
        <div v-if="!$v.form.name.required" class="is-required-validation">
          * - required to fill input
        </div>
      </div>
    </b-form-group>
    <b-form-group label="Your Last Name:">
      <b-form-input
        v-model="$v.form.lastName.$model"
        placeholder="Enter Last Name"
        :state="validateField('lastName')"
        :disabled="!editable"
        @focus="onFocusField('lastName')"
        @blur="onBlurField('lastName')"
      ></b-form-input>
      <div v-if="!focus.lastName && blur.lastName !== null && editable">
        <div v-if="!$v.form.lastName.required" class="is-required-validation">
          * - required to fill input
        </div>
      </div>
    </b-form-group>
    <div v-if="!editable">
      <b-btn variant="primary" @click="startEdit()">Edit</b-btn>
    </div>
    <div v-else>
      <b-btn :disabled="isDisabledSaveButton" variant="success" @click="saveUserDetails();">Save</b-btn>
      <b-btn variant="danger" @click="cancelEdit();">Cancel</b-btn>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import { required } from 'vuelidate/lib/validators';

  export default {
    name: 'PageUser',
    data() {
      return {
        form: {
          name: '',
          lastName:'',
        },
        focus: {
          name: false,
          lastName: false,
        },
        blur: {
          name: null,
          lastName: null,
        },
        editable: false
      }
    },
    validations: {
      form: {
        name: {
          required
        },
        lastName: {
          required
        }
      }
    },
    computed: {
      ...mapState('user', ['userDetails']),
      // если одно поле невалидное - возвращаем false, далее чтобы срабатывал эффект disable ставим знак логического отрицания
      // допустим, let isFieldsValid = true (все поля валидны, значит кнопка должна быть активна) --> !isFieldsValid
      // иначе, let isFieldsValid = false (какое-то поле невалидно, значит кнопка должна быть неактивна) --> !isFieldsValid
      isDisabledSaveButton() {
        let isFieldsValid = this.validateField('name') && this.validateField('lastName') && this.editable 
        return !(isFieldsValid)
      }
    },
    watch: {
      /* 
        После того, как наш асинхронный action изменил объект userDetails, мы обновляем данные из поля data в нашел компоненте.
        На каждой итерации мы выполняем следующие действия:
        1) устанавливаем актуальное значение в поле data
        2) программно делаем фокус на инпут
        3) программно делаем блюр на инпут
        Если не делать шаг номер 2 и 3, тогда при нажатии кнопки "Edit" не будет видно валидации полей
      */
      userDetails(newValue) {
        for (let [key, value] of Object.entries(newValue)) {
          this.setField(key, value);
          this.onFocusField(key);
          this.onBlurField(key);
        }
      },
    },
    created() {
      // имитируем асинхронный экшн, так как в конечном итоге action совершит мутацию объекта, который пришел в бэкенда
      this.SET_USER_DETAILS({
          name: '',
          lastName: ''
      })
    },
    methods: {
      ...mapMutations('user', ['SET_USER_DETAILS']),
      /*
        Установка значений из модуля @/store/user.js
      */
      setField(key, value) {
        this.form[key] = value;
      },
      /*
        При фокусе на инпут не показываем пользователю валидации
      */
      onFocusField(key) {
        this.focus[key] = true;
        this.blur[key] = null;
      },
      /*
        При блюре с инпута показываем прошла валидация или нет
      */
      onBlurField(key) {
        if (!this.$v.form[key].$invalid) {
          this.focus[key] = false;
          this.blur[key] = true;
        } else {
          this.focus[key] = false;
          this.blur[key] = false;
        }
      },
      validateField(key) {
        if (!this.editable) { // если нет режима редактирования - игнорируем все валидации
          return null;
        } else { // иначе если блюр эффект сработал и поле валидное, тогда возвращаем true
          return this.blur[key] && !this.$v.form[key].$invalid;
        }
      },
      /*
        Первым параметром указываем объект в поле data
        Вторым параметром указываем значение, которое мы хотим присвоить всем полям объекта
      */
      parseObject(object, value) {
        for (let element in object) {
          object[element] = value;
        }
      },
      /*
        Сбрасываем до начального состояния все поля из объектов this.blur и this.focus
      */
      refreshData() {
        this.parseObject(this.blur, null);
        this.parseObject(this.focus, false);
      },
      /*
        Отмена редактирования
      */
      cancelEdit() {
        this.editable = false;
        // this.getUserDetails();
        this.refreshData();
      },
      /*
        Начало редактирования
      */
      startEdit() {
        this.editable = true;
      },
      /*
        Сохранить пользовательские данные
      */
      saveUserDetails() {
        this.editable = false;
        // this.changeUserDetails(payload);
        this.refreshData();
      },
    },
    beforeRouteLeave (to, from, next) {
      if (this.editable) {
        // если пользователь подтверждает переход, тогда позволяем ему перейти на другую страницу
        let agreement = confirm('Data from this page will not save. Are you sure you want to leave this page?')
        if (agreement) {
          next()
        }
      } else {
        next()
      }
    }
  }
</script>

<style lang="css">
  .is-required-validation {
    color: #dc3545;
  }
</style>