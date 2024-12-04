<script setup lang="ts">

</script>

<template>
<div class="row mt-4">
  <div class="col md-4"></div>
  <div class="col md-4">
    <div class="card">
  <div class="card-body">
    <form action="">
    <h1 align="center">Registration</h1>
    <div>
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" placeholder="name@example.com">
  </div>
    <div>
    <label for="name" class="form-label">Name</label>
    <input type="name" class="form-control" id="name" >
    </div>
    <div>
      <label for="password" class="form-label">password</label>
      <input type="password" class="form-control" id="password" >
    </div>
    <div>
      <label for="birthday" class="form-label">birthday</label>
      <input type="birthday" class="form-control" id="birthday" >
    </div>

        <label for="gender" class="form-label">gender</label>
      <select class="form-select" aria-label="Default select example">
        <option value="name" selected>gender</option>
        <option value="1">man</option>
        <option value="2">woman</option>
      </select>
    </form>
  </div>
      <button class="btn btn-success" type="submit">SingUp</button>
</div>

  </div>

  <div class="col md-4"></div>
</div>
</template>

