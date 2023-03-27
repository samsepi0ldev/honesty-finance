import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import { HeaderSimple } from '../components/HeaderSimple'

export function NewWallet () {
  return (
    <View className='flex-1 bg-violet-100'>
      <HeaderSimple
        title='Adicionar nova carteira'
        backButton
        light
      />
      <View className='mt-auto'>
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
          <TextInput
            className='mt-4 w-full h-14 border border-light-60 rounded-2xl pl-4 text-dark-50 text-base font-inter-regular'
            placeholder='Tipo da carteira'
            placeholderTextColor='#91919F'
          />
          <TouchableOpacity
            activeOpacity={0.7}
            className='mt-6 bg-violet-100 items-center justify-center h-14 rounded-2xl'>
            <Text className='text-lg text-light-80 font-inter-semibold'>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
