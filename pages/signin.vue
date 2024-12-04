<script setup lang="ts">

</script>

<template>
  <div class="row mt-4">
    <div class="col md-4"></div>
    <div class="col md-4">
      <div class="card">
        <div class="card-body text-center">
          <form @submit.prevent="register" action="">
            <h1>Authentication</h1>
            <div>
              <label for="email" class="form-label">Email address</label>
              <input v-model="email" type="email" class="form-control" id="email" placeholder="name@example.com">
            </div>
            <div>
              <label for="fio" class="form-label">Name</label>
              <input v-model="fio" type="text" class="form-control" id="fio" >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

