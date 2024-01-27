import store from "@/state/store";

export default [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/account/login.vue"),
    meta: {
      title: "Login",
     /* beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["auth/loggedIn"]) {
          // Redirect to the home page instead
          next({ name: "default" });
          next();
        } else {
          // Continue to the login page
          next();
        }
      },*/
    },
  },
  {
    path: "/",
    name: "default",
    meta: {
      title: "Dashboard",
    //  authRequired: true,
    },
    component: () => import("../views/dashboard/home.vue"),
  },
  {
    path: "/pay/pay-send",
    name: "paysend",
    meta: {
      title: "PaySend",
    //  authRequired: true,
    },
    component: () => import("../views/pay/pay-send.vue"),
  },
  {
    path: "/pay/pay-bank",
    name: "paybank",
    meta: {
      title: "Pay Bank",
     // authRequired: true,
    },
    component: () => import("../views/pay/pay-bank.vue"),
  },
  {
    path: "/pay/bankScript",
    name: "payscript",
    meta: {
      title: "Bank Script",
     // authRequired: true,
    },
    component: () => import("../views/pay/pay-bank-script.vue"),
  },
  {
    path: "/pay/bankCard",
    name: "paycard",
    meta: {
      title: "Bank Script",
    //  authRequired: true,
    },
    component: () => import("../views/pay/pay-bank-card.vue"),
  },
  {
    path: "/pay/bankZalo",
    name: "payzalo",
    meta: {
      title: "Zalo mangament",
    //  authRequired: true,
    },
    component: () => import("../views/pay/pay-bank-zalo.vue"),
  },
  {
    path: "/pay/bankMomo",
    name: "paymomo",
    meta: {
      title: "Momo mangament",
    //  authRequired: true,
    },
    component: () => import("../views/pay/pay-bank-momo.vue"),
  },
  {
    path: "/pay/bankViettel",
    name: "payviettel",
    meta: {
      title: "Viettel mangament",
     // authRequired: true,
    },
    component: () => import("../views/pay/pay-bank-viettel.vue"),
  },
  {
    path: "/merchant/merchantLists",
    name: "merchantLists",
    meta: {
      title: "Merchant List",
    //  authRequired: true,
    },
    component: () => import("../views/merchant/merchant-list.vue"),
  },
  {
    path: "/merchant/collectionOrder",
    name: "collectionOrder",
    meta: {
      title: "collectionOrder",
     // authRequired: true,
    },
    component: () => import("../views/merchant/collectionOrder.vue"),
  },
  {
    path: "/merchant/reviewList",
    name: "reviewList",
    meta: {
      title: "reviewList",
    //  authRequired: true,
    },
    component: () => import("../views/merchant/reviewList.vue"),
  },
  {
    path: "/merchant/internalChargingList",
    name: "internalChargingList",
    meta: {
      title: "internalChargingList",
     // authRequired: true,
    },
    component: () => import("../views/merchant/internalChargingList.vue"), 
  },
  {
    path: "/merchant/dropOderList",
    name: "dropOderList",
    meta: {
      title: "dropOderList",
    //  authRequired: true,
    },
    component: () => import("../views/merchant/dropOderList.vue"), 
  },
  {
    path: "/merchant/callbackRecord",
    name: "callbackRecord",
    meta: {
      title: "callbackRecord",
    //  authRequired: true,
    },
    component: () => import("../views/merchant/callbackRecord.vue"), 
  },
  {
    path: "/export/reconciliationForm",
    name: "reconciliationForm",
    meta: {
      title: "reconciliationForm",
   //   authRequired: true,
    },
    component: () => import("../views/export/reconciliationForm.vue"), 
  },
  {
    path: "/export/merchantTunnleTotal",
    name: "merchantTunnleTotal",
    meta: {
      title: "merchantTunnleTotal",
 //     authRequired: true,
    },
    component: () => import("../views/export/merchantTunnleTotal.vue"),  
  },
  {
    path: "/export/merchantForm",
    name: "merchantForm",
    meta: {
      title: "merchantForm",
    //  authRequired: true,
    },
    component: () => import("../views/export/merchantForm.vue"),
  },
  {
    path: "/export/bankcardForm",
    name: "bankcardForm",
    meta: {
      title: "bankcardForm",
   //   authRequired: true,
    },
    component: () => import("../views/export/bankcardForm.vue"),
  },
  {
    path: "/export/unknownIncome",
    name: "unknownIncome",
    meta: {
      title: "unknownIncome",
  //    authRequired: true,
    },
    component: () => import("../views/export/unknownIncome.vue"),   
  },
  {
    path: "/payManagement/behalfPayConfig",
    name: "behalfPayConfig",
    meta: {
      title: "behalfPayConfig",
  //    authRequired: true,
    },
    component: () => import("../views/payManagement/behalfPayConfig.vue"),   
  },
  {
    path: "/payManagement/behalfPay",
    name: "behalfPay",
    meta: {
      title: "behalfPay",
   //   authRequired: true,
    },
    component: () => import("../views/payManagement/behalfPay.vue"),   
  },
  {
    path: "/payManagement/callbackLog",
    name: "callbackLog",
    meta: {
      title: "callbackLog",
    //  authRequired: true,
    },
    component: () => import("../views/payManagement/callbackLog.vue"),   
  },
  {
    path: "/payManagement/automaticScript",
    name: "automaticScript",
    meta: {
      title: "automaticScript",
     // authRequired: true,
    },
    component: () => import("../views/payManagement/automaticScript.vue"),   
  },
  {
    path: "/payManagement/taskList",
    name: "taskList",
    meta: {
      title: "taskList",
    //  authRequired: true,
    },
    component: () => import("../views/payManagement/taskList.vue"),   
  },
  {
    path: "/payAcount/userList",
    name: "userList",
    meta: {
      title: "userList",
   //   authRequired: true,
    },
    component: () => import("../views/payAcount/userList.vue"),
  },
  {
    path: "/system/setting",
    name: "setting",
    meta: {
      title: "setting",
   //   authRequired: true,
    },
    component: () => import("../views/system/setting.vue"), 
  },
  {
    path: "/system/systemLog",
    name: "systemLog",
    meta: {
      title: "systemLog",
    //  authRequired: true,
    },
    component: () => import("../views/system/systemLog.vue"), 
  },
  {
    path: "/system/vpnList",
    name: "vpnList",
    meta: {
      title: "vpnList",
   //   authRequired: true,
    },
    component: () => import("../views/system/vpnList.vue"),
  },
  {
    path: "/system/exportFiles",
    name: "exportFiles",
    meta: {
      title: "exportFiles",
     // authRequired: true,
    },
    component: () => import("../views/system/exportFiles.vue"),
  },
  {
    path: "/system/apiLog",
    name: "apiLog",
    meta: {
      title: "apiLog",
     // authRequired: true,
    },
    component: () => import("../views/system/apiLog.vue"),
  },
];