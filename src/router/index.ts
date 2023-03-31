import {createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw} from "vue-router";


const routes: Array<RouteRecordRaw> = [

  {
    path: "/",
    redirect : "sign-in",
    component: () => import("../views/crafted/authentication/basic-flow/SignIn.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
            import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
            import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
            import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
      },
    ],
  },



  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layout/Layout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
      },
      {
        path:"/files",
        name:"files",
        component: () => import("@/views/Table.vue")
      },
      {
        path: "/folders",
        name: "folder",
        component: () => import("@/views/pages/folder/index.vue"),
      },
        {
          path: "/create-folder",
            name: "create-folder",
            component: () => import("@/views/pages/folder/create.vue"),

        },


    ],
  },

  {
    // the 404 route, when none of the above matches
    path: "/404",
    name: "404",
    component: () => import("@/views/crafted/authentication/Error404.vue"),
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/crafted/authentication/Error500.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
