import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

function userAuth(users, user, password) {
    if (!Array.isArray(users)) {
        users = [];
    }
    
    const userExists = users.findIndex((newUser) => newUser.email === user);

    if (userExists >= 0 && users[userExists].password === password) {
        return true;
    } else {
        return false;
    }
};

function addUsers(users, user) {
    if (!Array.isArray(users)) {
        users = [];
    }
    
    const userExists = users.findIndex((newUser) => newUser.email === user.email);

    if (userExists >= 0) {
        return [...users];
    } else {
        return [...users, user];
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
            setError: () => set((state)=>({
                error: userAuth(state.users, get().user, get().password),
            })),
            users:[],
            setUsers: (user) => set((state) => ({
                users: addUsers(state.users, user),
            })),
            getUser: (email) => get().users.find((user) => user.email === email),
            clearUsers: () => set({ users:[] })
        })
    ),{
    name: 'auth-storage'
})

function addPet(pets, pet) {
    if (!Array.isArray(pets)) {
        pets = [];
    }
    
    const petExists = pets.findIndex((newpet) => newpet.name === pet.name && newpet.owner === pet.owner);

    if (petExists >= 0) {
        return [...pets];
    } else {
        return [...pets, pet];
    }
};

export const usePetStore = create(
    persist(
        (set, get) => ({
            pets: [],
            setPets: (pets) => set({ pets }),
            getPets: (owner) => get().pets.filter((pet) => pet.owner === owner),
            clearPets: () => set({ pets:[] }),
            addPet: (pet) => set((state) => ({
                pets: addPet(state.pets, pet),
            })),
        })
    ),{
        name: 'pet-storage',
})