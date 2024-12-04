<script setup lang="ts">

import {useRouter} from "#imports";

const  authStore =  useAuthStore();
const email = ref('');
const password = ref('');
const router = useRouter();
const errorMessage = ref('')
const login = async () => {
  if(email.value && password.value){
    try {
      await authStore.signin({

        email: email.value,
        password: password.value,
      })
      await router.push('/');
    }catch (e:any) {
      errorMessage.value = e.message;

    }

  }
}
</script>

<template>
  <div class="row mt-4">
    <div class="col md-4"></div>
    <div class="col md-4">
      <div class="card">
        <div class="card-body text-center">
          <form @submit.prevent="login" action="">
            <h1>Authentication</h1>
            <div>
              <label  for="email" class="form-label">Email address</label>
              <input v-model="email" type="email" class="form-control" id="email" placeholder="name@example.com">
            </div>
            <div>
              <label   for="password" class="form-label">password</label>
              <input v-model="password" type="password" class="form-control" id="password" >
            </div>
            <div class="col my-4">
              <button  class="btn btn-success" type="submit">Sign in</button>
            </div>
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              {{errorMessage}}
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="col md-4"></div>
  </div>

</template>

