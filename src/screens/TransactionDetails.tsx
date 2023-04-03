import { type RouteProp, useFocusEffect, useNavigation } from '@react-navigation/native'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { ArrowLeft, Trash } from 'phosphor-react-native'
import { useCallback, useRef } from 'react'
import { TouchableOpacity, View, Text, useWindowDimensions, Image, StatusBar } from 'react-native'
import { BottomSheet, type BottomSheetRefProps } from '../components/BottomSheet'
import { Button } from '../components/Button'

type TransactionType = {
  id: string
  type: 'income' | 'expense'
  description: string
  wallet: {
    name: string
  }
  category: {
    name: string
  }
  created_at: Date
  value: number
}

type TransactionDetailsProps = {
  route: RouteProp<Record<string, { transaction: TransactionType }>, string>
}

export function TransactionDetails ({ route }: TransactionDetailsProps) {
  const { width: SCREEN_WIDTH } = useWindowDimensions()
  const ref = useRef<View>(null)
  const bottomSheetRef = useRef<BottomSheetRefProps>(null)
  const { goBack } = useNavigation()
  const { transaction } = route.params

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.scrollTo(-200)
  }, [])

  useFocusEffect(() => {
    StatusBar.setBackgroundColor(transaction.type === 'income' ? '#00A86B' : '#FD3C4A')
    StatusBar.setBarStyle('light-content')
  })
  return (
    <View className='flex-1 bg-light-100'>
      <View className={clsx('rounded-b-2xl pb-14', {
        'bg-green-100': transaction.type === 'income',
        'bg-red-100': transaction.type === 'expense'
      })}>
        <View className='flex-row items-center justify-between h-16 p-4'>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={goBack}
            className='w-12 h-12 items-center justify-center'
          >
            <ArrowLeft color='#fff' size={32} />
          </TouchableOpacity>
          <Text className='text-lg font-inter-semibold text-light-100'>Detalhes da translação</Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={openBottomSheet}
            className='w-12 h-12 items-center justify-center'
          >
            <Trash color='#fff' weight='fill' size={32} />
          </TouchableOpacity>
        </View>
        <View className='items-center justify-center'>
          <Text className='font-inter-bold text-5xl text-light-80 leading-[80px]'>
            {transaction.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </Text>
          <Text className='font-inter-medium text-xs text-light-80 mt-2'>
            {dayjs(transaction.created_at).format('dddd, DD [de] MMMM [de] YYYY HH:mm')}
          </Text>
        </View>
        <View
          ref={ref}
          style={{ width: SCREEN_WIDTH - 32 }}
          className='h-[70px] flex-row items-center justify-around bg-light-100 py-3 rounded-xl absolute -bottom-9 left-4 w-full border border-light-60'>
          <View className='items-center justify-center'>
            <Text className='text-sm font-inter-medium text-light-20'>Tipo</Text>
            <Text className='text-dark-100 text-base font-inter-semibold mt-1'>{transaction.type === 'income' ? 'Renda' : 'Despesa'}</Text>
          </View>
          <View className='items-center justify-center'>
            <Text className='text-sm font-inter-medium text-light-20'>Categoria</Text>
            <Text className='text-dark-100 text-base font-inter-semibold mt-1'>{transaction.category.name}</Text>
          </View>
          <View className='items-center justify-center'>
            <Text className='text-sm font-inter-medium text-light-20'>Carteira</Text>
            <Text className='text-dark-100 text-base font-inter-semibold mt-1'>{transaction.wallet.name}</Text>
          </View>
        </View>
      </View>
      <View className='mt-14 px-4 flex-1'>
        <View className='w-full h-px border-t-2 border-light-40 border-dashed mb-3.5' />
        <Text className='text-base font-inter-semibold text-light-20'>Descrição</Text>
        <Text className='text-base font-inter-medium text-dark-100 mt-4 leading-5'>
          {transaction.description}
        </Text>
        <Text className='text-base font-inter-semibold text-light-20 mt-4'>Anexo</Text>
        <Image className='h-28 w-full rounded-lg mt-4' source={{ uri: 'https://images.unsplash.com/photo-1619418602850-35ad20aa1700?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80' }} />
        <Button
          className='mt-auto mb-4'
          onPress={() => alert('Edit transaction coming soon')}>
          Editar
        </Button>
      </View>
      <BottomSheet ref={bottomSheetRef}>
        <View>
          <Text className='text-center text-base font-inter-semibold text-dark-100 mt-4'>Remover esta translação?</Text>
          <Text className='text-sm text-light-20 font-inter-medium text-center'>Você tem certeza de que quer remover esta translação?</Text>
          <View className='flex-row w-full items-center justify-center my-4'>
            <Button
              className='flex-1 h-12'
              type='secondary'>
              Não
            </Button>
            <Button
              className='flex-1 ml-4 h-12'
              type='primary'>
              Sim
            </Button>
          </View>
        </View>
      </BottomSheet>
    </View>
  )
}
