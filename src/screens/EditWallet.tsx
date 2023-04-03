import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { ArrowLeft, CaretDown, CheckCircle, Trash } from 'phosphor-react-native'
import { useCallback, useRef, useState } from 'react'
import { TouchableOpacity, View, Text, TextInput, TouchableWithoutFeedback, StatusBar } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { BottomSheet, type BottomSheetRefProps } from '../components/BottomSheet'
import { Button } from '../components/Button'

const walletsTypes = [
  {
    key: 'personalWallet',
    label: 'Carteira Pessoal'
  },
  {
    key: 'checkingAccount',
    label: 'Conta Corrente'
  },
  {
    key: 'savingsAccount',
    label: 'Conta Poupança'
  },
  {
    key: 'investmentAccount',
    label: 'Conta de Investimento'
  },
  {
    key: 'businessWallet',
    label: 'Carteira Empresarial'
  },
  {
    key: 'travelWallet',
    label: 'Carteira de Viagem'
  },
  {
    key: 'emergencyFund',
    label: 'Fundo de Emergência'
  }
]

export function EditWallet () {
  const { goBack } = useNavigation()
  const [walletType, setWalletType] = useState('')
  const refBottomSheet = useRef<BottomSheetRefProps>(null)
  const openBottomSheep = useCallback(() => {
    refBottomSheet.current?.scrollTo(-200)
  }, [])

  useFocusEffect(() => {
    StatusBar.setBackgroundColor('#7F3DFF')
    StatusBar.setBarStyle('light-content')
  })
  return (
    <View className='flex-1 bg-violet-100'>
      <View className='flex-row items-center justify-between h-16 p-4'>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={goBack}
          className='w-12 h-12 items-center justify-center'
        >
          <ArrowLeft color='#fff' size={32} />
        </TouchableOpacity>
        <Text className='text-lg font-inter-semibold text-light-100'>Detalhes da carteira</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => { }}
          className='w-12 h-12 items-center justify-center'
        >
          <Trash color='#fff' weight='fill' size={32} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 'auto'
        }}>
        <View className='bg-light-100 rounded-t-3xl py-6 px-4'>
          <TextInput
            className='mt-4 w-full h-14 border border-light-60 rounded-2xl pl-4 text-dark-50 text-base font-inter-regular'
            placeholder='Nome'
            placeholderTextColor='#91919F'
          />
          <TouchableWithoutFeedback onPress={openBottomSheep}>
            <View className='mt-4 w-full h-14 border border-light-60 rounded-2xl px-4 flex-row items-center justify-between'>
              {walletType
                ? (
                  <View className='rounded-full flex-row items-center'>
                    <Text className='font-inter-medium text-sm text-dark-50'>{walletType}</Text>
                  </View>
                  )
                : <Text className='text-light-20 font-inter-regular text-base'>Tipo da carteira</Text>}
              <CaretDown size={24} color='#91919F' />
            </View>
          </TouchableWithoutFeedback>
          <Button
            className='mt-6'
            onPress={() => alert('Edit wallet coming soon')}>
            Continuar
          </Button>
        </View>
      </ScrollView>
      <BottomSheet ref={refBottomSheet}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 32
          }}
          showsVerticalScrollIndicator={false}
        >
          {walletsTypes.map(({ label, key }, i) => (
            <TouchableOpacity
              key={i} onPress={() => setWalletType(label)}
              className='h-14 flex-row items-center justify-between'>
              <Text className='text-dark-100 text-sm font-inter-medium'>{label}</Text>
              {label === walletType && <CheckCircle weight='fill' size={24} color='#5233FF' />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </BottomSheet>
    </View>
  )
}
