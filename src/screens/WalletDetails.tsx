import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import dayjs from 'dayjs'
import { ArrowLeft, PencilSimple } from 'phosphor-react-native'
import { useEffect, useMemo, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StatusBar, TouchableWithoutFeedback } from 'react-native'
import { BoxIncomeExpanse } from '../components/BoxIncomeExpanse'

import { Heading } from '../components/Heading'
import { type Transaction } from '../contracts/transaction'
import { api } from '../lib/api'
import { Loading } from '../components/Loading'

type Item = {
  key: string
  render: () => JSX.Element
  isTitle?: boolean
}

type DaysAgoType = Record<number, Transaction[]>
type RouteParams = {
  id: string
  name: string
}

export function WalletDetails () {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isApiBusy, setIsApiBusy] = useState(false)
  const [walletBalance, setWalletBalance] = useState(0)
  const { goBack, navigate } = useNavigation()
  const route = useRoute()
  const { id, name } = route.params as RouteParams

  async function getTransactions () {
    setIsApiBusy(true)
    const response = await api.get(`wallet/${id}/transactions`)
    setTransactions(response.data.transactions)
    setWalletBalance(response.data.wallet_balance)
    setIsApiBusy(false)
  }

  const { data, indices } = useMemo(() => {
    const today = transactions
      .filter(transaction =>
        dayjs(transaction.created_at)
          .startOf('day')
          .isSame(dayjs().startOf('day')))
      .reduce<Item[]>((acc, cur, i) => {
      if (i === 0) {
        const heading = {
          key: 'PAGE_HEADING_TODAY',
          render: () => <Heading title='Hoje' />,
          isTitle: true
        }
        acc.push(heading)
      }
      const element = {
        key: `PAGE_HEADING_TODAY_ELEMENTS_${cur.id}`,
        render: () => <BoxIncomeExpanse key={cur.id} data={cur} />
      }
      acc.push(element)
      return acc
    }, [])
    const tomorrow = transactions
      .filter(transaction =>
        dayjs(transaction.created_at)
          .startOf('day')
          .isSame(dayjs()
            .subtract(1, 'days')
            .startOf('day')))
      .reduce<Item[]>((acc, cur, i) => {
      if (i === 0) {
        const heading = {
          key: 'PAGE_HEADING_TODAY',
          render: () => <Heading title='Hoje' />,
          isTitle: true
        }
        acc.push(heading)
      }
      const element = {
        key: `PAGE_HEADING_TODAY_ELEMENTS_${cur.id}`,
        render: () => <BoxIncomeExpanse key={cur.id} data={cur} />
      }
      acc.push(element)
      return acc
    }, [])
    const diff = transactions.filter(transaction => dayjs().subtract(1, 'days').diff(transaction.created_at, 'days'))
    const daysAgo = diff.reduce<DaysAgoType>((acc, cur) => {
      const diff = dayjs().diff(cur.created_at, 'days')
      const previousData = acc[diff] || []
      acc[diff] = [...previousData, cur]
      return acc
    }, {})

    const otherDaysElements = Object.entries(daysAgo).reduce<Item[]>((acc, [title, items]) => {
      const heading = {
        key: `PAGE_HEADING_OTHER_DAYS_${title}`,
        render: () => <Heading title={`A ${title} atrás`} />,
        isTitle: true
      }
      const components = {
        key: `PAGE_HEADING_OTHER_DAYS_ELEMENTS_${title}`,
        render: () => <>
          {items.map(item => <BoxIncomeExpanse key={item.id} data={item} />)}
        </>
      }
      acc.push(heading)
      acc.push(components)
      return acc
    }, [])

    const data: Item[] = [
      ...today,
      ...tomorrow,
      ...otherDaysElements
    ]

    const indices: number[] = []
    data.forEach((item, i) => item.isTitle && indices.push(i))
    return { data, indices }
  }, [])

  useFocusEffect(() => {
    StatusBar.setBackgroundColor('#fff')
    StatusBar.setBarStyle('dark-content')
  })
  useEffect(() => {
    getTransactions()
  }, [])
  return (
    <View className='flex-1 bg-light-100'>
      <View className='flex-row items-center justify-between h-16 p-4'>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={goBack}
          className='w-12 h-12 items-center justify-center'
        >
          <ArrowLeft color='#212325' size={32} />
        </TouchableOpacity>
        <Text className='text-lg font-inter-semibold text-dark-50'>Detalhes da carteira</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigate('edit-wallet', { id, name })}
          className='w-12 h-12 items-center justify-center'
        >
          <PencilSimple color='#212325' size={32} />
        </TouchableOpacity>
      </View>
      <View className='items-center justify-center gap-2 mt-8'>
        <View className='bg-light-60 w-12 h-12 rounded-2xl' />
        <Text className='text-2xl font-inter-semibold text-dark-75'>{name}</Text>
        <Text className='text-3xl font-inter-bold text-dark-50'>
          {(walletBalance / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}
        </Text>
      </View>
      {!isApiBusy
        ? <FlatList
        contentContainerStyle={{
          paddingHorizontal: 16
        }}
        className='mt-12'
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <BoxIncomeExpanse data={item} />}
        ListEmptyComponent={
          <View className='items-center justify-center'>
            <Text className='text-base font-inter-medium text-light-20 text-center'>Você ainda não tem uma transação, Que tal adicionar uma agora?{'\n'}Escolha uma das opções abaixo</Text>
            <View className='flex-row'>
            <TouchableWithoutFeedback onPress={() => navigate('new-income')}>
              <Text className='text-base font-inter-medium text-violet-100'>criar uma renda,</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigate('new-expense')}>
              <Text className='text-base font-inter-medium text-violet-100'>{'\b'}ou uma despesa</Text>
            </TouchableWithoutFeedback>
            </View>
          </View>
        }
        // stickyHeaderIndices={indices}
        // onRefresh={() => {}}
        // refreshing={false}
      />
        : <View className='flex-1 items-center justify-center'>
            <Loading size={48} color='#7F3DFF' />
          </View>
        }
    </View>
  )
}
