import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './app.routes'
import { SafeAreaView } from 'react-native-safe-area-context'

export function Routes () {
  return (
    <SafeAreaView className='flex-1 bg-light-100'>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </SafeAreaView>
  )
}
