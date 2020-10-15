import axios from 'axios'
import router from "@/router";

export default {
    actions: {
        async getUserList(context) {
            const API_URL = 'https://jsonplaceholder.typicode.com/users'
            await axios.get(API_URL)
                .then(r => {
                    console.log(r.data)
                    context.commit('setUserList', r.data)
                })
        },

        logIn(context, payload) {
            context.commit('getUserInput', payload)
        },

        logOut(context) {
            context.commit('logOut')
        },

        isLoggedLS(context) {
            context.commit('isLoggedLS')
        }
    },
    mutations: {
        setUserList(state, payload) {
            state.userList = payload
        },

        getUserInput(state, payload) {
            for (let i = 0; state.userList.length > i; ++i) {
                if (payload.email === state.userList[i].email) {
                    if (payload.name === state.userList[i].username) {
                        state.isLogged = true
                        state.errorMsg = ''
                        const parsed = JSON.stringify(state.isLogged);
                        localStorage.setItem('isLogged', parsed);
                        router.push('/home')
                        return
                    }
                } else {
                    state.errorMsg = 'Вы ввели неверный email/username'
                }
            }
        },

        // LS = localStorage //
        isLoggedLS(state) {
            if (localStorage.getItem('isLogged')) {
                try {
                    state.isLogged = JSON.parse(localStorage.getItem('isLogged'));
                } catch (e) {
                    localStorage.removeItem('isLogged');
                }
            }
        },

        logOut(state) {
            localStorage.removeItem('isLogged')
            state.isLogged = false
            router.push('/')
        }
    },
    state: {
        userList: null,
        errorMsg: '',
        isLogged: false
    },
    getters: {
        getUserListState(state) {
            return state.userList
        },

        getErrorState(state) {
            return state.errorMsg
        },

        getIsLoggedState(state) {
            return state.isLogged
        }
    }
}
