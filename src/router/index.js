import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";
import CorView from "../views/CorView.vue";
import CategoriaView from "../views/CategoriaView.vue";
import MarcaView from "../views/MarcaView.vue";
import AcessorioView from "../views/AcessorioView.vue";
import ModeloView from "../views/ModeloView.vue";
import VeiculoView from "../views/VeiculoView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/categorias",
      name: "categorias",
      component: CategoriaView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/logout",
      name: "logout",
      component: LogoutView,
    },
    {
      path: "/cores",
      name: "cores",
      component: CorView,
    }, 
    {
      path: "/marcas",
      name: "marcas",
      component: MarcaView,
    },
    {
      path: "/acessorios",
      name: "acessorios",
      component: AcessorioView,
    },
    {
      path: "/modelos",
      name: "modelos",
      component: ModeloView
    },
    {
      path: "/veiculos",
      name: "veiculos",
      component: VeiculoView
    },
  ],
});

export default router;
