<template>
    <v-card outlined>
        <v-card-title>Payment Details</v-card-title>

        <v-card-text>
            <p>Total: ${{total}}</p>
            <stripe-checkout
              ref="checkoutRef"
              mode="payment"
              :pk="publishableKey"
              :line-items="lineItems"
              :success-url="successURL"
              :cancel-url="cancelURL"
              @loading="v =>loading = v"
            />
            <v-btn color="primary" @click="submit">Checkout</v-btn>
        </v-card-text>
    </v-card>
</template>

<script>
  import {StripeCheckout} from '@vue-stripe/vue-stripe'
  import {mapState, mapGetters, mapActions} from 'vuex'
  export default {
    components:{
      StripeCheckout
    },
    data() {
      this.publishableKey = "pk_test_51MTY23AY66r0SMmOkTcIxapEM39UMngZijrH1DWtscD2zuLlpiXMOS9KVhZnJPNFRMVGZ1GgBEOKsEIqspVRKx6700nFiXJd1Z"
      return {
        loading: false,
        lineItems: [],
        successURL: 'http://localhost:8080/success',
        cancelURL: 'http://localhost:8080/error'
      }
    },

    computed: {
      ...mapGetters('cart', {
        products: 'cartProducts',
        total: 'cartTotal'
      }),

      ...mapState('cart', {
        checkoutStatus: state => state.checkoutStatus
      })
    },
    created() {
      this.products.forEach(product => {
        this.lineItems.push({
          price: product.priceid,
          quantity: product.quantity
        })
      })
    },

    methods: {
      ...mapActions('cart', ['checkout']),
      submit(){
        this.$refs.checkoutRef.redirectToCheckout({items: this.lineItems})
      }
    }
  }
</script>

<style scoped>

</style>