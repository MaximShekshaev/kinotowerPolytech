import {api} from "~/api/index.js";
import {useAuthStore} from "~/stores/auth.js";


export const useReviewStore = defineStore('review', () =>{
    const reviews = ref([]);
    const userReviews = ref([]);
    const authStore = useAuthStore();


    const removeReview = async (id) => {
        await api.delete(`/users/${authStore.authData.id}/reviews/${id}`, {
            headers:{
                Authorization: `Bearer ${authStore.authData.token}`,
            }
        });
         await fetchReviewsByUserId();
    }


    const fetchReviewsByUserId = async () => {
        const res = await api.get(`/users/${authStore.authData.id}/reviews`, {
            headers:{
                Authorization: `Bearer ${authStore.authData.token}`,
            }
        });
        userReviews.value = res.data.reviews;
    }

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
        userReviews,
        fetchReviewsByUserId,
        removeReview
    }
});