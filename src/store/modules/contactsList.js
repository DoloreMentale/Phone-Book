export default {
    actions: {
        showForm(context, payload) {
            context.commit('showForm', payload)
        },

        addContact(context, payload) {
            context.commit('addContact', payload)

            payload.name = ''
            payload.phone = ''
            payload.info = ''

            context.commit('saveToLS')
        },

        deleteContact(context, payload) {
            context.commit('deleteContact', payload)
            context.commit('saveToLS')
        },

        editContact(context, payload) {
            context.commit('editContact', payload)
        },

        saveEditedContact(context, payload) {
            context.commit('saveEditedContact', payload)
            context.commit('saveToLS')
        },

        setIndex(context, payload) {
            context.commit('setIndex', payload)
        },

        contactsListLS(context) {
            context.commit('contactsListLS')
        }
    },
    mutations: {
        showForm(state, payload) {
            state.form.show = payload
        },

        addContact(state, payload) {
            let newContact = {
                name: payload.name,
                phone: payload.phone,
                info: payload.info
            }
            state.contactsList.push(newContact)
        },

        deleteContact(state, payload) {
            state.contactsList.splice(payload, 1)
        },

        setIndex(state, payload) {
            state.index = payload
        },

        editContact(state, payload) {
            state.form.edit = payload
        },

        saveEditedContact(state, payload) {
            state.contactsList.splice(state.index, 1, payload)
        },

        // LS = localStorage //
        saveToLS(state) {
            const parsed = JSON.stringify(state.contactsList);
            localStorage.setItem('contactsList', parsed);
        },

        contactsListLS(state) {
            if (localStorage.getItem('contactsList')) {
                try {
                    state.contactsList = JSON.parse(localStorage.getItem('contactsList'));
                } catch (e) {
                    localStorage.removeItem('contactsList');
                }
            }
        },
    },
    state: {
        contactsList: [
            {
                name: 'Леонид',
                phone: '+79967415027',
                info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
            },
            {
                name: 'Павел',
                phone: '+79372136895',
                info: 'Ut metus sapien, feugiat vitae rutrum ut, ultricies eget tortor'
            }],

        form: {
            show: false,
            edit: false
        },

        index: null
    },
    getters: {
        getFormState(state) {
            return state.form
        },

        getContactsListState(state) {
            return state.contactsList
        },

        getIndexState(state) {
            return state.index
        }
    }
}
