/* eslint-disable */
export default {
    namespaced: true,

    state: {
        items: []
    },

    getters: {
        order(state) {
            return state.items;
        },
    },

    mutations: {
        initOrder(state, order) {
            state.items.push({
                name: order.name,
                street: order.street,
                zip: order.zip,
                city: order.city
            });

            console.log(state.items);
        }
    },

    actions: {

    }
}