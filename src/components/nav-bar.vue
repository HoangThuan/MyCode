<script>
import { layoutMethods } from "@/state/helpers";
import img1 from "../assets/images/products/img-1.png"
import img2 from "../assets/images/products/img-2.png"
import img3 from "../assets/images/products/img-3.png"
import img4 from "../assets/images/products/img-6.png"
import img5 from "../assets/images/products/img-5.png"

import simplebar from "simplebar-vue";

import i18n from "../i18n";

/**
 * Nav-bar Component
 */
export default {
  data() {
    return {
      cartItems: [
        {
          id: 1,
          productImage: img1,
          productName: "Branded T-Shirts",
          productLink: "/ecommerce/product-details",
          quantity: "10 x $32",
          itemPrice: "320",
        },
        {
          id: 2,
          productImage: img2,
          productName: "Bentwood Chair",
          productLink: "/ecommerce/product-details",
          quantity: "5 x $18",
          itemPrice: "89",
        },
        {
          id: 3,
          productImage: img3,
          productName: "Borosil Paper Cup",
          productLink: "/ecommerce/product-details",
          quantity: "3 x $250",
          itemPrice: "750",
        },
        {
          id: 4,
          productImage: img4,
          productName: "Gray Styled T-Shirt",
          productLink: "/ecommerce/product-details",
          quantity: "1 x $1250",
          itemPrice: "1250",
        },
        {
          id: 5,
          productImage: img5,
          productName: "Stillbird Helmet",
          productLink: "/ecommerce/product-details",
          quantity: "2 x $495",
          itemPrice: "990",
        },
      ],

      languages: [{
        flag: require("@/assets/images/flags/us.svg"),
        language: "en",
        title: "English",
      },
      {
        flag: require("@/assets/images/flags/china.svg"),
        language: "ch",
        title: "中國人",
      },
      {
        flag: require("@/assets/images/flags/vn.svg"),
        language: "vn",
        title: "Việt Nam",
      }
      ],
      lan: i18n.locale,
      text: null,
      flag: null,
      value: null,
      myVar: 1,
    };
  },
  components: {
    simplebar
  },

  methods: {
    ...layoutMethods,
    isCustomDropdown() {
      
    },
    toggleHamburgerMenu() {
      var windowSize = document.documentElement.clientWidth;
      let layoutType = document.documentElement.getAttribute("data-layout");

      document.documentElement.setAttribute("data-sidebar-visibility", "show");
      let visiblilityType = document.documentElement.getAttribute("data-sidebar-visibility");

      if (windowSize > 767)
        document.querySelector(".hamburger-icon").classList.toggle("open");


      //For collapse vertical menu

      if (visiblilityType === "show" && (layoutType === "vertical" || layoutType === "semibox")) {
        if (windowSize < 1025 && windowSize > 767) {
          document.body.classList.remove("vertical-sidebar-enable");
          document.documentElement.getAttribute("data-sidebar-size") == "sm" ?
            document.documentElement.setAttribute("data-sidebar-size", "") :
            document.documentElement.setAttribute("data-sidebar-size", "sm");
        } else if (windowSize > 1025) {
          document.body.classList.remove("vertical-sidebar-enable");
          document.documentElement.getAttribute("data-sidebar-size") == "lg" ?
            document.documentElement.setAttribute("data-sidebar-size", "sm") :
            document.documentElement.setAttribute("data-sidebar-size", "lg");
        } else if (windowSize <= 767) {
          document.body.classList.add("vertical-sidebar-enable");
          document.documentElement.setAttribute("data-sidebar-size", "lg");
        }
      }
    },
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    setLanguage(locale, country, flag) {
      this.lan = locale;
      this.text = country;
      this.flag = flag;
      document.getElementById("header-lang-img").setAttribute("src", flag);
      i18n.global.locale = locale;
    },
  },

  computed: {
    calculateTotalPrice() {
      return this.cartItems.reduce((total, item) => total + parseFloat(item.itemPrice), 0).toFixed(2);
    },
  },
  mounted() {
    if (process.env.VUE_APP_I18N_LOCALE) {
      this.flag = process.env.VUE_APP_I18N_LOCALE;
      this.languages.forEach((item) => {
        if (item.language == this.flag) {
          document.getElementById("header-lang-img").setAttribute("src", item.flag);
        }
      });
    }

    document.addEventListener("scroll", function () {
      var pageTopbar = document.getElementById("page-topbar");
      if (pageTopbar) {
        document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50 ? pageTopbar.classList.add(
          "topbar-shadow") : pageTopbar.classList.remove("topbar-shadow");
      }
    });
    if (document.getElementById("topnav-hamburger-icon"))
      document
        .getElementById("topnav-hamburger-icon")
        .addEventListener("click", this.toggleHamburgerMenu);

    this.isCustomDropdown();
  },
};
</script>

<template>
  <header id="page-topbar">
    <div class="layout-width">
      <div class="navbar-header">
        <div class="d-flex">
          <!-- LOGO -->

          <button type="button" class="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
            id="topnav-hamburger-icon">
            <span class="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

        
        </div>

        <div class="d-flex align-items-center">
         

        
        <a class="nav-link d-none d-sm-inline-block" href="javascript:void(0);" style="color: #333333;font-size: 14px;">
          <span class="nav-link d-none d-sm-inline-block" style="color: #333333;font-size: 14px;">
               {{ $t("t-withdraw") }}
          </span>
          <span class="nav-icon-cutomer nav-icon-pink" style="padding: 0 5px">
               0
          </span>

        </a>

        <a class="nav-link d-none d-sm-inline-block" href="javascript:void(0);" style="color: #333333;font-size: 14px;">
          <span class="nav-link d-none d-sm-inline-block" style="color: #333333;font-size: 14px;">
               {{ $t("t-Pay") }}
          </span>
          <span class="nav-icon-cutomer nav-icon-pink" style="padding: 0 5px">
               0
          </span>

        </a>

        <a class="nav-link d-none d-sm-inline-block" href="javascript:void(0);" style="color: #333333;font-size: 14px;">
          <span class="nav-link d-none d-sm-inline-block" style="color: #333333;font-size: 14px;">
            {{ $t("t-drop-order") }}
          </span>
          <span class="nav-icon-cutomer nav-icon-pink" style="padding: 0 5px">
               0
          </span>

        </a>

        <a class="nav-link d-none d-sm-inline-block" href="javascript:void(0);" style="color: #333333;font-size: 14px;">
          <span class="nav-link d-none d-sm-inline-block" style="color: #333333;font-size: 14px;">
            {{ $t("t-unknown-income") }}
          </span>
          <span class="nav-icon-cutomer nav-icon-pink" style="padding: 0 5px">
               0
          </span>

        </a>

        <a class="nav-link d-none d-sm-inline-block" href="javascript:void(0);" style="color: #333333;font-size: 14px;">
          <span class="nav-link d-none d-sm-inline-block" style="color: #333333;font-size: 14px;">
            {{ $t("t-dowload-vpn") }}
          </span>
        </a>

        <a class="nav-link d-none d-sm-inline-block" href="javascript:void(0);" style="color: #333333;font-size: 14px; margin-left: 20px;">
          <span class="nav-link d-none d-sm-inline-block" style="color: #333333;font-size: 14px;">
            {{ $t("t-clear-notifications") }}
          </span>
        </a>

        <BDropdown class="dropdown" variant="ghost-secondary" dropstart
            :offset="{ alignmentAxis: 55, crossAxis: 15, mainAxis: -50 }"
            toggle-class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle arrow-none"
            menu-class="dropdown-menu-end">
            <template #button-content> <img id="header-lang-img" src="@/assets/images/flags/us.svg" alt="Header Language"
                height="20" class="rounded">
            </template>
            <BLink href="javascript:void(0);" class="dropdown-item notify-item language py-2"
              v-for="(entry, key) in languages" :data-lang="entry.language" :title="entry.title"
              @click="setLanguage(entry.language, entry.title, entry.flag)" :key="key">
              <img :src="entry.flag" alt="user-image" class="me-2 rounded" height="18">
              <span class="align-middle">{{ entry.title }}</span>
            </BLink>
          </BDropdown>

          <BDropdown variant="link" class="ms-sm-3 header-item topbar-user " toggle-class="rounded-circle arrow-none"
            menu-class="dropdown-menu-end" :offset="{ alignmentAxis: -14, crossAxis: 0, mainAxis: 0 }">
            <template #button-content>
              <span class="d-flex align-items-center">
                <img class="rounded-circle header-profile-user" src="@/assets/images/users/avatar-1.jpg"
                  alt="Header Avatar">
                <span class="text-start ms-xl-2">
                  <span class="d-none d-xl-inline-block ms-1 fw-semibold user-name-text">Edward
                    Diana</span>
                </span>
              </span>
            </template>
            <router-link class="dropdown-item" to="/pages/profile"><i
                class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
              <span class="align-middle"> Profile</span>
            </router-link>
            <router-link class="dropdown-item" to="/chat">
              <i class=" mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>
              <span class="align-middle"> Messages</span>
            </router-link>
          </BDropdown>
        </div>
      </div>
    </div>
  </header>
</template>
<style>
.topbar-user .dropdown-toggle::after {
    content:none;
}
.dropstart .dropdown-toggle::before {
    content:none;
}
</style>