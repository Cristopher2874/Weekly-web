import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useProductStore = create(
    persist(
        (set, get) => ({
            data: [],
            setData: (data) => set({ data }),
            getSingleItem: (id) => get().data.find(item => item.id === id),
            category: '',
            setCategory: (category) => set({ category }),
            categories: [],
            setCategories: (categories) => set({ categories }),
            searchTerm: '',
            setSearchTerm: (searchTerm) => set({ searchTerm }),
        })
    ), {
        name: 'data',
    }
)