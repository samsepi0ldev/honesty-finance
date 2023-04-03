import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { StackRoutes } from './app.routes'

export function Routes () {
  return (
    <SafeAreaView className='flex-1 bg-light-100'>
      <NavigationContainer>
        <StackRoutes />
      </NavigationContainer>
    </SafeAreaView>
  )
}
