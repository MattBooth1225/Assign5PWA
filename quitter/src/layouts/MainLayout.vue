<template>
  <q-layout view="lHr lpR fFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title class="text-weight-bold">
          <span class="gt-sm">{{ $route.name }}</span>
          <q-iconF
            class="header-icon q-pa-md lt-md"
            name="fas fa-dove"
            size="sm"
            color="primary"
          />
        </q-toolbar-title>

        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div v-if="showAppInstallBanner" class="banner-container bg-primary">
            <div class="constrain">
              <q-banner class="bg-primary text-white" inline-actions dense>
                <template v-slot:avatar>
                  <q-avatar
                    color="white"
                    icon="eva-play-circle-outline"
                    text-color="grey-10"
                    font-size="22px"
                  />
                </template>

                <b>Install Quitter App?</b>

                <template v-slot:action>
                  <q-btn
                    @click="installApp"
                    label="Yes"
                    class="q-px-sm"
                    dense
                    flat
                  />
                  <q-btn
                    @click="showAppInstallBanner = false"
                    label="Later"
                    class="q-px-sm"
                    dense
                    flat
                  />
                  <q-btn
                    @click="neverShowAppInstallBanner"
                    label="Never"
                    class="q-px-sm"
                    dense
                    flat
                  />
                </template>
              </q-banner>
            </div>
          </div>
        </transition>

        <q-toggle
          :false-value="this.$q.dark.set(theme)"
          :true-value="this.$q.dark.set(theme)"
          v-model="theme"
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
          color="black"
          class="text-center"
          size="md"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" :width="283" bordered show-if-above>
      <q-icon class="q-pa-md" name="fas fa-dove" size="lg" color="primary" />

      <q-list>
        <q-item to="/" v-ripple clickable exact>
          <q-item-section avatar>
            <q-icon name="home" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">Home</q-item-section>
        </q-item>
        <q-item to="/about" v-ripple clickable exact>
          <q-item-section avatar>
            <q-icon name="help" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold"
            >About</q-item-section
          >
        </q-item>
        <q-item v-ripple clickable exact>
          <q-item-section avatar>
            <q-icon name="settings" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold"
            >Settings</q-item-section
          >
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer show-if-above v-model="right" side="right" bordered>
      <q-input
        placeholder="Search Qwitter"
        class="q-ma-md"
        outlined
        rounded
        dense
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-list separator padding>
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">Education</q-item-label>
            <q-item-label class="text-weight-bold"
              >Something amazing happened!</q-item-label
            >
            <q-item-label caption
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">Education</q-item-label>
            <q-item-label class="text-weight-bold"
              >Something amazing happened!</q-item-label
            >
            <q-item-label caption
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">Education</q-item-label>
            <q-item-label class="text-weight-bold"
              >Something amazing happened!</q-item-label
            >
            <q-item-label caption
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
let deferredPrompt;
export default {
  created() {
    this.theme = JSON.parse(localStorage.getItem("theme"));
  },
  data() {
    return {
      left: false,
      right: false,
      theme: "",
      showAppInstallBanner: false,
    };
  },

  watch: {
    theme() {
      localStorage.setItem("theme", JSON.stringify(this.theme));
    },
  },
  methods: {
    installApp() {
      // Hide the app provided install promotion
      this.showAppInstallBanner = false;
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
          this.neverShowAppInstallBanner();
        } else {
          console.log("User dismissed the install prompt");
        }
      });
    },
    neverShowAppInstallBanner() {
      this.showAppInstallBanner = false;
      this.$q.localStorage.set("neverShowAppInstallBanner", true);
    },
  },
  mounted() {
    let neverShowAppInstallBanner = this.$q.localStorage.getItem(
      "neverShowAppInstallBanner"
    );
    if (!neverShowAppInstallBanner) {
      window.addEventListener("beforeinstallprompt", (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI notify the user they can install the PWA
        setTimeout(() => {
          this.showAppInstallBanner = true;
        }, 3000);
      });
    }
  },
};
</script>

<style lang="sass">
.header-icon
  position: absolute
  bottom: 0
  left: 50%
  transform: translateX(-50%)
</style>
