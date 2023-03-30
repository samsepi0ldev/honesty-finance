import dayjs from 'dayjs'
import { useNavigation } from '@react-navigation/native'
import { CaretRight } from 'phosphor-react-native'
import { useMemo } from 'react'
import { View, Text, TouchableHighlight, FlatList } from 'react-native'

import { BoxIncomeExpanse } from '../components/BoxIncomeExpanse'
import { HeaderFilter } from '../components/HeaderFilter'
import { Heading } from '../components/Heading'

const transactions = [
  {
    id: generateUUID(),
    category: { name: 'Shopping' },
    description: 'Comprei alguma coisa na mercearia',
    price: -32.50,
    created_at: new Date('2023-03-30T04:31:42.376Z')
  },
  {
    id: generateUUID(),
    category: { name: 'Inscrição' },
    description: 'Disney + plano anual',
    price: -55.90,
    created_at: new Date('2023-03-30T12:47:31.571Z')
  },
  {
    id: generateUUID(),
    category: { name: 'Salario' },
    description: 'Assistência',
    price: 654,
    created_at: new Date('2023-03-29T04:31:42.376Z')
  },
  {
    id: generateUUID(),
    category: { name: 'Comida' },
    description: 'Comprei um pastel',
    price: -8.50,
    created_at: new Date('2023-03-28T20:03:52.811Z')
  },
  {
    id: generateUUID(),
    category: { name: 'Renda passiva' },
    description: 'UI8 Vendas',
    price: 500,
    created_at: new Date('2023-03-27T20:03:52.811Z')
  },
  {
    id: generateUUID(),
    category: { name: 'Inscrição' },
    description: 'Disney + plano anual',
    price: -55.90,
    created_at: new Date('2023-03-26T12:47:31.571Z')
  },
  {
    id: generateUUID(),
    category: { name: 'Comida' },
    description: 'Comprei um pastel',
    price: -8.50,
    created_at: new Date('2023-03-07T20:03:52.811Z')
  },
  {
    id: generateUUID(),
    category: { name: 'Comida' },
    description: 'Comprei o almoço',
    price: -10.50,
    created_at: new Date('2023-03-07T20:03:52.811Z')
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

export function Transactions () {
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
  }, [])
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
      <FlatList<Item>
        data={data}
        renderItem={({ item }) => item.render()}
        keyExtractor={item => item.key}
        stickyHeaderIndices={indices}
        showsVerticalScrollIndicator={false}
        onRefresh={() => {}}
        refreshing={false}
      />
    </View>
  )
}
