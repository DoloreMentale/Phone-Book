export default {
    actions: {
        showAlertOption(context, payload) {
            context.commit('showAlertOption', payload)
        },

        cleanUpAlert(context) {
            context.commit('cleanUpAlert')
        }
    },
    mutations: {
        showAlertOption(state, payload) {
            state.alert.isShown = true
            state.alert.msg = payload
        },

        cleanUpAlert(state) {
            state.alert.isShown = false
            state.alert.msg = ''
        }
    },
    state: {
        alert: {
            msg: '',
            isShown: false
        }
    },
    getters: {
        getAlertState(state) {
            return state.alert
        }
    }
}
