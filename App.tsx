import { StatusBar } from 'expo-status-bar'
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold
} from '@expo-google-fonts/inter'

import { Routes } from './src/routes'

export default function App () {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold
  })

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
