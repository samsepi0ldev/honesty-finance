import { useFocusEffect } from '@react-navigation/native'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import { CaretLeft, CaretRight } from 'phosphor-react-native'
import { useCallback, useState } from 'react'
import { StatusBar, View, Text, ScrollView, TouchableOpacity } from 'react-native'

dayjs.extend(localeData)
const months = dayjs.months()

export function Category () {
  const [month, setMonth] = useState(dayjs().month())
  useFocusEffect(() => {
    StatusBar.setBackgroundColor('#7F3DFF')
    StatusBar.setBarStyle('light-content')
  })
  const previousMonth = useCallback(() => {
    if (month > 0) {
      setMonth(month => month - 1)
    }
  }, [month])
  const nextMonth = useCallback(() => {
    if (month < (months.length - 1)) {
      setMonth(month => month + 1)
    }
  }, [month])
  return (
    <View className='flex-1 bg-violet-100'>
      <View className='flex-row items-center justify-between px-4 my-9'>
        <TouchableOpacity onPress={previousMonth}>
          <CaretLeft size={32} weight='bold' color='#fff' />
        </TouchableOpacity>
        <Text className='text-2xl font-inter-medium text-light-80 capitalize'>{months[month]}</Text>
        <TouchableOpacity onPress={nextMonth}>
          <CaretRight size={32} weight='bold' color='#fff' />
        </TouchableOpacity>
      </View>
      <View className='bg-light-80 rounded-t-3xl flex-1 p-4'>
        <ScrollView
          className='h-96'
          showsVerticalScrollIndicator={false}
        >
          <View className='w-full items-start justify-center p-4 bg-light-100 rounded-2xl border border-light-60'>
            <View className='p-2 flex-row items-center justify-center bg-light-80 border border-light-60 rounded-full'>
              <View className='w-3.5 h-3.5 rounded-full bg-yellow-100 mr-2' />
              <Text className='text-sm font-inter-medium text-dark-50'>Shopping</Text>
            </View>
            <Text className='text-2xl font-inter-semibold text-dark-100 mt-2'>Montante: $150</Text>
            <View className='w-full bg-light-60 h-3 rounded-full mt-2'>
              <View
                style={{
                  width: '30%'
                }}
                className='bg-yellow-100 h-full rounded-full'
              />
            </View>
            <Text className='text-sm font-inter-regular text-red-100 mt-2'>Essa categoria faz parte de 30% do faturamento!</Text>
          </View>

          <View className='w-full items-start justify-center mt-4 p-4 bg-light-100 rounded-2xl border border-light-60'>
            <View className='p-2 flex-row items-center justify-center bg-light-80 border border-light-60 rounded-full'>
              <View className='w-3.5 h-3.5 rounded-full bg-blue-100 mr-2' />
              <Text className='text-sm font-inter-medium text-dark-50'>Transporte</Text>
            </View>
            <Text className='text-2xl font-inter-semibold text-dark-100 mt-2'>Montante: $290</Text>
            <View className='w-full bg-light-60 h-3 rounded-full mt-2'>
              <View
                style={{
                  width: '50%'
                }}
                className='bg-blue-100 h-full rounded-full'
              />
            </View>
            <Text className='text-sm font-inter-regular text-red-100 mt-2'>Essa categoria faz parte de 50% do faturamento!</Text>
          </View>

          <View className='w-full items-start justify-center mt-4 p-4 bg-light-100 rounded-2xl border border-light-60'>
            <View className='p-2 flex-row items-center justify-center bg-light-80 border border-light-60 rounded-full'>
              <View className='w-3.5 h-3.5 rounded-full bg-red-100 mr-2' />
              <Text className='text-sm font-inter-medium text-dark-50'>Comida</Text>
            </View>
            <Text className='text-2xl font-inter-semibold text-dark-100 mt-2'>Montante: $100</Text>
            <View className='w-full bg-light-60 h-3 rounded-full mt-2'>
              <View
                style={{
                  width: '20%'
                }}
                className='bg-red-100 h-full rounded-full'
              />
            </View>
            <Text className='text-sm font-inter-regular text-red-100 mt-2'>Essa categoria faz parte de 20% do faturamento!</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
