<script setup lang="ts">
import {useRatingStore} from "#imports";

const props = defineProps({
  filmId: {
    type: Number,
    required: true,
  }
});
const ratingStore = useRatingStore();
ratingStore.fetchRatingsByUserId();

const sendRating = async (score:number) => {
  try {
    await ratingStore.addRating({
      film_id: props.filmId,
      ball: score,

    });
    alert(`your rating is ${props.filmId}!`);
  } catch (e: any) {
    alert(`Error: ${e.message}`);
  }
}
</script>

<template>
  <ul class="rating-stars">
    <li
        v-for="i in 5"
        :key="i"
        class="star-item">
      <span
          v-if="ratingStore.getRatingsByUserId(filmId)"
          class="star-link">
         <i
             v-if="i <= ratingStore.getRatingsByUserId(filmId).score "
             class="bi bi-star-fill"></i>
         <i v-else class="bi bi-star"></i>
      </span>
      <a v-else
         @click.prevent="sendRating(i)"
         class="star-link"
         href=""><i class="bi bi-star"></i></a>
    </li>

  </ul>
</template>

<style scoped>
.rating-stars {
  list-style-type: none;
}
.star-link {
  list-style-type: none;
  font-size: 2.5rem;
  color: gold;
}
.star-link:hover {
  color: #000000;
}
.person {
  list-style-type: none;
  font-size: 3rem;
}
</style>