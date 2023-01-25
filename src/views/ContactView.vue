<template>
    <v-container>
        <v-row>
            <v-col sm="3" offset-lg="1">
                <div>
                <h2 class="heading">Über mich</h2>
                </div>
            </v-col>
            <v-col sm="9" lg="7">
                <div>
                <h2 class="heading">Kontaktformular</h2>
                    <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
                      <v-card-text>
                        <v-text-field v-model="name" :rules="nameRules" label="Name"/>
                        <v-text-field v-model="firstname" :rules="firstnameRules" label="Vorname"/>
                        <v-text-field v-model="email" :rules="emailRules" label="E-Mail"/>
                        <v-text-field v-model="message" :rules="messageRules" label="Nachricht"/>
    
                        <v-btn type="submit" :disabled="!valid">absenden</v-btn>
                      </v-card-text>
                    </v-form>
                    <div v-if="submitted && valid" class="success-message">Input valid</div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      firstname: '',
      email: '',
      message: '',
      valid: false,
      submitted: false,
      nameRules: [
        v => !!v.trim() || 'Name is required',
        v => !/\d/.test(v) || 'Name must not contain numbers',
        v => v.trim().length >= 2 || 'Name must contain at least 2 characters'
      ],
      firstnameRules: [
        v => !!v.trim() || 'First name is required',
        v => !/\d/.test(v) || 'First name must not contain numbers',
        v => v.trim().length >= 2 || 'First name must contain at least 2 characters'
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      messageRules: [
        v => !!v || 'message is required'
      ]
    }
  },
  methods: {
    submitForm() {
      this.submitted = true;
      if (this.$refs.form.validate()) {
        // Your form submission code here
        this.valid = true;
      }
    }
  }
}
</script>

<style scoped>
.heading {
    margin-top: 40px;
}
</style>
