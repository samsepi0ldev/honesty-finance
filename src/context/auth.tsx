import { type ReactNode, createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { api } from '../lib/api'
import { useNavigation } from '@react-navigation/native'

type User = {
  name: string
}

type AccessTokenType = {
  access_token: string
}

interface AuthContextProps {
  user?: User | null
  isLogged: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider ({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()

  async function login (email: string, password: string) {
    const response = await api.post('auth/login', {
      email,
      password
    })
    if (response.data.access_token) {
      api.defaults.headers.common.Authorization = `Bearer ${response.data.access_token as string}`
      setUser({ name: 'Elivelton Santos' })
      AsyncStorage.setItem('@api_access_token', response.data.access_token)
      AsyncStorage.setItem('@user', JSON.stringify({ name: 'Elivelton Santos' }))
    }
  }
  async function logout () {
    setUser(undefined)
    await AsyncStorage.clear()
  }

  useEffect(() => {
    void (async () => {
      const accessToken = await AsyncStorage.getItem('@api_access_token')
      const userData = await AsyncStorage.getItem('@user')
      if (accessToken && userData) {
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        setUser(JSON.parse(userData) as User)
      }
    })()
  }, [])
  return (
    <AuthContext.Provider value={{
      isLogged: !!user,
      login,
      logout,
      user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth () {
  return useContext(AuthContext)
}
