<template>
  <div class="modal-card" v-on="$listeners">
    <header class="modal-card-head">
      <div class="modal-card-title">Step {{ imageNumber }} of 3</div>
    </header>
    <section class="modal-card-body">
      <HelpIdImages v-if="element === 'id'" :image-number="imageNumber" @userIdConfirmed="submitUserId" @verified="$emit('verified', $event)"/>
      <HelpSignatureImages v-if="element === 'signature'" :image-number="imageNumber"/>
    </section>
      
    <footer class="modal-card-foot">
      <button :disabled="imageNumber <= 1" class="button" @click="imageNumber -= 1">
        Previous
      </button>
      <button v-if="imageNumber < 3" class="button is-primary" @click="imageNumber += 1">
        Next
      </button>
      <button v-else class="button is-primary" @click="$parent.close()">
        Close
      </button>
    </footer>
  </div>
</template>

<script>
import HelpIdImages from "./HelpIdImages.vue";
import HelpSignatureImages from "./HelpSignatureImages.vue";

export default {
  components: {
    HelpIdImages,
    HelpSignatureImages
  },
  props: {
    element: {
      type: String,
      default: "id"
    }
  },
  data() {
    return {
      imageNumber: 1
    };
  },
  mounted() {
    // setInterval(this.swap, 4000);
  },
  methods: {
    submitUserId(profileData) {
      this.$emit("userIdConfirmed", profileData);
      this.$parent.close();
    }
  }
};
</script>

<style scoped>
.modal-card {
  min-height: 35rem;
}
</style>
