import clsx from 'clsx'
import { CaretDown, ChartLine, ChartPie, SortAscending, SortDescending } from 'phosphor-react-native'
import { useCallback, useEffect, useState } from 'react'
import { TouchableOpacity, View, Text, ScrollView } from 'react-native'
import { BoxIncomeExpanse } from '../components/BoxIncomeExpanse'
import { Chart } from '../components/Chart'

import { HeaderSimple } from '../components/HeaderSimple'
import { Pie } from '../components/Pie'
import { api } from '../lib/api'
import { type Transaction } from '../contracts/transaction'
import { SelectMonth } from '../components/SelectMonth'

export function FinancialReport () {
  const [translationType, setTranslationType] = useState('income')
  const [translationOrder, setTranslationOrder] = useState('asc')
  const [translationGraph, setTranslationGraph] = useState('line')
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [transactionFilter, setTransactionFilter] = useState<Transaction[]>([])

  // const dataForGraph = transactions.map(t => ({
  //   x: t.category,
  //   y: t.value
  // }))

  const toggleTranslationOrder = useCallback(() => {
    const orders = ['asc', 'desc']
    setTranslationOrder(orders.filter(order => order !== translationOrder)[0])
    orderTransactions()
  }, [translationOrder])

  useEffect(() => {
    setTransactionFilter(transactions.filter(transaction => transaction.type === 'income'))
  }, [transactions])
  useEffect(() => {
    api.get('transactions')
      .then(res => {
        setTransactions(res.data.transactions)
      })
  }, [])
  const orderTransactions = useCallback(() => {
    if (translationOrder === 'desc') {
      return setTransactionFilter(transactions => transactions.sort((a, b) => {
        if (a.value < b.value) return -1
        if (a.value > b.value) return 1
        return 0
      }))
    }
    setTransactionFilter(transactions => transactions.sort((a, b) => {
      if (a.value > b.value) return -1
      if (a.value < b.value) return 1
      return 0
    }))
  }, [translationOrder, translationType])
  return (
    <View className='flex-1 bg-light-100'>
      <HeaderSimple title='Relatório financeiro' backButton />
      <View>
        <View className='h-16 flex-row items-center justify-between px-4 py-2 bg-light-100 mt-2'>
          <SelectMonth />
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
        {/* { translationGraph === 'pine' ? <Pie data={dataForGraph} /> : <Chart data={dataForGraph}/>} */}
      </View>
      <View className='flex-row mx-4 my-2 bg-violet-20 h-14 rounded-full p-1'>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setTranslationType('expense')
            setTransactionFilter(transactions.filter(transaction => transaction.type === 'expense'))
            setTranslationOrder('asc')
          }}
          className={clsx('flex-1 items-center justify-center rounded-full', {
            'bg-violet-100': translationType === 'expense'
          })}>
          <Text className={clsx('text-base font-inter-medium text-dark-100', {
            'text-light-80': translationType === 'expense'
          })}>Despesas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setTranslationType('income')
            setTransactionFilter(transactions.filter(transaction => transaction.type === 'income'))
            setTranslationOrder('asc')
          }}
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
          {translationOrder === 'desc' ? <SortDescending size={24} weight='bold' /> : <SortAscending size={24} weight='bold' />}
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16
        }}>
        {transactionFilter.map((t, i) => (
          <BoxIncomeExpanse
            key={i}
            data={t} />
        ))}
      </ScrollView>
    </View>
  )
}
