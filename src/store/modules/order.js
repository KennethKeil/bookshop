/* eslint-disable */
export default {
    namespaced: true,

    state: {
        items: {
            name: '',
            street: '',
            zip: '',
            city: '',
        },
    },

    mutations: {
        initOrder(state, name, street, zip, city) {
            state.items.name = name;
            state.items.street = street;
            state.items.zip = zip;
            state.items.city = city;

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