import {defineStore} from "pinia";
import {api} from "~/api/index.js";



export const useFilmStore = defineStore('film', ()=>{
    const films = ref([]);
    const film = ref(null);
    const isLoading = ref(false);
    const params = ref({
        page: 1,
        size: 6,
        sortBy: 'name',
        sortDir: 'asc',
        category: null,
        country: null,
    });

    const totalFilms = ref(0);
    const currentPage = ref(1);
    const totalPages = computed(() => {
       return Math.ceil(totalFilms.value/params.value.size);
    });


    const addCategoryToParams = (category) => {
        params.value.category = category;

    }

    const addCountryToParams = (country) => {
        params.value.country = country;

    }

    const addSortToParams = (sort) => {
        params.value.sortBy = sort;

    }



    const fetchFilms = async () => {
        isLoading.value = true;
        params.value.page = currentPage.value;
        const res = await api.get('/films', {
            params:params.value,
        });
        films.value = res.data.films;
        totalFilms.value = res.data.total;
        isLoading.value = false;
    }
    fetchFilms();


    const fetchFilmById = async (id) => {
        const res = await   api.get(`/films/${id}`);
        film.value = res.data;
    }




    return {
        films,
        isLoading,
        addCategoryToParams,
        addCountryToParams,
        addSortToParams,
        fetchFilms,
        totalPages,
        currentPage,
        fetchFilmById,
        film,
    }
});