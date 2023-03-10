/* eslint-disable */
import shop from "@/api/shop";

export default {
    namespaced: true,

    state: {
        // {id, quantity}
        items: [],
        checkoutStatus: null
    },

    getters: {
        cartProducts(state, getters, rootState, rootGetters) {
            return state.items.map(cartItem => {
                const product = rootState.products.items.find(product => product.id === cartItem.id)
                return {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity,
                    priceid: product.priceid,
                }
            })
        },

        cartTotal(state, getters) {
            return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)
        },
    },

    mutations: {
        initCart(state) {
            if (localStorage.getItem('carts')) {
                state.items = JSON.parse(localStorage.getItem('carts'))
            }
        },
        clearCart(state) {
            state.items = []
        },

        pushProductToCart(state, productId) {
            state.items.push({
                id: productId,
                quantity: 1
            })
        },

        removeProductById(state, productId) {
            state.items = state.items.filter(function (obj) {
                return obj.id !== productId;
            });
        },

        incrementItemQuantity(state, cartItem) {
            cartItem.quantity++
        },

        decrementItemQuantity(state, cartItem) {
            cartItem.quantity--
        },

        setCheckoutStatus(state, status) {
            state.checkoutStatus = status
        },

        emptyCart(state) {
            state.items = []
        }
    },

    actions: {
        addProductToCart({state, getters, commit, rootState, rootGetters}, product) {
            if (rootGetters['products/productIsInStock'](product)) {
                const cartItem = state.items.find(item => item.id === product.id)
                if (!cartItem) {
                    commit('pushProductToCart', product.id)
                } else {
                    commit('incrementItemQuantity', cartItem)
                }
                commit('products/decrementProductInventory', product, {root: true})
                localStorage.setItem('carts', JSON.stringify(state.items))
            }
        },

        removeProductFromCart({state, getters, commit, rootState, rootGetters}, product) {
            const cartItem = state.items.find(item => item.id === product.id)
            if (cartItem.quantity == 1) {
                commit('removeProductById', product.id)
            } else {
                commit('decrementItemQuantity', cartItem)
            }
            commit('products/incrementProductInventory', product, {root: true})
            localStorage.setItem('carts', JSON.stringify(state.items))
        },

        checkout({state, commit}) {
            const cartItems = state.items;
            localStorage.setItem('carts', JSON.stringify(state.items))
            console.log(cartItems);
        },
    }
}
