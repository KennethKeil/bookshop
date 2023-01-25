/* eslint-disable */
export default {
    namespaced: true,

    state: {
        items: {}
    },

    getters: {
        order(state) {
            const order = state.items
            return {
                name: order.name,
                street: order.street,
                zip: order.zip,
                city: order.city,
            };
        },
    },

    mutations: {

        initOrder(state, order) {
            state.items = order
            localStorage.setItem('order', JSON.stringify(state.items))
        }


    },

    actions: {}
}