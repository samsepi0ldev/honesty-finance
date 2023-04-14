import clsx from 'clsx'
import dayjs from 'dayjs'
import { View, Text, TouchableOpacity } from 'react-native'
import { Sword } from 'phosphor-react-native'

import { useNavigation } from '@react-navigation/native'
import SalaryIcon from '../assets/Icons/salary.svg'
import ShoppingIcon from '../assets/Icons/shopping-bag.svg'
import CarIcon from '../assets/Icons/car.svg'
import RestaurantIcon from '../assets/Icons/restaurant.svg'
import RecurringIcon from '../assets/Icons/recurring-bill.svg'
import LineChartIcon from '../assets/Icons/line-chart-2.svg'

interface Transaction {
  id: string
  category: string
  wallet: {
    name: string
  }
  description: string
  value: number
  created_at: Date
  type: string
}

interface BoxIncomeExpanseProps {
  data: Transaction
}

const categories = {
  salary: {
    name: 'Salario',
    lib: SalaryIcon,
    color: {
      primary: 'bg-green-20',
      accent: '#00A86B'
    }
  },
  deposit: {
    name: 'Deposito',
    lib: SalaryIcon,
    color: {
      primary: 'bg-green-20',
      accent: '#00A86B'
    }
  },
  transport: {
    name: 'Transporte',
    lib: CarIcon,
    color: {
      primary: 'bg-blue-20',
      accent: '#0077FF'
    }
  },
  food: {
    name: 'Comida',
    lib: RestaurantIcon,
    color: {
      primary: 'bg-red-20',
      accent: '#FD3C4A'
    }
  },
  subscription: {
    name: 'Inscrição',
    lib: RecurringIcon,
    color: {
      primary: 'bg-violet-20',
      accent: '#7F3DFF'
    }
  },
  investments: {
    name: 'Investimentos',
    lib: LineChartIcon,
    color: {
      primary: 'bg-violet-20',
      accent: '#7F3DFF'
    }
  },
  shopping: {
    name: 'Shopping',
    lib: ShoppingIcon,
    color: {
      primary: 'bg-yellow-20',
      accent: '#FCAC12'
    }
  }
}

export function BoxIncomeExpanse ({ data }: BoxIncomeExpanseProps) {
  const { navigate } = useNavigation()
  const hours = dayjs(data.created_at).format('HH:mm A')
  const { lib: Icon, color } = Object
    .values(categories)
    .find(category => category.name.toLowerCase().includes(data.category.toLowerCase())) ??
      { lib: Sword, color: { primary: 'bg-light-40', accent: '#0D0E0F' } } as any
  return (
    <TouchableOpacity onPress={() => navigate('transaction-details', { transaction: data })} className='px-4 mb-4 py-3.5 bg-light-80 rounded-3xl items-center justify-between flex-row'>
      <View className='flex-row items-center'>
        <View className={`w-14 h-14 rounded-2xl ${color.primary as string} items-center justify-center`}>
          <Icon size={32} color={color.accent} weight='fill' />
        </View>
        <View className='ml-4'>
          <Text className='text-base font-inter-medium text-dark-25'>{data.category}</Text>
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
          'text-red-100': data.type === 'expense',
          'text-green-100': data.type === 'income'
        })}>
          {(data.type === 'income' ? '+ ' : '- ') + (data.value / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace('-', '')}
        </Text>
        <Text className='text-xs text-light-20 font-inter-medium'>{hours}</Text>
      </View>
    </TouchableOpacity>
  )
}
