import React from "react"
import { useObserver } from "mobx-react"

export const StoreContext = React.createContext()

export const StoreProvider = ({children}) => {
  const store = useObserver(() => ({
    isLogged: false,
    user: {},
    logUserIn: user => {
      store.isLogged = true
      store.user = user
    },
    logUserOut: () => {
      store.isLogged = false
      store.user = {}
      localStorage.removeItem("token")
      localStorage.removeItem("refresh")
    },
    products: [],
    setProducts: xproducts => {
      store.products = xproducts
    }
  }))
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
}

