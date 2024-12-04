<script setup lang="ts">


const categoryStore = useCategoryStore();
const countryStore = useCountryStore();
const filmStore = useFilmStore();
const category = ref(null);
const country = ref(null);
const sort = ref('name');
const filter = () => {
  filmStore.addCategoryToParams(category.value);
  filmStore.addCountryToParams(country.value);
  filmStore.addSortToParams(sort.value);
  filmStore.fetchFilms();
}
const resetFilter = () => {
  category.value = null;
  country.value = null;
  sort.value = 'name';
  filter()
}

const goto = (page: number) => {
  page = (page < 1) ? 1 : page;
  page = (page > filmStore.totalPages) ? filmStore.totalPages : page;
  filmStore.currentPage = page;
filmStore.fetchFilms();
};


</script>

<template>
  <div class="row">
    <div class="col-md-4 my-3 ">
      <select  v-model="category" @change="filter" class="form-select" aria-label="Default select example">
        <option :value="null" selected>Open this select menu</option>
        <option v-for="category in categoryStore.categories"
                :key="category.id"
                :value="category.id">{{category.name}} ({{category.filmCount}})</option>
      </select>
    </div>
    <div class="col-md-4 my-3">
      <select v-model="country" @change="filter" class="form-select" aria-label="Default select example">
        <option value="null" selected>select country</option>
        <option v-for="country in countryStore.countries"
                :key="country.id"
                :value="country.id">{{country.name}}</option>

      </select>
    </div>
    <div class="col-md-2 my-3">
      <select v-model="sort" @change="filter" class="form-select" aria-label="Default select example">
        <option value="name" selected>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
    <div class="col-md-2 my-3">
      <button @click="resetFilter"  class="btn btn-danger" type="submit">reset</button>
    </div>
  </div>



  <div v-if="!filmStore.isLoading" class="row row-cols-1 row-cols-md-3 my-1 g-4">
    <div class="col" v-for="film in filmStore.films" :key="film.id">
      <div class="card h-100">
        <img v-if="film.link_img" :src="film.link_img" class="img-thumbnail" alt="tor" style="height: 500px;">
        <img v-else src="https://cdn1.ozone.ru/s3/multimedia-i/6838746030.jpg" class="img-thumbnail"  alt="tor" style="height: 500px;">
        <div class="card-body">
          <h5 class="card-title">{{film.name}}</h5>
          <p class="card-text"> {{film.ratingAvg}}</p>
          <p class="card-text">{{film.duration}} min </p>
          <p class="card-text"><template v-for="category in film.categories" :key="category.id">
            {{category.name}},
          </template></p>





        </div>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button class="btn btn-outline-success my-4" type="submit">смотреть</button>
        </div>
      </div>
    </div>
  </div>


  <div v-else class="text-center">
    <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>

  </div>

  <nav class="d-flex justify-content-center my-5" aria-label="Page navigation example">
    <ul class="pagination">
      <li
          :class="{'disabled': filmStore.currentPage === 1}"
          class="page-item">
        <a
            @click.prevent = "goto(filmStore.currentPage -1)"
            class="page-link"
            href="#">Previous</a></li>
      <li
          v-for="page in filmStore.totalPages"
          :key="page"
          class="page-item"
      :class="{'active': page === filmStore.currentPage}"
      >
        <a @click.prevent="goto(page)"
            class="page-link"
           href="#">{{page}}</a>

      </li>
      <li
          :class="{'disabled': filmStore.currentPage === 3}"
          class="page-item">
        <a
            @click.prevent = "goto(filmStore.currentPage + 1)"
            class="page-link"
            href="#">Next</a></li>
    </ul>
  </nav>


</template>