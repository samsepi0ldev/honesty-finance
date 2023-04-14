import { useNavigation } from '@react-navigation/native'
import { TextInput, View, Text } from 'react-native'

import { HeaderSimple } from '../components/HeaderSimple'
import { useState } from 'react'
import { Button } from '../components/Button'
import { api } from '../lib/api'

type DataType = {
  name: string
  email: string
  password: string
}

export function SignUp () {
  const { navigate } = useNavigation()
  const [data, setData] = useState<DataType>({} as DataType)
  const [isLoadingCreatingAccount, setIsLoadingCreateAccount] = useState(false)

  async function createAccount () {
    setIsLoadingCreateAccount(true)
    try {
      await api.post('sign-up', data)
      navigate('main')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoadingCreateAccount(false)
    }
  }
  return (
    <View className='flex-1 bg-light-100'>
      <HeaderSimple title='Cadastrar-se' backButton />
      <View className='mt-14 px-4'>
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          className='mt-4 w-full h-14 border border-light-60 rounded-2xl pl-4 text-dark-50 text-base font-inter-regular'
          placeholder='Nome'
          onChangeText={text => setData({
            ...data,
            name: text
          })}
          placeholderTextColor='#91919F'
        />
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          className='mt-4 w-full h-14 border border-light-60 rounded-2xl pl-4 text-dark-50 text-base font-inter-regular'
          placeholder='Email'
          onChangeText={text => setData({
            ...data,
            email: text
          })}
          placeholderTextColor='#91919F'
        />
        <TextInput
          autoCorrect={false}
          className='mt-4 w-full h-14 border border-light-60 rounded-2xl pl-4 text-dark-50 text-base font-inter-regular'
          placeholder='Senha'
          secureTextEntry={true}
          onChangeText={text => setData({
            ...data,
            password: text
          })}
          placeholderTextColor='#91919F'
        />
        <Button
          _isLoading={isLoadingCreatingAccount}
          onPress={createAccount}
          className='mt-10'>
          <Text className='text-lg font-inter-semibold text-light-80'>Cadastrar</Text>
        </Button>
        <View className='flex-row gap-1 items-center justify-center mt-8'>
          <Text className='text-base font-inter-medium text-light-20'>já tem uma conta?</Text>
          <Text className='text-base font-inter-medium text-violet-100 underline' onPress={() => navigate('login')}>Conecte-se</Text>
        </View>
      </View>
    </View>
  )
}
