import { useFocusEffect, useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import { ArrowLeft, PencilSimple } from 'phosphor-react-native'
import { useMemo } from 'react'
import { View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native'
import { BoxIncomeExpanse } from '../components/BoxIncomeExpanse'

import { Heading } from '../components/Heading'

const transactions = [
  {
    id: generateUUID(),
    category: { name: 'Shopping' },
    wallet: { name: 'PicPay' },
    description: 'Comprei alguma coisa na mercearia',
    value: 32.50,
    type: 'expense',
    created_at: new Date('2023-02-07T04:31:42.376Z')
  },
  {
    id: generateUUID(),
    category: { name: 'Inscrição' },
    wallet: { name: 'PicPay' },
    description: 'Disney + plano anual',
    value: 55.90,
    type: 'expense',
    created_at: new Date('2023-02-07T12:47:31.571Z')
  },
  {
    id: generateUUID(),
    category: { name: 'Comida' },
    wallet: { name: 'PicPay' },
    description: 'Comprei um pastel',
    value: 8.50,
    type: 'expense',
    created_at: new Date('2023-02-07T20:03:52.811Z')
  },
  {
    id: generateUUID(),
    category: { name: 'Salario' },
    wallet: { name: 'PicPay' },
    description: 'Salario da assistência',
    value: 500,
    type: 'income',
    created_at: new Date('2023-02-07T03:14:17.955Z')
  },
  {
    id: generateUUID(),
    category: { name: 'Transporte' },
    wallet: { name: 'PicPay' },
    description: 'Uber para casa',
    value: 18,
    type: 'expense',
    created_at: new Date('2023-02-07T21:58:08.247Z')
  },
  {
    id: generateUUID(),
    category: { name: 'Investimentos' },
    wallet: { name: 'PicPay' },
    description: 'Picpay investimentos',
    value: 44.89,
    type: 'income',
    created_at: new Date('2023-02-07T16:58:25.247Z')
  }
]

function generateUUID () { // Public Domain/MIT
  let d = new Date().getTime()// Timestamp
  let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0// Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16// random number between 0 and 16
    if (d > 0) { // Use timestamp until depleted
      r = (d + r) % 16 | 0
      d = Math.floor(d / 16)
    } else { // Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0
      d2 = Math.floor(d2 / 16)
    }
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

type TransactionType = typeof transactions[0]

type Item = {
  key: string
  render: () => JSX.Element
  isTitle?: boolean
}

type DaysAgoType = Record<number, TransactionType[]>

export function WalletDetails () {
  const { goBack, navigate } = useNavigation()
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
          onPress={() => navigate('edit-wallet')}
          className='w-12 h-12 items-center justify-center'
        >
          <PencilSimple color='#212325' size={32} />
        </TouchableOpacity>
      </View>
      <View className='items-center justify-center gap-2 mt-8'>
        <View className='bg-light-60 w-12 h-12 rounded-2xl' />
        <Text className='text-2xl font-inter-semibold text-dark-75'>Paypal</Text>
        <Text className='text-3xl font-inter-bold text-dark-50'>$2400</Text>
      </View>
      <FlatList
        className='mt-12'
        data={data}
        keyExtractor={item => item.key}
        renderItem={({ item }) => item.render()}
        stickyHeaderIndices={indices}
        onRefresh={() => {}}
        refreshing={false}
      />
    </View>
  )
}
