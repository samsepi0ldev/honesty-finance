import { View } from 'react-native'
import Animated, { Extrapolate, interpolate, type SharedValue, useAnimatedStyle } from 'react-native-reanimated'

interface PaginationProps {
  x: SharedValue<number>
  screenWidth: number
  data: any[]
}

export function Pagination ({ x, screenWidth, data }: PaginationProps) {
  const PAginationComp = ({ i }: { i: number }) => {
    const animatedDotStyle = useAnimatedStyle(() => {
      const size = interpolate(
        x.value,
        [(i - 1) * screenWidth, i * screenWidth, (i + 1) * screenWidth],
        [8, 16, 8],
        Extrapolate.CLAMP
      )
      const opacity = interpolate(
        x.value,
        [(i - 1) * screenWidth, i * screenWidth, (i + 1) * screenWidth],
        [0.12, 1, 0.12],
        Extrapolate.CLAMP
      )
      return {
        width: size,
        height: size,
        opacity
      }
    })
    return (
      <Animated.View
        key={i}
        className='w-2 h-2 bg-violet-100 rounded-full'
        style={animatedDotStyle}
      />
    )
  }

  return (
    <View
      className='flex-row items-center justify-between px-5 mx-auto mb-8'
      style={{
        width: screenWidth / data.length - (16 * data.length),
        height: 16
      }}
    >
      {data.map((_, i) => (
        <PAginationComp key={i} i={i} />
      ))}
    </View>
  )
}
