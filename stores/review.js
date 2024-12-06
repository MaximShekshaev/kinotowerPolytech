import {api} from "~/api/index.js";
import {useAuthStore} from "~/stores/auth.js";


export const useReviewStore = defineStore('review', () =>{
    const reviews = ref([]);
    const authStore = useAuthStore();

    const fetchReviewsByFilmId = async (id) => {
        const res = await api.get(`/films/${id}/reviews`);
        reviews.value = res.data.reviews;
    }

    const addReview = async (review) => {
        await api.post(`/users/${authStore.authData.id}/reviews`, review, {
    headers:{
        Authorization: `Bearer ${authStore.authData.token}`,
        }
    });
        fetchReviewsByFilmId(review.film_id);
    }

    return {
        reviews,
        fetchReviewsByFilmId,
addReview,
    }
});