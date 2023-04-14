import { useFocusEffect } from '@react-navigation/native'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import { CaretLeft, CaretRight } from 'phosphor-react-native'
import { useCallback, useEffect, useState } from 'react'
import { StatusBar, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import 'dayjs/locale/pt-br'

import { api } from '../lib/api'
import { CategoryBilling } from '../components/CategoryBilling'

dayjs.extend(localeData)
dayjs.locale('pt-br')
const months = dayjs.months()

type CategoryBillingTransactions = {
  category: string
  balance_category: number
  percent_billing: number
}

export function Category () {
  const [month, setMonth] = useState(dayjs().month())
  const [categoryBilling, setCategoryBilling] = useState<CategoryBillingTransactions[]>([])

  const timestamp = dayjs().month(month).valueOf()

  async function getBillingCategories () {
    const response = await api.get(`category/transactions?date=${timestamp}`)
    setCategoryBilling(response.data)
  }

  useFocusEffect(() => {
    StatusBar.setBackgroundColor('#7F3DFF')
    StatusBar.setBarStyle('light-content')
  })
  useEffect(() => {
    getBillingCategories()
  }, [month])
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
        {!categoryBilling.length && (
          <View className='absolute top-1/2 left-4 flex-1 w-full'>
            <Text className='text-center text-base text-light-20 font-inter-medium'>Você não tem nenhum orçamento {'\n'} para este mes.</Text>
          </View>
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {categoryBilling.map((category, i) => (
            <CategoryBilling key={i} data={category} />
          ))}
        </ScrollView>
      </View>
    </View>
  )
}
