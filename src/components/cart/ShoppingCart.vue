<template>
  <v-card
      class="mb-5 pa-4"
      min-width="100%"
      outlined
      style="background-color: #f8f9fa; box-shadow: 0px 0px 5px 0px #ccc"
  >
    <div class="d-flex">
      <div class="d-flex flex-column justify-center">
        <v-card-title class="pt-0">
          {{ product.title }}
        </v-card-title>

        <v-card-subtitle>
          ${{ product.price }}€
        </v-card-subtitle>

        <v-card-subtitle>
          Anzahl: {{ product.quantity }}
        </v-card-subtitle>

        <v-btn
            class="ml-4"
            color="error"
            outlined
            small
            style="width: 140px"
            @click="removeProductFromCart(product)"
        >
          entfernen
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
/* eslint-disable */
import products from '@/store/modules/products';
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  props: {
    product: Object,
  },

  computed: {
    ...mapGetters('cart', {
      products: 'cartProducts',
    }),

    ...mapState('cart', {
      checkoutStatus: state => state.checkoutStatus
    }),
  },

  methods: {
    ...mapActions({
      removeProductFromCart: 'cart/removeProductFromCart'
    }),
  }
}
</script>

<style scoped>

</style>
