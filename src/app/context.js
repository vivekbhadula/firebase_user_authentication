"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const Context = createContext();

export function StateProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect( () => {
        let userLocal = localStorage.getItem("user");
        if (userLocal) {
            userLocal = JSON.parse(userLocal)
        }
        setUser(userLocal)
    }, []);

    return (
        <Context.Provider value={{ user, setUser}}>
            {children}
        </Context.Provider>
    );
}

export function useStateContext() {
    return useContext(Context);
}