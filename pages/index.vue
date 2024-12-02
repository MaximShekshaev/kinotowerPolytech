<script lang="ts">


</script>
<template>
<div class="row">
  <div class="col-md-4 my-3">
    <select class="form-select" aria-label="Default select example">
    <option selected>Select ganre</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
  </div>
  <div class="col-md-4  my-3">
    <select class="form-select" aria-label="Default select example">
      <option selected>Select country</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </div>
  <div class="col-md-2  my-3">
    <select class="form-select" aria-label="Default select example">
      <option value="name">Name</option>
      <option value="year">Year</option>
      <option value="rating">rating</option>
    </select>
  </div>
  <div class="col-md-2  my-3">
    <button class="btn btn-outline-warning" type="submit">Reset</button>
  </div>
</div>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col">
      <div class="card h-100">
        <img src="https://upload.wikimedia.org/wikipedia/ru/thumb/3/30/Iron_man_filmposter.jpg/640px-Iron_man_filmposter.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Железный человек</h5>
          <p class="card-text">4.7</p>
          <p class="card-text"> 2 ч 6 мин</p>
          <p class="card-text">Боевик/Научная фантастика</p>
        </div>
        <div class="card-footer">
        <button class="btn btn-outline-success" type="submit">Смотреть</button>
      </div>
      </div>
    </div>

  </div>



  <nav class="d-flex justify-content-center mt-4" aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item"><a class="page-link" href="#"> &laquo; </a></li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item"><a class="page-link" href="#"> &raquo; </a></li>
    </ul>
  </nav>
</template>