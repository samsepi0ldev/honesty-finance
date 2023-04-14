import { Plus } from 'phosphor-react-native'
import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import Animated, { useDerivedValue, useAnimatedStyle, withSpring, interpolate, Extrapolate } from 'react-native-reanimated'

import IncomeIcon from '../assets/Income.svg'
import ExpenseIcon from '../assets/Expense.svg'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

export function IconNewTransaction () {
  const { navigate } = useNavigation()
  const [fabIsOpened, setFabIsOpened] = useState(false)
  const progress = useDerivedValue(() => {
    return fabIsOpened
      ? withSpring(1, {
        velocity: 10
      })
      : withSpring(0, {
        velocity: 10
      })
  })
  const animatedStyles = (x: boolean, y: boolean, value: number, left?: boolean) => (
    useAnimatedStyle(() => {
      const translate = interpolate(
        progress.value,
        [0, 1],
        [0, -value],
        {
          extrapolateLeft: Extrapolate.CLAMP
        }
      )
      const opacity = interpolate(
        progress.value,
        [0, 0.5, 1],
        [0, 0, 1]
      )
      if (x && y) {
        return {
          transform: [{ translateX: left ? translate : -(translate) }, { translateY: translate }],
          opacity
        }
      } else if (x) {
        return {
          transform: [{ translateX: translate }],
          opacity
        }
      } else {
        return {
          transform: [{ translateY: translate }],
          opacity
        }
      }
    })
  )
  return (
    <View className='relative'>
      <Animated.View
        className='absolute left-1 bottom-1'
        style={animatedStyles(true, true, 64, true)}>
        <TouchableOpacity
          onPress={() => {
            navigate('new-income')
            setFabIsOpened(false)
          }}
          activeOpacity={0.7}
          className='bg-green-100 w-14 h-14 rounded-full items-center justify-center'>
          <IncomeIcon fill='#fff' />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        className='absolute left-1 bottom-1'
        style={animatedStyles(true, true, 64)}>
        <TouchableOpacity
          onPress={() => {
            navigate('new-expense')
            setFabIsOpened(false)
          }}
          activeOpacity={0.7}
          className='bg-red-100 w-14 h-14 rounded-full items-center justify-center'>
          <ExpenseIcon fill='#fff' />
        </TouchableOpacity>
      </Animated.View>
      <TouchableWithoutFeedback
        onPress={() => setFabIsOpened(!fabIsOpened)}
      >
        <View className='bg-violet-100 rounded-full w-16 h-16 -mt-4 border-4 border-light-100 items-center justify-center'>
          <Plus
            size={32}
            color='#fff'
            weight='bold'
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}
