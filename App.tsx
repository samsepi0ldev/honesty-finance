import { StatusBar } from 'react-native'
import * as NavigationBar from 'expo-navigation-bar'
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold
} from '@expo-google-fonts/inter'
import { useEffect } from 'react'

import { Routes } from './src/routes'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import './src/lib/dayjs'
import { AuthProvider } from './src/context/auth'

export default function App () {
  async function navigationBar () {
    await NavigationBar.setBackgroundColorAsync('white')
    await NavigationBar.setBorderColorAsync('#eee')
    await NavigationBar.setButtonStyleAsync('dark')
  }
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold
  })

  useEffect(() => {
    void navigationBar()
  }, [])

  if (!fontsLoaded) return null
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Routes />
        <StatusBar
          barStyle='dark-content'
          backgroundColor='#FFF6E5'
          translucent
        />
      </GestureHandlerRootView>
    </AuthProvider>
  )
}
