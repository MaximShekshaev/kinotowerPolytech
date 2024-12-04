<template>

  <header>

    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container-fluid">
        <NuxtLink class="navbar-brand" to="/">KinoTower</NuxtLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarCollapse">
          <template v-if="!authStore.authData">
          <button @click="$router.push('/signin')" class="btn btn-outline-success me-3" type="submit">Sign in</button>
          <button @click="$router.push('/signup')" class="btn btn-outline-danger" type="submit">Sign up</button>
          </template>
          <template v-else>
            <button @click="logout" class="btn btn-outline-danger" type="submit">sign out</button>
          </template>
        </div>
      </div>
    </nav>
  </header>

  <main class="flex-shrink-0">
    <div class="container">
      <slot />
    </div>
  </main>

  <footer class="footer mt-auto py-2 bg-body-tertiary fixed-bottom">
    <div class="container">
      <span class="text-body-secondary">&copy;Kino-Tower-2024</span>
    </div>
  </footer>




</template>
<script setup lang="ts">
import {useRouter} from "#imports";

const authStore = useAuthStore();
const logout = async () => {
  await  authStore.signout();
  router.push('/');
}
const router = useRouter();
</script>