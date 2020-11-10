import React from "react"
import { useObserver, useLocalStore } from "mobx-react"
import { makeAutoObservable } from "mobx"

export const StoreContext = React.createContext()

export const StoreProvider = ({children}) => {
  const store = useLocalStore(() => ({
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
    roles: {},
    setRoles: roles => {
      store.roles = roles
    }
  }))
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
}

