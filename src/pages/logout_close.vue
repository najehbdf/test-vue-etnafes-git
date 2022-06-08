<template>
  <div>
    <!-- <div v-if="warningZone">
      deconnecter<span id="SecondsUntilExpire">{{ IDLE_TIMEOUT }} </span>
      seconds.
    </div> -->
  </div>
</template>

<script>
export default {
  name: "AutoLogout",
  data: function () {
    return {
      // Dummy data
      firstName: "John",
      lastName: "Doe",

      // Cache form data
      cachedFormData: null,
    };
  },

  created() {},
  computed: {},
  mounted() {},

  methods: {
    logoutUser: function () {
      this.$store
        .dispatch("performLogoutAction")
        .then((res) => {
          this.$noty.success("Déconnexion réussie.");
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style>
#SecondsUntilExpire {
  background-color: yellow;
}
</style>