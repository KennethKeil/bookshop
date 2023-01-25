<template>
  <v-container>
    <v-row>
      <v-col lg="4" offset-lg="2" offset-md="2" sm="8">
        <div>
          <h2>Bestellübersicht</h2>
          <v-row
              v-for="product in products" :key="product.id"
          >
            <ShoppingCart :product="product"/>
          </v-row>
        </div>
      </v-col>
      <v-col md="3" order="first" order-sm="last" sm="4">
        <div>
          <CheckoutBox/>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */
import ShoppingCart from '@/components/cart/ShoppingCart.vue'
import CheckoutBox from '@/components/cart/CheckoutBox.vue'
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  components: {
    ShoppingCart,
    CheckoutBox,
  },

  computed: {
    ...mapGetters('cart', {
      products: 'cartProducts',
    }),
  },
}
</script>

<style scoped>
h2 {
  margin-top: 24px;
  margin-bottom: 32px;
}
</style>