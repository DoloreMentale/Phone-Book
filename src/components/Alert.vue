<template>
  <div v-if="alert.isShown"
       class="alert alert-secondary shadow border-none d-flex justify-content-between align-items-center p-2"
       role="alert">
    <small class="font-weight-bold">{{ alert.msg }}</small>
    <div class="d-flex">
      <button
          v-if="alert.msg === 'Вы действительно хотите выйти?'"
          v-on:click.prevent="logOut"
          type="submit"
          class="btn btn-outline-secondary btn-sm m-1">Подтвердить
      </button>
      <button
          v-if="alert.msg === 'Вы действительно хотите удалить контакт?'"
          v-on:click.prevent="deleteContact"
          type="submit"
          class="btn btn-outline-secondary btn-sm m-1">Подтвердить
      </button>

      <button
          v-if="alert.msg === 'Вы действительно хотите сохранить контакт?'"
          v-on:click.prevent="saveEditedContact"
          type="submit"
          class="btn btn-outline-secondary btn-sm m-1">Подтвердить
      </button>

      <button
          v-on:click.prevent="cleanUpAlert"
          type="submit"
          class="btn btn-outline-secondary btn-sm m-1">Отменить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Alert",
  computed: {
    alert() {
      return this.$store.getters.getAlertState
    },

    indexState() {
      return this.$store.getters.getIndexState
    },

    contactsList() {
      return this.$store.getters.getContactsListState
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('logOut')
      this.$store.dispatch('showForm', false)
      this.cleanUpAlert()
    },

    deleteContact() {
      this.$store.dispatch('deleteContact', this.indexState)
      this.cleanUpAlert()
    },

    saveEditedContact() {
      this.$store.dispatch('saveEditedContact', this.contactsList[this.indexState])
      this.$store.dispatch('editContact', false)
      this.cleanUpAlert()
    },

    cleanUpAlert() {
      this.$store.dispatch('cleanUpAlert')
    }
  }
}
</script>

<style scoped>

</style>
