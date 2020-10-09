import React from "react"
import { useLocalObservable } from "mobx-react"

export const StoreContext = React.createContext()

export const StoreProvider = ({children}) => {
  const store = useLocalObservable(() => ({
    isLogged: false,
    user: {},
    logUserIn: user => {
      store.isLogged = true
      store.user = user
    },
    logUserOut: () => {
      store.isLogged = false
      store.user = {}
    }
   
  }))
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
}

