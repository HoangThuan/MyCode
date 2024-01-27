<script>
import {
  layoutComputed
} from "@/state/helpers";

export default {
  data() {
    return {
      settings: {
        minScrollbarLength: 60,
      },
    };
  },
  computed: {
    ...layoutComputed,
    layoutType: {
      get() {
        return this.$store ? this.$store.state.layout.layoutType : {} || {};
      },
    },
  },

  watch: {
    $route: {
      handler: "onRoutechange",
      immediate: true,
      deep: true,
    },
  },


  mounted() {
    this.initActiveMenu();
    if (this.rmenu == 'vertical' && this.layoutType == 'twocolumn') {
      document.documentElement.setAttribute("data-layout", "vertical");
    }
    document.getElementById('overlay').addEventListener('click', () => {
      document.body.classList.remove('vertical-sidebar-enable');
    });

    window.addEventListener("resize", () => {
      if (this.layoutType == 'twocolumn') {
        var windowSize = document.documentElement.clientWidth;
        if (windowSize < 767) {
          document.documentElement.setAttribute("data-layout", "vertical");
          this.rmenu = 'vertical';
          localStorage.setItem('rmenu', 'vertical');
        } else {
          document.documentElement.setAttribute("data-layout", "vertical");
          this.rmenu = 'twocolumn';
          localStorage.setItem('rmenu', 'twocolumn');
          setTimeout(() => {
            this.initActiveMenu();
          }, 50);

        }
      }
    });
    if (document.querySelectorAll(".navbar-nav .collapse")) {
      let collapses = document.querySelectorAll(".navbar-nav .collapse");

      collapses.forEach((collapse) => {
        // Hide sibling collapses on `show.bs.collapse`
        collapse.addEventListener("show.bs.collapse", (e) => {
          e.stopPropagation();
          let closestCollapse = collapse.parentElement.closest(".collapse");
          if (closestCollapse) {
            let siblingCollapses =
              closestCollapse.querySelectorAll(".collapse");
            siblingCollapses.forEach((siblingCollapse) => {
              if (siblingCollapse.classList.contains("show")) {
                siblingCollapse.classList.remove("show");
                siblingCollapse.parentElement.firstChild.setAttribute("aria-expanded", "false");
              }
            });
          } else {
            let getSiblings = (elem) => {
              // Setup siblings array and get the first sibling
              let siblings = [];
              let sibling = elem.parentNode.firstChild;
              // Loop through each sibling and push to the array
              while (sibling) {
                if (sibling.nodeType === 1 && sibling !== elem) {
                  siblings.push(sibling);
                }
                sibling = sibling.nextSibling;
              }
              return siblings;
            };
            let siblings = getSiblings(collapse.parentElement);
            siblings.forEach((item) => {
              if (item.childNodes.length > 2) {
                item.firstElementChild.setAttribute("aria-expanded", "false");
                item.firstElementChild.classList.remove("active");
              }
              let ids = item.querySelectorAll("*[id]");
              ids.forEach((item1) => {
                item1.classList.remove("show");
                item1.parentElement.firstChild.setAttribute("aria-expanded", "false");
                item1.parentElement.firstChild.classList.remove("active");
                if (item1.childNodes.length > 2) {
                  let val = item1.querySelectorAll("ul li a");

                  val.forEach((subitem) => {
                    if (subitem.hasAttribute("aria-expanded"))
                      subitem.setAttribute("aria-expanded", "false");
                  });
                }
              });
            });
          }
        });

        // Hide nested collapses on `hide.bs.collapse`
        collapse.addEventListener("hide.bs.collapse", (e) => {
          e.stopPropagation();
          let childCollapses = collapse.querySelectorAll(".collapse");
          childCollapses.forEach((childCollapse) => {
            let childCollapseInstance = childCollapse;
            childCollapseInstance.classList.remove("show");
            childCollapseInstance.parentElement.firstChild.setAttribute("aria-expanded", "false");
          });
        });
      });
    }
  },

  methods: {
    onRoutechange(ele) {
      this.initActiveMenu(ele.path);
      if (document.getElementsByClassName("mm-active").length > 0) {
        const currentPosition = document.getElementsByClassName("mm-active")[0].offsetTop;
        if (currentPosition > 500)
          if (this.$refs.isSimplebar)
            this.$refs.isSimplebar.value.getScrollElement().scrollTop = currentPosition + 300;
      }
    },
    initActiveMenu() {
      const pathName = window.location.pathname;
      const ul = document.getElementById("navbar-nav");
      if (ul) {
        const items = Array.from(ul.querySelectorAll("a.nav-link"));
        let activeItems = items.filter((x) => x.classList.contains("active"));
        this.removeActivation(activeItems);
        let matchingMenuItem = items.find((x) => {
          return x.getAttribute("href") === pathName;
        });
        if (matchingMenuItem) {
          this.activateParentDropdown(matchingMenuItem);
        } else {
          var id = pathName.replace("/", "");
          if (id) document.body.classList.add("twocolumn-panel");
          this.activateIconSidebarActive(pathName);
        }
      }
    },

    updateMenu(e, event) {

      document.body.classList.remove("twocolumn-panel");
      const ul = document.getElementById("navbar-nav");
      if (ul) {
        const items = Array.from(ul.querySelectorAll(".show"));
        items.forEach((item) => {
          item.classList.remove("show");
        });
      }
      const icons = document.getElementById("two-column-menu");
      if (icons) {
        const activeIcons = Array.from(
          icons.querySelectorAll(".nav-icon.active")
        );
        activeIcons.forEach((item) => {
          item.classList.remove("active");
        });
      }
      document.getElementById(e).classList.add("show");
      event.target.classList.add("active")
      this.activateIconSidebarActive("#" + e);
    },

    removeActivation(items) {
      items.forEach((item) => {
        if (item.classList.contains("menu-link")) {
          if (!item.classList.contains("active")) {
            item.setAttribute("aria-expanded", false);
          }
          item.nextElementSibling.classList.remove("show");
        }
        if (item.classList.contains("nav-link")) {
          if (item.nextElementSibling) {
            item.nextElementSibling.classList.remove("show");
          }
          item.setAttribute("aria-expanded", false);
        }
        item.classList.remove("active");
      });
    },

    activateParentDropdown(item) {
      // navbar-nav menu add active
      item.classList.add("active");
      let parentCollapseDiv = item.closest(".collapse.menu-dropdown");
      if (parentCollapseDiv) {
        // to set aria expand true remaining
        parentCollapseDiv.classList.add("show");
        parentCollapseDiv.parentElement.children[0].classList.add("active");
        parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
        if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
          if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown").previousElementSibling) {
            if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown").previousElementSibling.parentElement.closest(".collapse.menu-dropdown")) {
              const grandparent = parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown").previousElementSibling.parentElement.closest(".collapse.menu-dropdown");
              this.activateIconSidebarActive("#" + grandparent.getAttribute("id"));
              grandparent.classList.add("show");
            }
          }
          this.activateIconSidebarActive("#" + parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")
            .getAttribute("id"));

          parentCollapseDiv.parentElement.closest(".collapse").classList.add("show");
          if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling)
            parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
          return false;
        }
        this.activateIconSidebarActive("#" + parentCollapseDiv.getAttribute("id"));
        return false;
      }
      return false;
    },

    activateIconSidebarActive(id) {
      var menu = document.querySelector(
        "#two-column-menu .simplebar-content-wrapper a[href='" +
        id +
        "'].nav-icon"
      );
      if (menu !== null) {
        menu.classList.add("active");
      }
    },
  },
};
</script>

<template>
  <BContainer fluid>
    <div id="two-column-menu"></div>

    <template v-if="layoutType === 'vertical' || layoutType === 'semibox'">
      <ul class="navbar-nav h-100" id="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link menu-link" to="/">
            <i class="ri-honour-line"></i>
            <span data-key="t-widgets">{{ $t("t-home") }}</span>
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link menu-link" href="#sidebarDashboards" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="sidebarDashboards">
            <i class="bi bi-house-fill"></i>
            <span data-key="t-collection-mn"> {{ $t("t-collection-mn") }}</span>
          </a>
          <div class="collapse menu-dropdown" id="sidebarDashboards">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link to="/pay/pay-send" class="nav-link custom-abc" data-key="t-pay-send">
                  {{ $t("t-pay-send") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/pay/pay-bank" class="nav-link" data-key="t-pay-bank">
                  {{ $t("t-pay-bank") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/pay/bankScript" class="nav-link" data-key="t-pay-script">
                  {{ $t("t-pay-script") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/pay/bankCard" class="nav-link" data-key="t-pay-bank-card">
                  {{ $t("t-pay-bank-card") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/pay/bankZalo" class="nav-link" data-key="t-pay-zalo">
                  {{ $t("t-pay-zalo") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/pay/bankViettel" class="nav-link" data-key="t-pay-viettel">
                  {{ $t("t-pay-viettel") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/pay/bankMomo" class="nav-link" data-key="t-pay-momo">
                  {{ $t("t-pay-momo") }}
                </router-link>
              </li>
            </ul>
          </div>
        </li>
        
        <!-- end Dashboard Menu -->
        <li class="nav-item">
          <a class="nav-link menu-link" href="#sidebarApps" data-bs-toggle="collapse" role="button" aria-expanded="false"
            aria-controls="sidebarApps">
            <i class="ri-apps-2-line"></i>
            <span data-key="t-customer-managament"> {{ $t("t-customer-managament") }}</span>
          </a>
          <div class="collapse menu-dropdown" id="sidebarApps">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link to="/merchant/merchantLists" class="nav-link" data-key="t-merchant-list">
                  {{ $t("t-merchant-list") }}
                </router-link>
              </li>   
              <li class="nav-item">
                <router-link to="/merchant/collectionOrder" class="nav-link" data-key="t-order-list">
                  {{ $t("t-order-list") }}
                </router-link>
              </li> 
              <li class="nav-item">
                <router-link to="/merchant/reviewList" class="nav-link" data-key="t-review-list">
                  {{ $t("t-review-list") }}
                </router-link>
              </li>   
              <li class="nav-item">
                <router-link to="/merchant/internalChargingList" class="nav-link" data-key="t-internal-charging-list">
                  {{ $t("t-internal-charging-list") }}
                </router-link>
              </li>   
              <li class="nav-item">
                <router-link to="/merchant/dropOderList" class="nav-link" data-key="t-drop-order-list">
                  {{ $t("t-drop-order-list") }}
                </router-link>
              </li>  
              <li class="nav-item">
                <router-link to="/merchant/callbackRecord" class="nav-link" data-key="t-callback-record">
                  {{ $t("t-callback-record") }}
                </router-link>
              </li>        
            </ul>
          </div>
        </li>

        <li class="nav-item">
          <a class="nav-link menu-link" href="#sidebar" data-bs-toggle="collapse" role="button" aria-expanded="false"
            aria-controls="sidebar">
            <i class="bi bi-bank"></i>
            <span data-key="t-financial-management"> {{ $t("t-financial-management") }}</span>
          </a>
          <div class="collapse menu-dropdown" id="sidebar">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link to="/export/reconciliationForm" class="nav-link" data-key="t-reconciliation-form">
                  {{ $t("t-reconciliation-form") }}
                </router-link>
              </li>   
              <li class="nav-item">
                <router-link to="/export/merchantTunnleTotal" class="nav-link" data-key="t-merchantTunnleTotal">
                  {{ $t("t-merchantTunnleTotal") }}
                </router-link>
              </li> 
              <li class="nav-item">
                <router-link to="/export/merchantForm" class="nav-link" data-key="t-merchantForm">
                  {{ $t("t-merchantForm") }}
                </router-link>
              </li>   
              <li class="nav-item">
                <router-link to="/export/bankcardForm" class="nav-link" data-key="t-bankcardForm">
                  {{ $t("t-bankcardForm") }}
                </router-link>
              </li>   
              <li class="nav-item">
                <router-link to="/export/unknownIncome" class="nav-link" data-key="t-unknownIncome">
                  {{ $t("t-unknownIncome") }}
                </router-link>
              </li>        
            </ul>
          </div>
        </li>

        <li class="nav-item">
          <a class="nav-link menu-link" href="#paybar" data-bs-toggle="collapse" role="button" aria-expanded="false"
            aria-controls="paybar">
            <i class="bi bi-person-vcard-fill"></i>
            <span data-key="t-payment-management"> {{ $t("t-payment-management") }}</span>
          </a>
          <div class="collapse menu-dropdown" id="paybar">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link to="/payManagement/behalfPayConfig" class="nav-link" data-key="t-behalfPayConfig">
                  {{ $t("t-behalfPayConfig") }}
                </router-link>
              </li>   
              <li class="nav-item">
                <router-link to="/payManagement/behalfPay" class="nav-link" data-key="t-behalfPay">
                  {{ $t("t-behalfPay") }}
                </router-link>
              </li> 
              <li class="nav-item">
                <router-link to="/payManagement/callbackLog" class="nav-link" data-key="t-callbackLog">
                  {{ $t("t-callbackLog") }}
                </router-link>
              </li>   
              <li class="nav-item">
                <router-link to="/payManagement/automaticScript" class="nav-link" data-key="t-automaticScript">
                  {{ $t("t-automaticScript") }}
                </router-link>
              </li>   
              <li class="nav-item">
                <router-link to="/payManagement/taskList" class="nav-link" data-key="t-taskList">
                  {{ $t("t-taskList") }}
                </router-link>
              </li>         
            </ul>
          </div>
        </li>
        <li class="nav-item">
          <router-link class="nav-link menu-link" to="/payAcount/userList">
            <i class="bi bi-person-fill-check"></i>
            <span data-key="t-userList">{{ $t("t-userList") }}</span>
          </router-link>
        </li>

        <li class="nav-item">
          <a class="nav-link menu-link" href="#system" data-bs-toggle="collapse" role="button" aria-expanded="false"
            aria-controls="system">
            <i class="bi bi-gear"></i>
            <span data-key="t-system"> {{ $t("t-system") }}</span>
          </a>
          <div class="collapse menu-dropdown" id="system">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link to="/system/setting" class="nav-link" data-key="t-setting">
                  {{ $t("t-setting") }}
                </router-link>
              </li>   
              <li class="nav-item">
                <router-link to="/system/systemLog" class="nav-link" data-key="t-systemLog">
                  {{ $t("t-systemLog") }}
                </router-link>
              </li> 
              <li class="nav-item">
                <router-link to="/system/vpnList" class="nav-link" data-key="t-vpnList">
                  {{ $t("t-vpnList") }}
                </router-link>
              </li>   
              <li class="nav-item">
                <router-link to="/system/exportFiles" class="nav-link" data-key="t-exportFiles">
                  {{ $t("t-exportFiles") }}
                </router-link>
              </li>   
              <li class="nav-item">
                <router-link to="/system/apiLog" class="nav-link" data-key="t-apiLog">
                  {{ $t("t-apiLog") }}
                </router-link>
              </li>         
            </ul>
          </div>
        </li>

    </ul>
  </template>

</BContainer></template>