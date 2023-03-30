import clsx from 'clsx'
import { CaretDown, ChartLine, ChartPie, SortAscending, SortDescending } from 'phosphor-react-native'
import { useCallback, useState } from 'react'
import { TouchableOpacity, View, Text, ScrollView } from 'react-native'
import { BoxIncomeExpanse } from '../components/BoxIncomeExpanse'

import { HeaderSimple } from '../components/HeaderSimple'

const transactions = [
  {
    category: { name: 'Inscrição' },
    description: 'Disney + plano anual',
    price: -55.90,
    created_at: new Date('2023-02-07T12:47:31.571Z')
  },
  {
    category: { name: 'Shopping' },
    description: 'Comprei alguma coisa na mercearia',
    price: -32.50,
    created_at: new Date('2023-02-07T04:31:42.376Z')
  },
  {
    category: { name: 'Comida' },
    description: 'Comprei um pastel',
    price: -8.50,
    created_at: new Date('2023-02-07T20:03:52.811Z')
  }
]

export function FinancialReport () {
  const [translationType, setTranslationType] = useState('income')
  const [translationOrder, setTranslationOrder] = useState('desc')
  const [translationGraph, setTranslationGraph] = useState('line')
  const toggleTranslationOrder = useCallback(() => {
    const orders = ['asc', 'desc']
    setTranslationOrder(orders.filter(order => order !== translationOrder)[0])
  }, [translationOrder])
  return (
    <View className='flex-1 bg-light-100'>
      <HeaderSimple title='Relatório financeiro' backButton />
      <View>
        <View className='h-16 flex-row items-center justify-between px-4 py-2 bg-light-100 mt-2'>
          <TouchableOpacity className='h-10 flex-row items-center justify-center pl-2 pr-4 border border-light-60 rounded-full'>
            <CaretDown size={24} weight='bold' color='#7F3DFF' />
            <Text className='font-inter-medium text-dark-50 text-sm ml-2'>Mes</Text>
          </TouchableOpacity>
          <View className='bg-light-100 flex-row'>
            <TouchableOpacity
              onPress={() => setTranslationGraph('line')}
              className={clsx('w-12 h-12 border-l border-t border-b border-light-60 rounded-l-lg items-center justify-center', {
                'bg-violet-100': translationGraph === 'line'
              })}>
              <ChartLine size={32} weight='fill' color={translationGraph === 'line' ? '#ffffff' : '#7F3DFF'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTranslationGraph('pine')}
              className={clsx('w-12 h-12 border-r border-t border-b border-light-60 rounded-r-lg items-center justify-center', {
                'bg-violet-100': translationGraph === 'pine'
              })}>
              <ChartPie size={32} weight='fill' color={translationGraph === 'pine' ? '#ffffff' : '#7F3DFF'} />
            </TouchableOpacity>
          </View>
        </View>
        <Text className='text-3xl font-inter-semibold text-dark-100 px-4'>$ 433</Text>
      </View>
      <View className='flex-row mx-4 my-2 bg-violet-20 h-14 rounded-full p-1'>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setTranslationType('expanse')}
          className={clsx('flex-1 items-center justify-center rounded-full', {
            'bg-violet-100': translationType === 'expanse'
          })}>
          <Text className={clsx('text-base font-inter-medium text-dark-100', {
            'text-light-80': translationType === 'expanse'
          })}>Despesas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setTranslationType('income')}
          className={clsx('flex-1 items-center justify-center rounded-full', {
            'bg-violet-100': translationType === 'income'
          })}>
          <Text className={clsx('text-base font-inter-medium text-dark-100', {
            'text-light-80': translationType === 'income'
          })}>Renda</Text>
        </TouchableOpacity>
      </View>
      <View className='h-16 flex-row items-center justify-between px-4 py-2 bg-light-100 mt-2'>
        <TouchableOpacity className='h-10 flex-row items-center justify-center pl-2 pr-4 border border-light-60 rounded-full'>
          <CaretDown size={24} weight='bold' color='#7F3DFF' />
          <Text className='font-inter-medium text-dark-50 text-sm ml-2'>Translação</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleTranslationOrder}
          className='w-10 h-10 rounded-lg border border-light-60 items-center justify-center'>
          {translationOrder === 'desc' ? <SortAscending size={24} weight='bold' /> : <SortDescending size={24} weight='bold' />}
        </TouchableOpacity>
      </View>
      <ScrollView>
        {transactions.map((transaction, i) => (
          <BoxIncomeExpanse
            key={i}
            data={transaction} />
        ))}
      </ScrollView>
    </View>
  )
}
