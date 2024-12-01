import { createRouter, createWebHistory } from "vue-router";

import ListStudent from "@/components/pages/ListStudent.vue";
import AddStudent from "@/components/pages/student/AddStudent.vue";
import EditStudent from "@/components/pages/student/EditStudent.vue";
import DetailStudent from "@/components/pages/student/DetailStudent.vue";

const routes = [
    {path: '/', component: ListStudent, name: 'ListStudent'},
    {path: '/add', component: AddStudent, name: 'AddStudent'},
    {path: '/edit/:id', component: EditStudent, props: true, name: 'EditStudent'},
    {path: '/detail/:id', component: DetailStudent, props: true, name: 'DetailStudent'},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;
