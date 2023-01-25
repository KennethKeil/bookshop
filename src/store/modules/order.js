/* eslint-disable */
export default {
    namespaced: true,

    state: {
        items: []
    },

    getters: {
        order(state, getters, rootState, rootGetters) {
            return state.items.map(item => {
                return {
                    name: item.name,
                    street: item.street,
                    zip: item.zip,
                    city: item.city    
                }
            })
        },
    },

    mutations: {
        initOrder(state, order) {
            state.items.name = order.name;
            state.items.street = order.street;
            state.items.zip = order.zip;
            state.items.city = order.city;

            console.log("Testpoint 2");

            console.log(state.items.name);
            console.log(state.items.street);
            console.log(state.items.zip);
            console.log(state.items.city);
        }
    },

    actions: {

    }
    ,
}
;