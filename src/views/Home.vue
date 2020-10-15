<template>
  <section class="bg-light bg-gradient d-flex flex-column">
    <Alert/>
    <div class="container-fluid">
      <div class="row m-1 justify-content-center">
        <div
            class="col-sm-6 d-flex flex-column justify-content-center align-items-center bg-white bg-gradient rounded shadow m-3 p-3">

          <div class="d-flex justify-content-center align-items-center m-3">
            <h5 class="text-center font-weight-bold m-1">Личный Кабинет</h5>
            <button
                v-on:click="showForm"
                class="btn btn-outline-secondary rounded-btn shadow m-1">
              <svg width="1em"
                   height="1em"
                   viewBox="0 0 16 16"
                   class="bi bi-person-plus-fill"
                   fill="currentColor"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5-3a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
              </svg>
            </button>

            <button
                v-on:click.prevent="logOutAlert"
                class="btn btn-outline-secondary shadow rounded-btn m-1">
              <svg width="1em"
                   height="1em"
                   viewBox="0 0 16 16"
                   class="bi bi-door-closed-fill"
                   fill="currentColor"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M4 1a1 1 0 0 0-1 1v13H1.5a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2a1 1 0 0 0-1-1H4zm2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
              </svg>
            </button>
          </div>

          <div v-if="!form.show && contactsList.length === 0" class="d-flex justify-content-center m-3">
            <p class="font-weight-bold text-center">Вы не добавили ни одного контакта <br> Воспользуйтесь кнопкой
              <button
                  v-on:click="showForm"
                  class="btn btn-outline-secondary rounded-btn shadow m-1">
                <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16" class="bi bi-person-plus-fill"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                        d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5-3a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                </svg>
              </button>
              для добавления нового контакта
            </p>
          </div>

          <form
              v-if="form.show && !form.edit"
              class="m-3">
            <div class="input-group mb-3">
              <span class="input-group-text d-none d-sm-block" id="email">имя</span>
              <input
                  v-model="contactInput.name"
                  type="text"
                  class="form-control"
                  placeholder="Введите имя"
                  aria-label="name"
                  aria-describedby="name">
            </div>

            <div class="input-group mb-3">
              <input
                  v-model="contactInput.phone"
                  type="text"
                  class="form-control"
                  placeholder="Введите номер*"
                  aria-label="phone-number"
                  aria-describedby="phone-number"
                  required>
              <span class="input-group-text d-none d-sm-block" id="phone-number">номер*</span>
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text d-none d-sm-block" id="info">доп. информация</span>
              <textarea
                  v-model="contactInput.info"
                  type="text"
                  class="form-control"
                  aria-label="info"
                  placeholder="Введите информацию о контакте"
                  aria-describedby="info"/>
            </div>

            <div class="m-2 d-flex justify-content-end"><small class="text-muted">* данные поля обязательны к
              заполнению</small></div>

            <button
                v-if="contactInput.phone !== ''"
                v-on:click.prevent="addContact"
                type="submit"
                class="btn btn-outline-secondary d-flex">Добавить контакт
            </button>
          </form>

          <h5 v-if="contactsList.length !== 0 && !form.edit"><strong>Список контактов</strong></h5>
          <h5 v-if="form.edit"><strong>Отредактируйте контакт</strong></h5>
          <div v-if="!form.edit">
            <ul v-for="(item, index) in contactsList"
                :key="index"
                class="list-group list-group-flush m-2">
              <li class="list-group-item list-group-item-action">
                <div class="row">
                  <div class="col-10">
                    <div class="col-sm-12">
                      <strong>
                        {{ item.name }}
                      </strong>

                      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor"
                           xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"/>
                        <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        <path fill-rule="evenodd"
                              d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
                      </svg>

                      {{ item.phone }}
                    </div>

                    <div class="col-sm-8 text-muted">
                      {{ item.info }}
                    </div>
                  </div>
                  <div class="col-2">
                    <button
                        v-on:click.prevent="deleteAlert(index)"
                        class="btn btn-outline-secondary rounded-btn shadow m-1 d-flex mr-auto"
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Удалить контакт">
                      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-x-fill" fill="currentColor"
                           xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                              d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
                      </svg>
                    </button>

                    <button
                        v-on:click.prevent="editContact(index)"
                        v-if="!form.edit"
                        class="btn btn-outline-secondary rounded-btn shadow m-1 d-flex mr-auto"
                        data-toggle="tooltip"
                        data-placement="left"
                        type="button"
                        title="Редактировать контакт">
                      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-lines-fill"
                           fill="currentColor"
                           xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                              d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm2 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="col-sm-6">
            <ContactEdit v-if="form.edit"/>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Alert from "@/components/Alert";
import ContactEdit from "@/components/ContactEdit";

export default {
  name: "Home",
  data() {
    return {
      contactInput: {
        name: '',
        phone: '',
        info: '',
      }
    }
  },
  components: {ContactEdit, Alert},
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if (vm.isLogged) {
        next(true)
      } else {
        next('/')
      }
    })
  },
  computed: {
    isLogged() {
      return this.$store.getters.getIsLoggedState
    },

    form() {
      return this.$store.getters.getFormState
    },

    indexState() {
      return this.$store.getters.getIndexState
    },

    contactsList() {
      return this.$store.getters.getContactsListState
    }
  },
  methods: {
    logOutAlert() {
      this.$store.dispatch('showAlertOption', 'Вы действительно хотите выйти?')
    },

    deleteAlert(payload) {
      this.$store.dispatch('setIndex', payload)
      this.$store.dispatch('showAlertOption', `Вы действительно хотите удалить контакт?`)
    },

    showForm() {
      this.$store.dispatch('showForm', true)
    },

    addContact() {
      this.$store.dispatch('addContact', this.contactInput)
      this.$store.dispatch('showForm', false)
    },

    editContact(payload) {
      this.$store.dispatch('setIndex', payload)
      this.$store.dispatch('editContact', true)
      console.log(payload)
    }
  }
}
</script>

<style scoped>
.rounded-btn {
  border-radius: 30px;
}
</style>
