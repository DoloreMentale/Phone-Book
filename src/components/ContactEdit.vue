<template>
  <form>
    <div class="input-group mb-3">
      <span class="input-group-text d-none d-sm-block" id="name">имя</span>
      <input
          v-model="contactsList[indexState].name"
          type="text"
          class="form-control"
          placeholder="Введите имя"
          aria-label="name"
          aria-describedby="name">
    </div>

    <div class="input-group mb-3">
      <input
          v-model="contactsList[indexState].phone"
          type="text"
          class="form-control"
          placeholder="Введите номер"
          aria-label="phone"
          aria-describedby="phone"
          required>
      <span class="input-group-text d-none d-sm-block" id="phone">номер*</span>
    </div>

    <div class="input-group mb-3">
      <span class="input-group-text d-none d-sm-block" id="info">доп. информация</span>
      <textarea
          v-model="contactsList[indexState].info"
          type="text"
          class="form-control"
          placeholder="Введите информацию о контакте"
          aria-label="info"
          aria-describedby="info">
      </textarea>
    </div>

    <div class="col-sm-12 my-2 d-flex flex-row justify-content-center align-items-center">
      <button
          v-on:click.prevent="editContact"
          class="btn btn-outline-secondary rounded-btn shadow m-2"
          type="button">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle-fill" fill="currentColor"
             xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
        </svg>
      </button>

      <button
          v-on:click.prevent="editContactAlert"
          class="btn btn-outline-secondary rounded-btn shadow m-2">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-check-fill"
             fill="currentColor"
             xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
                d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9.854-2.854a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
        </svg>
      </button>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="col-sm-12 text-center">
          <strong>
            {{ contactsList[indexState].name }}
          </strong>

          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"/>
            <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            <path fill-rule="evenodd"
                  d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
          </svg>

          {{ contactsList[indexState].phone }}
        </div>

        <div class="col-sm-12 text-muted text-center">
          {{ contactsList[indexState].info }}
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "ContactEdit",
  computed: {
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
    editContactAlert() {
      this.$store.dispatch('showAlertOption', 'Вы действительно хотите сохранить контакт?')
    },

    editContact() {
      this.$store.dispatch('editContact', false)
    }
  }
}
</script>

<style scoped>
button {
  border-radius: 25px;
}
</style>
