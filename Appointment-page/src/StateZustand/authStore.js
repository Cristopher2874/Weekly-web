import { create } from 'zustand';
import { persist } from 'zustand/middleware';

function userAuth(user) {
    if (user === "a@gmail.com" && user !== null) {
        return true;
    } else {
        return false;
    }
};

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            setUser: (user) => set({ user }),
            logout: () => set({ user: null }),
            password: null,
            setPassword: (password) => set({ password }),
            error: null,
            setError: () => set({
                error: userAuth(get().user),
            }),
        })
    ), {
    name: 'auth-storage'
})