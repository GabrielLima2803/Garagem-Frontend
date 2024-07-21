<script setup>
import { onMounted } from 'vue';
import { PassageUser } from '@passageidentity/passage-elements/passage-user';
import { useAuthStore } from '@/stores/auth';
import '@mdi/font/css/materialdesignicons.css';
import LogoTitle from '@/components/templates/LogoTitle.vue';

const authStore = useAuthStore();

</script>

<template>
  <div id="app">
    <header>
      <div class="header-content">
        <div class="logo">
          <logo-title class="pl-0" />
        </div>
        <div class="links">
          <router-link :to="{ name: 'home' }"> <i class="mdi mdi-home"> </i></router-link> |
          <router-link to="/categorias">Categorias</router-link> |
          <div v-if="authStore.loggedIn">
            <router-link to="/logout">Logout</router-link> | {{ authStore.user.email }}
          </div>
          <router-link v-else to="/login">Login</router-link> |
          <router-link to="/cores">Cores</router-link> |
          <router-link to="/acessorios">Acessório</router-link> |
          <router-link to="/marcas">Marca</router-link> |
          <router-link to="/veiculos">Veículos</router-link> |
          <router-link to="/modelos">Modelos</router-link> 
        </div>
      </div>
    </header>
    <main>
      <RouterView />
    </main>
    <footer>
      <div class="links">
        <RouterLink to="/">Help</RouterLink>
        <RouterLink to="/">Contact Us</RouterLink>
        <RouterLink to="/">Privacy & Terms</RouterLink>
      </div>
      <div class="iconsFooter">
        <i class="mdi mdi-facebook" />
        <i class="mdi mdi-twitter" />
        <i class="mdi mdi-instagram" />
      </div>
    </footer>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: rgb(121, 121, 121);
  color: #fff;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #000;
}

.logo {
  display: flex;
  justify-content: center;
}

.logo img {
  width: 6rem; /* Aumenta o tamanho da logo */
  height: auto; /* Mantém a proporção da logo */
  object-fit: cover;
}

.links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  font-size: 20px;
}

.links a {
  color: #000000;
  text-decoration: none;
  transition: all 0.3s ease;
}

.links a:hover {
  color: #fff;
  transition: 0.3s;
  text-decoration: none;
}

main {
  flex: 1;
  padding: 20px;
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: rgb(121, 121, 121);
}

.footer .links {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 4rem;
  font-size: 1.2rem;
  color: #000;
}

.footer .links a {
  text-decoration: none;
}

.iconsFooter {
  padding-right: 3rem;
  display: flex;
  gap: 4rem;
  font-size: 2.2rem;
}

i:hover {
  color: #fff;
  transition: 0.3s;
  text-decoration: none;
}
</style>
