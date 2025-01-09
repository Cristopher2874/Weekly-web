import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useProductStore = create(
    persist(
        (set) => ({
            data: [],
            setData: (data) => set({ data }),
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