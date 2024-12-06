<script setup lang="ts">
import {useFilmStore} from "~/stores/film";
import {useAuthStore, useReviewStore} from "#imports";
import RatingStars from "~/components/RatingStars.vue";

const filmStore = useFilmStore();
const reviewsStore = useReviewStore();
const route = useRoute();
const authStore = useAuthStore();
filmStore.fetchFilmById(route.params.id);
reviewsStore.fetchReviewsByFilmId(route.params.id);
const message = ref('');
const sendReview = async () => {
  if (message.value) {
    await reviewsStore.addReview({
      film_id: route.params.id,
      message: message.value

    });
  }
}
</script>

<template>
  <template v-if="filmStore.film">
    <div class="row">
      <div class="col-md-2">
        <h2><i class="bi bi-star-fill fs-3">{{ filmStore.film.ratingAvg }}</i></h2>
      </div>
      <div class="col-md-8">
        <iframe width="900" height="600"  :src="filmStore.film.link_video" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
      <div class="col-md-2">

        <RatingStars v-if="authStore.authData" :film-id="filmStore.film.id"/>

      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <h1>{{filmStore.film.name}}</h1>
      </div>
      <div class="row">
        <div class="col-md-10">
          {{filmStore.film.duration}} min | {{filmStore.film.country.name}} | {{filmStore.film.year_of_issue}} | {{filmStore.film.age}} | {{filmStore.film.created_at}} |
          <template v-for="category in filmStore.film.categories"
                    :key="category.id">
            {{category.name}} |
          </template>
        </div>
        <div class="col-md-2">
          <a href="_blank">Kinopoisk</a>
        </div>
      </div>
      <div v-if="authStore.authData" class="row">
        <div class="col-md-11">
          <div>
            <label for="exampleFormControlTextarea1" class="form-label">Add review</label>
            <textarea v-model="message" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
          <div class="col-md-1">
            <button @click="sendReview" class="btn btn-outline-success my-4 fs-2" type="submit">Отправить</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="row fs-5">
        <h2>Reviews</h2>
        <hr>
        <div v-for="review in reviewsStore.reviews"
             :key="review.id"
             class="row">
          <div class="col-10">
            <ul class="person">
              <li>
                <i class="bi bi-person">{{review.user.fio}}</i>
              </li>
            </ul>
            <p>{{review.message}}</p>
          </div>
          <div class="col-2">
            {{review.created_at}}
          </div>
        </div>
      </div>
    </div>
  </template>
  <div v-else class="text-center">
    <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>

  </div>
</template>

<style scoped>

</style>