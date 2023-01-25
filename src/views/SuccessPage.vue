<template>
  <div>
    <Header/>
    <PopularProducts/>
    <Placeholder/>
    <Footer/>
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
    this.updateState();
    setTimeout(() => {
      alert("Zahlung erfolgreich!")
    }, 100)
  },

  computed: {
    ...mapGetters('cart', {
      cartProducts: 'cartProducts',
    }),
    ...mapState({
      products: state => state.products.items,
    }),
  },

  methods: {
    async updateState() {

      this.cartProducts.forEach(cartProduct => {
        this.products.forEach(product => {
          if (cartProduct.id === product.id) {

            axios.put(`https://ivm108.informatik.htw-dresden.de/ewa/g17/php-backend/update.php`, product)
                .then(results => {
                  console.log(localStorage.getItem('order'))
                  console.log("Test Data inside order:");
                  //console.log(this.$store.state.order);//
                  //console.log(this.order);
                  axios.post(`https://ivm108.informatik.htw-dresden.de/ewa/g17/php-backend/create.php`, JSON.parse(localStorage.getItem('order')))
                  localStorage.clear()
                  this.$store.commit('cart/clearCart');
                  this.$store.commit('products/initStore')
                })

          }
        });
      });


    }
  }
}


</script>