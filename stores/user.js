import {useAuthStore} from "#imports";
import {api} from "~/api/index.js";

export const  useUserStore = defineStore('user', () => {
   const userData = ref(null);
   const authStore = useAuthStore();
   const fetchUserData = async () => {
       const res = await api.get(`/users/${authStore.authData.id}`, {
           headers:
       {
           Authorization: `Bearer ${authStore.authData.token}`,
       }
       });
       userData.value = res.data;
   }

   const updateProfile =  async (user) => {
       try {
           await api.put(`/users`, user, {
               headers:
                   {
                       Authorization: `Bearer ${authStore.authData.token}`,
                   }
           });
       }catch (e) {
           throw new Error(e.response.data.message);
       }
   }


   return{
       userData,
       fetchUserData,
       updateProfile
   }
});