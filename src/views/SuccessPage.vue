<template>
  <div>
    <Header />
    <PopularProducts />
    <Placeholder />
    <Footer />
  </div>
</template>
<script>
/* eslint-disable */
import axios from 'axios';
import Header from '@/components/home/Header.vue'
import PopularProducts from '@/components/home/PopularProducts.vue'
import Placeholder from '@/components/home/Placeholder.vue'
import Footer from '@/components/home/Footer.vue'
import {mapState, mapGetters} from 'vuex'

export default {
    components: {
        Header,
        PopularProducts,
        Placeholder,
        Footer,
    },
    mounted() {
        this.updateInventory();
        setTimeout(() => { 
            alert("Zahlung erfolgreich!")
        }, 100)
    },

    computed: {
        ...mapGetters('cart', {
            cartProducts: 'cartProducts',
        }),
        ...mapState({
            products: state => state.products.items
        }),
    },

    methods: {
        updateInventory() {
            
            this.cartProducts.forEach(cartProduct => {
                this.products.forEach(product => {
                    if (cartProduct.id === product.id) {
                        console.log(product.id);
                        console.log(product.inventory);

                        // axios.put(`https://ivm108.informatik.htw-dresden.de/ewa/g17/php-backend/update.php`, product)
                    }
                });
            });

            // Error (funktioniert leider nicht!)
            localStorage.clear();

            this.$store.commit('cart/initCart');
            this.$store.commit('products/initStore')

        }
    }
}
</script>