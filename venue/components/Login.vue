<template>
  <div>
    <h3 class="title">LOGIN</h3>
    <form method="POST" @submit="authenticateLogin($event)">
      <p v-show="showMessageError.error" class="is-size-6 has-text-danger">{{ showMessageError.message }}</p>
      <b-field label="Username">
        <b-input v-model="username" type="text" required/>
      </b-field>
      <b-field label="Password">
        <b-input v-model="password" type="password" required password-reveal/>
      </b-field>
      <b-field>
        <div class="control">
          <button 
            type="submit" 
            class="button is-primary">Log In</button>
        </div>
      </b-field>
      <a href="#" @click="isForgotPasswordModalActive = true">Forgot password?</a>
    </form>

    <b-modal :active.sync="isForgotPasswordModalActive">
      <form class="card">
        <header class="card-header">
          <div class="card-header-title">Reset password</div>
        </header>
        <div class="card-content">
          <div class="content">
            <div>Forgot your password? No problem. Enter your email address and we'll send you a reset code.</div>
            <b-field label="Email">
              <b-input v-model="email" type="email" required/>
            </b-field>
          </div> 
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" @click="isForgotPasswordModalActive = false">Cancel</a>
          <a class="card-footer-item" type="submit" @click="resetPassword">Reset password</a>
        </footer>
      </form>
    </b-modal>
  </div>
</template>


<script>
import { loadUserData } from "~/assets/utils.js";

export default {
  data() {
    return {
      loginError: false,
      username: "",
      password: "",
      email: "",
      showMessageError: {
        error: true,
        message: "",
        authResponse: null
      },
      isForgotPasswordModalActive: false
    };
  },
  mounted() {
    if (this.$route.query.email_confirmed == 1) {
      this.$snackbar.open("Email address verified");
    }
  },
  methods: {
    async authenticateLogin(event) {
      event.preventDefault();
      this.loginError = false;

      try {
        this.authResponse = await this.$axios.$post("/authenticate/", {
          username: this.username,
          password: this.password
        });

        await this.$store.commit("user/authenticated", {
          userId: this.authResponse.user_profile_id,
          language: this.authResponse.language,
          token: this.authResponse.token
        });

        await loadUserData(this.$store.commit, this.$axios);

        this.$router.push(
          this.$store.state.userStats.hasCampaignData
            ? "/dashboard"
            : "/onboarding/bitcointalk"
        );
      } catch (error) {
        const errorCode = error.response.data.error_code;
        this.displayErrorMessage(errorCode);
      }
    },
    displayErrorMessage(error) {
      this.showMessageError.error = true;
      if (error === "wrong_credentials") {
        this.showMessageError.message = "Incorrect username or password.";
      } else if (error === "email_verification_required") {
        this.showMessageError.message =
          "Your email address has not been verified. Please check your email account.";
      }
    },
    async resetPassword() {
      const authResponse = await this.$axios.$post("/manage/reset-password/", {
        action: "request",
        email: this.email
      });
      if (authResponse.success === true) {
        this.isForgotPasswordModalActive = false;
      }
    }
  }
};
</script>

<style scoped>
form > a {
  text-decoration: underline;
}
</style>
