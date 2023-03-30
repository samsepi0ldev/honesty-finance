import { forwardRef, type ReactNode, useCallback, useImperativeHandle } from 'react'
import { View, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT / 4

type BottomSheetProps = {
  children?: ReactNode
}
export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void
  isActive: () => void
}

export const BottomSheet = forwardRef<BottomSheetRefProps, BottomSheetProps>(({ children }, ref) => {
  const translateY = useSharedValue(0)
  const context = useSharedValue({ y: 0 })
  const active = useSharedValue(false)

  const scrollTo = useCallback((destination: number) => {
    'worklet'
    active.value = destination !== 0
    translateY.value = withSpring(destination, {
      damping: 50,
      stiffness: 400
    })
  }, [])

  const isActive = useCallback(() => {
    return active.value
  }, [])

  useImperativeHandle(ref, () => ({
    scrollTo,
    isActive
  }), [scrollTo, isActive])

  const gesture = Gesture
    .Pan()
    .onStart(() => {
      context.value = { y: translateY.value }
    })
    .onUpdate((e) => {
      translateY.value = e.translationY + context.value.y
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
    })
    .onEnd(() => {
      if (translateY.value > (-SCREEN_HEIGHT / 4) + 100) {
        scrollTo(0)
      } else {
        scrollTo(-200)
      }
    })
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{
        translateY: translateY.value
      }]
    }
  })

  const backDropAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, MAX_TRANSLATE_Y],
      [0, 0.4]
    )
    const display = !active.value ? 'none' : 'flex'
    return {
      opacity,
      display
    }
  })

  return (
    <>
      <TouchableWithoutFeedback onPress={() => scrollTo(0)}>
        <Animated.View
          style={backDropAnimation}
          className='bg-dark-100 absolute inset-0' />
      </TouchableWithoutFeedback>
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[{
            height: SCREEN_HEIGHT / 4,
            top: SCREEN_HEIGHT
          }, animatedStyles]}
          className='bg-light-100 w-full absolute mt-auto p-4 pt-1.5 rounded-t-3xl'>
          <View className='h-6 w-20 items-center justify-center mx-auto'>
            <View className='h-1 w-9 bg-violet-40 rounded-full' />
          </View>
          <View className='flex-row mt-7'>
            {children}
          </View>
        </Animated.View>
      </GestureDetector>
    </>
  )
})
