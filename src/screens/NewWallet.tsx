import { useFocusEffect } from '@react-navigation/native'
import { CaretDown, CheckCircle } from 'phosphor-react-native'
import { useCallback, useRef, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StatusBar } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { BottomSheet, type BottomSheetRefProps } from '../components/BottomSheet'
import { Button } from '../components/Button'

import { HeaderSimple } from '../components/HeaderSimple'

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
export function NewWallet () {
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
      <HeaderSimple
        title='Adicionar nova carteira'
        backButton
        light
      />
      <ScrollView
        contentContainerStyle={{
          marginTop: 'auto'
        }}>
        <View className='px-4'>
          <Text className='font-inter-semibold text-lg text-light-80/60'>Quantidade</Text>
          <TextInput
            className='font-inter-semibold text-6xl text-light-80'
            placeholderTextColor='#FCFCFC'
            placeholder='$00.0'
            keyboardType='numeric'
          />
        </View>
        <View className='bg-light-100 rounded-t-3xl py-6 px-4'>
          <TextInput
            className='w-full h-14 border border-light-60 rounded-2xl pl-4 text-dark-50 text-base font-inter-regular'
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
                : <Text className='text-light-20 font-inter-regular text-base'>Typo da carteira</Text>}
              <CaretDown size={24} color='#91919F' />
            </View>
          </TouchableWithoutFeedback>
          <Button
            className='mt-6'
            onPress={() => alert('Add new wallet coming soon')}>
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
