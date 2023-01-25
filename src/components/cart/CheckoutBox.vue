<template>
    <v-card class="c-box" outlined style="background-color: #f8f9fa; box-shadow: 0px 0px 5px 0px #ccc">
        <v-card-title>Bezahl Details</v-card-title>

        <v-card-text>
            <p>Total: ${{total}}</p>
            <v-text-field label="Name" v-model="name" :error-messages="nameErrors" />
            <v-text-field label="Straße und Nr." v-model="street" :error-messages="streetErrors" />
            <v-text-field label="PLZ" v-model="zip" :error-messages="zipErrors" />
            <v-text-field label="Stadt" v-model="city" :error-messages="cityErrors" />
            <!--<button @click="displayOrder">Display Order</button>-->
            <stripe-checkout
              ref="checkoutRef"
              mode="payment"
              :pk="publishableKey"
              :line-items="lineItems"
              :success-url="successURL"
              :cancel-url="cancelURL"
              @loading="v =>loading = v"
            />
            <v-btn color="primary" class="pay-button" @click="submit" :disabled="!validForm">bezahlen</v-btn>
        </v-card-text>
    </v-card>
</template>
<script>
/* eslint-disable */
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

            // order attributes
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
            successURL: 'http://localhost:8080/success',
            // successURL: 'https://ivm108.informatik.htw-dresden.de/ewa/g17/shop/success',
            cancelURL: 'http://localhost:8080/error',
            // cancelURL: 'https://ivm108.informatik.htw-dresden.de/ewa/g17/shop/error',
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
            if(/\d/.test(this.name)) {
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
        submit(){
            console.log("createOrderFunction aufrufen");
            this.$refs.checkoutRef.redirectToCheckout({items: this.lineItems})
        },
        /*
        displayOrder() {
            console.log("Name: ", this.name);
            console.log("Street: ", this.street);
            console.log("Zip: ", this.zip);
            console.log("City: ", this.city);
        }
        */
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