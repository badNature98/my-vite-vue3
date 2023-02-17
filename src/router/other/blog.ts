export default [
  {
    path: "/blog",
    component: "Layout",
    meta: {  title:'博客',layout:'Blog'},
    children: [
      {
        path: "/home",
        meta: { hidden: false , title:'主页'},
        component: () => import("@/views/blog/home/index.vue"),
      },
    ],
  },
];
