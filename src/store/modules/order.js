/* eslint-disable */
export default {
    namespaced: true,

    state: {
        items: {},
    },

    mutations: {
        init(state, name, street, zip, city) {
            state.items.name = name
            state.items.street = street
            state.items.zip = zip
            state.items.city = city
        }
    },

    actions: {
        getOrder({state}) {
            return state.items;
        }
        ,
        setOrder(state) {
            state.items.name = 'Kenneth';
            state.items.street = 'Musterstr. 1';
            state.items.zip = '01234';
            state.items.city = 'Muster';

            console.log(state.items.name);
            console.log(state.items.street);
            console.log(state.items.zip);
            console.log(state.items.city);
        }
        ,
    }
    ,
}
;