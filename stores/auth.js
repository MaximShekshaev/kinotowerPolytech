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

    const removeAuthData = () => {
        if (authCookie.value) {
            authData.value = null
            authCookie.value = null;
        }
    }


    const signup = async (data) => {
        try {
            const res = await api.post('/auth/signup', data);
            authData.value = res.data;
            saveAuthData();
        } catch (e){
           throw new Error(e.response.data.message);
        }
    }


    const signin = async (data) => {
        try {
            const res = await api.post('/auth/signin', data);
            authData.value = res.data;
            saveAuthData();
        }catch (e){
            throw new Error(e.response.data.message);
        }
    }

    const signout = async () => {
      api.post('/auth/signout', null, {
          headers:{
              Authorization: `Bearer ${authData.value.token}`
          }
      });
        removeAuthData();
    }


return{
    authData,
    signup,
    signin,
    signout

}
});

