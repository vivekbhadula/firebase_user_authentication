"use client";
import { createContext, useContext, useState } from "react";

export const Context = createContext();

export function StateProvider({ children }) {
    const [user, setUser] = useState(null);

    return (
        <Context.Provider value={{ user, setUser}}>
            {children}
        </Context.Provider>
    );
}

export function useStateContext() {
    return useContext(Context);
}