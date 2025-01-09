import { create } from 'zustand'
import { persist } from 'zustand/middleware'

function itemExist(cart, item) {
    const itemExists = cart.findIndex(cartItem => cartItem.id === item.id);

    if (itemExists >= 0) {
        if (cart[itemExists].quantity >= 10) return cart;
        const updatedCartItem = [...cart];
        updatedCartItem[itemExists].quantity++;
        return [...updatedCartItem];
    } else {
        item.quantity = 1;
        return [...cart, item];
    }
};

export const useStore = create(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => set((state) => ({
                items: itemExist(state.items, item),
            })),
            clearCart: () => set({ items: [] }),
            setCartItems: (items) => set({ items }),
            getTotalItems: () => get().items.length,
            getTotalPrice: () => get().items.reduce((acc, item) => acc + (item.quantity * item.price), 0),
        })
    ), {
        name: 'cart-storage',
    }
)