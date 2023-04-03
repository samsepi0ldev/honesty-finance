import { CheckCircle, XCircle } from 'phosphor-react-native'
import { TouchableWithoutFeedback, View, Text } from 'react-native'
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated'

interface AlertMessageProps {
  type: 'error' | 'success'
  message: string
  onPress?: () => void
}

export function AlertMessage ({ type, message, onPress }: AlertMessageProps) {
  const replyType = {
    error: {
      lib: <XCircle size={64} color='#FD3C4A' weight='fill' />
    },
    success: {
      lib: <CheckCircle size={64} color='#5233FF' weight='fill' />
    }
  }

  const Icon = replyType[type].lib
  return (
    <View className='flex-1 absolute inset-0'>
      <TouchableWithoutFeedback onPress={onPress}>
        <Animated.View entering={FadeIn} className='flex-1 bg-dark-100/40 absolute inset-0' />
      </TouchableWithoutFeedback>
      <Animated.View entering={ZoomIn} className='w-80 py-4 px-6 bg-light-100 rounded-2xl m-auto items-center'>
        {Icon}
        <Text className='text-center mt-2 text-sm font-inter-medium text-dark-100'>
          {message}
        </Text>
      </Animated.View>
    </View>
  )
}
