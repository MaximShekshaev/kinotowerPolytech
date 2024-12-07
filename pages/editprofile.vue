<script setup lang="ts" >
import {useUserStore} from "~/stores/user";
import {useRatingStore, useReviewStore} from "#imports";


const userStore = useUserStore();
const reviewStore = useReviewStore();
reviewStore.fetchReviewsByUserId();
const removeReview = async (id: number) => {
  await  reviewStore.removeReview(id)
  alert('Review removed successfully')
};

const ratingStore = useRatingStore();
ratingStore.fetchRatingsByUserId();
const removeRating = async (id: number) => {
  await ratingStore.removeRating(id);
  alert('Rating removed successfully.');
}

const genderStore = useGenderStore();
const fio = ref('');
const email = ref('');
const birthday =ref('');
const gender = ref(0);
const readUserData = async () => {
  await userStore.fetchUserData();
  fio.value = userStore.userData.fio;
  email.value = userStore.userData.email;
  birthday.value = userStore.userData.birthday;
  gender.value = userStore.userData.gender.id;
}
readUserData();
const editProfile = async () => {
  try {
    await userStore.updateProfile({
      fio: fio.value,
      email: email.value,
      birthday: birthday.value,
      gender_id: gender.value,
    });
  await  userStore.fetchUserData();
    alert("edit profile")
  }catch (error) {
    alert(error.message);
  }
}
</script>

<template>
  <div v-if="userStore.userData" class="row">
    <div class="col">
      <h3>Name: {{userStore.userData.fio}}</h3>
      <h3>COUNT SCORES : {{userStore.userData.ratingCount}}</h3>
      <h3>COUNT REVIEWS: {{userStore.userData.reviewCount}}</h3>
    </div>


    <div class="row">
      <div class="col-6">
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">MY PROFILE</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">MY REVIEWS</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">MY SCORES</button>
          </li>
        </ul>
      </div>
    </div>


    <div class="tab-content" id="pills-tabContent">
      <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
        <p> EMAIL: {{userStore.userData.email}}</p>
        <p> BIRTHDAY: {{userStore.userData.birthday}}</p>
        <p>GENDER: {{userStore.userData.gender.name}}</p>
        <div class="col-6">
          <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>


          <button type="button" class="btn btn-outline-dark">Delete account</button>
        </div>


      </div>
      <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
        <div class="row">
          <div class="col">
            <div id="app">
              <div
                  v-for="review in reviewStore.userReviews"
                  :key="review.id"
                  class="film-item">
                <div class="film-info">
                  <p><strong>Film: {{review.film.name}}</strong>  </p>
                  <p><strong>Approved:{{ (review.is_approved)? 'Yes' : 'NO' }}</strong>  </p>
                  <p><strong>Date: {{review.created_at}}</strong>  </p>
                  <p><strong>Message: {{review.message}}</strong>  </p>
                </div>
                <button @click="removeReview(review.id)" class="remove-btn">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">
        <div id="app">
          <div
              v-for="rating in ratingStore.ratings"
              :key="rating.id"
              class="film-item">
            <div class="film-info">
              <p><strong>Film: {{ rating.film.name }} </strong> </p>
              <p><strong>Date: {{ rating.created_at }}</strong> </p>
              <p><strong>Score: {{ rating.score }}</strong> </p>
            </div>
            <button @click="removeRating(rating.id)" class="remove-btn">Remove</button>
          </div>
        </div>
      </div></div>

  </div>

  <div v-else class="text-center">
    <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>


  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <form @submit.prevent="editProfile" action="" id="editProfile">
            <h1>Edit profile</h1>
            <div>
              <label  for="email" class="form-label">Email address</label>
              <input v-model="email" type="email" class="form-control" id="email" placeholder="name@example.com">
            </div>
            <div>
              <label  for="fio" class="form-label">Name</label>
              <input v-model="fio" type="fio" class="form-control" id="fio" >
            </div>
            <div>
              <label  for="date" class="form-label">birthday</label>
              <input v-model="birthday" type="date" class="form-control" id="birthday" >
            </div>

            <label for="gender" class="form-label">Gender</label>
            <select v-model="gender" class="form-select" aria-label="Default select example">
              <option  value="0" selected>gender</option>
              <option
                  v-for="gender in genderStore.genders"
                  :key="gender.id"
                  :value="gender.id">{{gender.name}}</option>
            </select>



          </form>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" form="editProfile" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped>
.film-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.remove-btn {
  background-color: red;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.remove-btn:hover {
  background-color: darkred;
}
</style>