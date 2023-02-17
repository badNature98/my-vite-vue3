export default [
  {
    path: "/_test",
    component: "Layout",
    meta: { hidden: false ,title:'测试', layout:'_test'},
    children: [
      {
        path: "/",
        meta: { hidden: false , title:'测试'},
        component: () => import("@/views/_test/index.vue"),
      },
    ],
  },
];
