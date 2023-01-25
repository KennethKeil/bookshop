<template>
  <v-container>
    <v-row>
      <v-col offset-lg="1" sm="3">
        <div>
          <h2 class="heading">Über mich</h2>
          <div class="about-me-container">
            <img alt="Profile Picture" class="profile-picture" src="../assets/images/avatar-dummy.jpeg">
            <p>Kenneth-Raphael Keil</p>
            <p>s79578</p>
          </div>
        </div>
      </v-col>
      <v-col lg="7" sm="9">
        <div>
          <h2 class="heading">Kontaktformular</h2>
          <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
            <v-card-text>
              <v-text-field v-model="name" :rules="nameRules" label="Name"/>
              <v-text-field v-model="firstname" :rules="firstnameRules" label="Vorname"/>
              <v-text-field v-model="email" :rules="emailRules" label="E-Mail"/>
              <v-text-field v-model="message" :rules="messageRules" label="Nachricht"/>

              <v-btn :disabled="!valid" type="submit">absenden</v-btn>
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
.profile-picture {
  width: 180px;
  height: 180px;
}
.heading {
    text-align: center;
    margin-top: 40px;
}
.about-me-container {
    text-align: center;
}
</style>
