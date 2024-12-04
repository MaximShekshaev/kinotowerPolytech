import {api} from "~/api/index.js";

export const useAuthStore = defineStore('auth', () => {
    const authData = ref(null);
    const authCookie = useCookie('auth');

    const saveAuthData = () => {
        if (authData.value){
            authCookie.value = btoa(JSON.stringify(authData.value));
        }
    }

    const readAuthData = () => {
        if (authCookie.value) {
            authData.value = JSON.parse(atob(authCookie.value));
        }
    }

    readAuthData();

    const signup = async (data) => {
        try {
            const res = await api.post('/auth/signup', data);
            authData.value = res.data;
            saveAuthData();
        } catch (e){
           throw new Error(e.response.data.message);
        }
    }

return{
    authData,
    signup,

}
});

