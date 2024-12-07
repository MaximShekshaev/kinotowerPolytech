import {defineStore} from "pinia";


import {api} from "~/api/index.js";


export const useRatingStore =defineStore(`rating`, () =>{
    const ratings = ref([]);
    const authStore = useAuthStore();

    const fetchRatingsByUserId = async () => {
        const res = await api.get(`/users/${authStore.authData.id}/ratings`,{
        headers:{
            Authorization: `Bearer ${authStore.authData.token}`,
        }
    });
    ratings.value = res.data.ratings;
}

const getRatingsByUserId = computed(()=>{
    return (filmId)=>{
        return ratings.value.find((rating) => rating.film.id == filmId);
    }
});

const addRating = async (rating) => {
    try {
        await api.post(`/users/${authStore.authData.id}/ratings`, rating,{
        headers:{
            Authorization: `Bearer ${authStore.authData.token}`,
        }
    });
    await fetchRatingsByUserId();
}catch (e){
    throw new Error ( e.response.data.message);
}
}


const removeRating = async (id) => {
    await api.delete(`/users/${authStore.authData.id}/ratings/${id}`,{
        headers:{
            Authorization: `Bearer ${authStore.authData.token}`,
        }
    });
    await fetchRatingsByUserId();
}

return {
    ratings,
    authStore,
    addRating,
    fetchRatingsByUserId,
    getRatingsByUserId,
    removeRating,
}
})