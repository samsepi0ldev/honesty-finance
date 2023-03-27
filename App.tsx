import { StatusBar } from 'expo-status-bar'
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Routes />
      <StatusBar
        style='auto'
        backgroundColor='#FFF6E5'
        translucent
      />
    </GestureHandlerRootView>
  )
}
