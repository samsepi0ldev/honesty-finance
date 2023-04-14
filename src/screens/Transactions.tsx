import dayjs from 'dayjs'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { CaretRight } from 'phosphor-react-native'
import { useEffect, useMemo, useState } from 'react'
import { View, Text, TouchableHighlight, StatusBar, FlatList } from 'react-native'
// import { FlatList } from 'react-native-gesture-handler'

import { BoxIncomeExpanse } from '../components/BoxIncomeExpanse'
import { HeaderFilter } from '../components/HeaderFilter'
import { Heading } from '../components/Heading'
import { type Transaction } from '../contracts/transaction'
import { api } from '../lib/api'

type Item = {
  key: string
  render: () => JSX.Element
  isTitle?: boolean
}

type DaysAgoType = Record<number, Transaction[]>

export function Transactions () {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const { navigate } = useNavigation()
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
        render: () => <View className='px-4'>
          <BoxIncomeExpanse key={cur.id} data={cur} />
        </View>
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
          key: 'PAGE_HEADING_TOMORROW',
          render: () => <Heading title='Ontem' />,
          isTitle: true
        }
        acc.push(heading)
      }
      const element = {
        key: `PAGE_HEADING_TOMORROW_ELEMENTS_${cur.id}`,
        render: () => <View className='px-4'>
          <BoxIncomeExpanse key={cur.id} data={cur} />
        </View>
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
        render: () => <View className='px-4'>
          {items.map(item => <BoxIncomeExpanse key={item.id} data={item} />)}
        </View>
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
  }, [transactions])

  useFocusEffect(() => {
    api.get('transactions')
      .then(res => {
        setTransactions(res.data.transactions)
      })
    StatusBar.setBackgroundColor('#fff')
    StatusBar.setBarStyle('dark-content')
  })
  return (
    <View className='flex-1 bg-light-100'>
      <HeaderFilter />
      <TouchableHighlight
        underlayColor='#D3BDFF'
        onPress={() => navigate('financial-report')}
        className='mx-4 my-2 bg-violet-20 px-4 flex-row items-center justify-between h-12 rounded-lg'>
        <>
          <Text className='text-base font-inter-regular text-violet-100'>Veja seu relatório financeiro</Text>
          <CaretRight size={24} weight='bold' color='#7F3DFF' />
        </>
      </TouchableHighlight>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 16
        }}
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <BoxIncomeExpanse data={item} />}
        // stickyHeaderIndices={indices}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        // debug={true}
      />
    </View>
  )
}
