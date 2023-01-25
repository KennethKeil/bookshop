<template>
  <v-card class="c-box" outlined style="background-color: #f8f9fa; box-shadow: 0px 0px 5px 0px #ccc">
    <v-card-title>Bezahl Details</v-card-title>

    <v-card-text>
      <p>Total: ${{ total }}</p>
      <v-text-field v-model="name" :error-messages="nameErrors" label="Name"/>
      <v-text-field v-model="street" :error-messages="streetErrors" label="Straße und Nr."/>
      <v-text-field v-model="zip" :error-messages="zipErrors" label="PLZ"/>
      <v-text-field v-model="city" :error-messages="cityErrors" label="Stadt"/>
      <!--<button @click="displayOrder">Display Order</button>-->
      <stripe-checkout
          ref="checkoutRef"
          :cancel-url="cancelURL"
          :line-items="lineItems"
          :pk="publishableKey"
          :success-url="successURL"
          mode="payment"
          @loading="v =>loading = v"
      />
      <v-btn :disabled="!validForm" class="pay-button" color="primary" @click="submit">bezahlen</v-btn>
    </v-card-text>
  </v-card>
</template>
<script>
/* eslint-disable */
import {StripeCheckout} from '@vue-stripe/vue-stripe'
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  components: {
    StripeCheckout
  },
  data() {
    this.publishableKey = "pk_test_51MTY23AY66r0SMmOkTcIxapEM39UMngZijrH1DWtscD2zuLlpiXMOS9KVhZnJPNFRMVGZ1GgBEOKsEIqspVRKx6700nFiXJd1Z"

    return {
      loading: false,

      // order attributes
      order: {
        name: '',
        street: '',
        zip: '',
        city: '',
      },

      name: '',
      street: '',
      zip: '',
      city: '',

      // input validations
      nameErrors: [],
      streetErrors: [],
      zipErrors: [],
      cityErrors: [],

      lineItems: [],
      // successURL: 'http://localhost:8080/success',
      successURL: 'https://ivm108.informatik.htw-dresden.de/ewa/g17/shop/success',
      // cancelURL: 'http://localhost:8080/error',
      cancelURL: 'https://ivm108.informatik.htw-dresden.de/ewa/g17/shop/error',
    }
  },

  computed: {
    ...mapGetters('cart', {
      products: 'cartProducts',
      total: 'cartTotal'
    }),

    ...mapState('cart', {
      checkoutStatus: state => state.checkoutStatus
    }),
    validForm() {
      this.nameErrors = []
      this.streetErrors = []
      this.zipErrors = []
      this.cityErrors = []
      if (!this.name) {
        this.nameErrors.push('Name is required')
      }
      if (/\d/.test(this.name)) {
        this.nameErrors.push('Name should not contain any digits')
      }
      if (!this.street) {
        this.streetErrors.push('Street is required')
      }
      if (!this.zip) {
        this.zipErrors.push('Zip is required')
      }
      if (this.zip && this.zip.length !== 5) {
        this.zipErrors.push('Zip should be 5 characters long')
      }
      if (!this.city) {
        this.cityErrors.push('City is required')
      }
      return !this.nameErrors.length && !this.streetErrors.length && !this.zipErrors.length && !this.cityErrors.length;
    }
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
    submit() {

      this.order.name = this.name;
      this.order.street = this.street;
      this.order.zip = this.zip;
      this.order.city = this.city;

      this.$store.commit('order/initOrder', this.order)
      this.$refs.checkoutRef.redirectToCheckout({items: this.lineItems})
    },
  }
}
</script>

<style scoped>
.pay-button {
  padding: 30px 20px;
  margin: 10px;
}

.c-box {
  margin-top: 10px;
}
</style>