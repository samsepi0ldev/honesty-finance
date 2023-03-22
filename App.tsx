import { StatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar'
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold
} from '@expo-google-fonts/inter'

import { Routes } from './src/routes'
import { useEffect } from 'react'

export default function App () {
  async function navigationBar () {
    NavigationBar.setBackgroundColorAsync('white')
    NavigationBar.setBorderColorAsync('#eee')
    NavigationBar.setButtonStyleAsync('dark')
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
    <>
      <Routes />
      <StatusBar
        style='auto'
        backgroundColor='transparent'
        translucent
      />
    </>
  )
}
