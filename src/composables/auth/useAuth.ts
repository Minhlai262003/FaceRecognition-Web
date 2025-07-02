import { ref } from 'vue';

const userName = ref<{ name: string } | null>(null);
const name = "Maddox";
export function useAuth() {
    const fetchUser = async () => {
        userName.value = { name: name };
    }
    return {
        userName,
        fetchUser
    }
}