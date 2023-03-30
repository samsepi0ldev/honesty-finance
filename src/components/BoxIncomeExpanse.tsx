import clsx from 'clsx'
import dayjs from 'dayjs'
import { View, Text } from 'react-native'
import { Coins, Car, ForkKnife, ScribbleLoop, Sword, Bag } from 'phosphor-react-native'

interface Transaction {
  category: {
    name: string
  }
  description: string
  price: number
  created_at: Date
}

interface BoxIncomeExpanseProps {
  data: Transaction
}

const categories = {
  salary: {
    name: 'Salario',
    lib: Coins,
    color: {
      primary: 'bg-green-20',
      accent: '#00A86B'
    }
  },
  transport: {
    name: 'Transporte',
    lib: Car,
    color: {
      primary: 'bg-blue-20',
      accent: '#0077FF'
    }
  },
  food: {
    name: 'Comida',
    lib: ForkKnife,
    color: {
      primary: 'bg-red-20',
      accent: '#FD3C4A'
    }
  },
  subscription: {
    name: 'Inscrição',
    lib: ScribbleLoop,
    color: {
      primary: 'bg-violet-20',
      accent: '#7F3DFF'
    }
  },
  shopping: {
    name: 'Shopping',
    lib: Bag,
    color: {
      primary: 'bg-yellow-20',
      accent: '#FCAC12'
    }
  }
}

export function BoxIncomeExpanse ({ data }: BoxIncomeExpanseProps) {
  const hours = dayjs(data.created_at).format('HH:mm A')
  const { lib: Icon, color } = Object
    .values(categories)
    .find(category => category.name.includes(data.category.name)) ??
      { lib: Sword, color: { primary: 'bg-light-40', accent: '#0D0E0F' } } as any
  return (
    <View className='px-4 mb-4 py-3.5 bg-light-80 rounded-3xl items-center justify-between flex-row'>
      <View className='flex-row items-center'>
        <View className={`w-14 h-14 rounded-2xl ${color.primary as string} items-center justify-center`}>
          <Icon size={32} color={color.accent} weight='fill' />
        </View>
        <View className='ml-4'>
          <Text className='text-base font-inter-medium text-dark-25'>{data.category.name}</Text>
          <Text
            className='text-xs text-light-20 font-inter-medium w-36'
            numberOfLines={1}
            ellipsizeMode='tail'
          >
              {data.description}
          </Text>
        </View>
      </View>
      <View className='items-end'>
        <Text className={clsx('font-inter-semibold text-base', {
          'text-red-100': data.price < 0,
          'text-green-100': data.price > 0
        })}>
          {(data.price >= 0 ? '+ ' : '- ') + data.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace('-', '')}
        </Text>
        <Text className='text-xs text-light-20 font-inter-medium'>{hours}</Text>
      </View>
    </View>
  )
}
