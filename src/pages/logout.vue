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
      events: ["click", "mousemove", "mousedown", "scroll", "keypress", "load"],
      warningTimer: null,
      logoutTimer: null,
      warningZone: false,
      IDLE_TIMEOUT: 60,

      idleSecondsTimer: 0,
      idleSecondsCounter: 0,
    };
  },
  created() {
    //   window.addEventListener("beforeunload", this.leaving);
    window.addEventListener("beforeunload", this.removeUser);
  },
  computed: {
    second() {
      return this.warningTimer / 1000;
    },
  },
  mounted() {
    (window.onbeforeunload = function () {
      alert("You are now leaving, are you sure?");
    }),
      setInterval(() => {
        this.IDLE_TIMEOUT++;
      }, 1000);

    this.events.forEach(function (event) {
      window.addEventListener(event, this.resetTimer);
    }, this);
    this.setTimers();
  },
  destroyed() {
    this.events.forEach(function (event) {
      window.removeEventListener(event, this.resetTimer);
    }, this);
    this.resetTimer();
  },
  methods: {
    removeUser() {
      if (window.performance) {
        console.log("window.performance works fine on this browser");
      }
      if (window.performance.navigation.type != 1) {
        /* if (localStorage.getItem('remember') == 'false') {
                        this.$store.dispatch('destroyToken');

               }  */
        this.$store.dispatch("performLogoutAction");
      }
    },
    leaving(e) {
      //e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
      // Chrome requires returnValue to be set
      e.returnValue = "";

      const home =
        process.env.NODE_ENV === "development"
          ? "http://localhost:8081"
          : "https://etanfes.com";
      try {
        //localStorage.removeItem("doneLogout");
        this.$auth.logoutUser({ returnTo: home });
        window.alert("Sure to leave?");
      } catch (e) {
        console.log(`Error while logging out: ${e}`);
      }
    },
    setTimers: function () {
      // this.warningTimer = setTimeout(this.warningMessage, 0.5 * 60 * 1000); // 14 minutes - 14 * 60 * 1000
      // this.logoutTimer = setTimeout(this.logoutUser, 1 * 60 * 1000); // 15 minutes - 15 * 60 * 1000
      this.warningTimer = setTimeout(this.warningMessage, 29 * 60 * 1000); // 14 minutes - 14 * 60 * 1000
      this.logoutTimer = setTimeout(this.logoutUser, 30 * 60 * 1000); // 15 minutes - 15 * 60 * 1000
      this.warningZone = false;
    },
    warningMessage: function () {
      this.warningZone = true;

      this.$fire({
        title: this.$store.state.user.nom + " " + this.$store.state.user.prenom,
        text: "Êtes-vous toujours avec nous? sera expirer dans 1 mn",
        type: "info",
        timer: 60000,
      }).then((r) => {
        console.log(r.value);
      });
    },
    logoutUser: function () {
      this.$fire({
        title: this.$store.state.user.nom + " " + this.$store.state.user.prenom,
        text: "OOPS! Session expirer essayer de vous reconnecter",
        type: "info",
        timer: 900000,
      }).then((r) => {
        console.log(r.value);
      });
      this.$store
        .dispatch("performLogoutAction")
        .then((res) => {
          this.$noty.success("Déconnexion réussie.");
          this.$router.push("/");
          this.resetTimer();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetTimer: function () {
      clearTimeout(this.warningTimer);
      clearTimeout(this.logoutTimer);
      this.setTimers();
    },
  },
};
</script>
<style>
#SecondsUntilExpire {
  background-color: yellow;
}
</style>