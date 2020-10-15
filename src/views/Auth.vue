<template>
  <section class="bg-light bg-gradient d-flex justify-content-center align-items-center">
    <div class="container-fluid">
      <div class="row m-1 justify-content-center">
        <div
            class="col-sm-8 col-md-6 col-xl-4 d-flex flex-column align-self-center m-3 p-5 bg-white bg-gradient rounded shadow">

          <h5 class="text-center font-weight-bold mb-3">Вход</h5>

          <form>
            <div class="input-group mb-3">
              <span class="input-group-text d-none d-sm-block" id="email">email</span>
              <input
                  v-model="user.email"
                  type="email"
                  class="form-control"
                  placeholder="Введите вашу почту"
                  aria-label="email"
                  aria-describedby="email"
                  required>
            </div>

            <div class="input-group mb-3">
              <input
                  v-model="user.name"
                  type="password"
                  class="form-control"
                  placeholder="Введите ваше имя"
                  aria-label="username"
                  aria-describedby="username"
                  required>
              <span class="input-group-text d-none d-sm-block" id="username">username</span>
            </div>

            <p class="small text-danger" v-if="errorMsgState !== null"><strong>{{ errorMsgState }}</strong></p>

            <button
                v-if="user.email !== '' && user.name !== ''"
                type="submit"
                v-on:click.prevent="logIn"
                class="btn btn-outline-secondary d-flex ml-auto">Войти
            </button>

            <hr>

            <p class="text-muted small">
              <strong>Подсказка</strong>: в поле <strong>email</strong> нужно ввести <strong>почту
              пользователя</strong>, в <strong>username</strong> - <strong>имя</strong>.
              Список активных пользователей доступен в списке справа
            </p>

          </form>
        </div>

        <div class="col-sm-6 col-md-5 col-xl-3 m-3 p-4 bg-white bg-gradient rounded shadow">

          <h5 class="text-center font-weight-bold mb-3">Список активных пользователей</h5>

          <ul v-for="user in userListState" :key="user.id">
            <li class="d-flex flex-column">
              <strong>{{ user.username }}</strong>
              <small>{{ user.email }}</small>
            </li>
          </ul>

        </div>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Auth",
  data() {
    return {
      user: {
        email: '',
        name: ''
      }
    }
  },
  computed: {
    userListState() {
      return this.$store.getters.getUserListState
    },

    errorMsgState() {
      return this.$store.getters.getErrorState
    },

    isLoggedState() {
      return this.$store.getters.getIsLoggedState
    }
  },
  mounted() {
    this.$store.dispatch('getUserList')
  },
  methods: {
    logIn() {
      this.$store.dispatch('logIn', this.user)
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if (vm.isLoggedState) {
        next('/home')
      } else {
        next('/')
      }
    })
  }
}
</script>

<style scoped>

</style>
