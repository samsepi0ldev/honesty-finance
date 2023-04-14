import { useNavigation } from '@react-navigation/native'
import { TextInput, View, Text } from 'react-native'

import { HeaderSimple } from '../components/HeaderSimple'
import { useAuth } from '../context/auth'
import { useCallback, useState } from 'react'
import { Button } from '../components/Button'

export function Login () {
  const { navigate } = useNavigation()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoadingLogin, setIsLoadingLogin] = useState(false)

  const handleLogin = useCallback(async () => {
    setIsLoadingLogin(true)
    try {
      await login(email, password)
      navigate('main')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoadingLogin(false)
    }
  }, [email, password])

  return (
    <View className='flex-1 bg-light-100'>
      <HeaderSimple title='Conecte-se' backButton />
      <View className='mt-14 px-4'>
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={text => setEmail(text)}
          className='mt-4 w-full h-14 border border-light-60 rounded-2xl pl-4 text-dark-50 text-base font-inter-regular'
          placeholder='Email'
          placeholderTextColor='#91919F'
        />
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={text => setPassword(text)}
          className='mt-4 w-full h-14 border border-light-60 rounded-2xl pl-4 text-dark-50 text-base font-inter-regular'
          placeholder='Senha'
          secureTextEntry={true}
          placeholderTextColor='#91919F'
        />
        <Button
          onPress={handleLogin}
          _isLoading={isLoadingLogin}
          className='mt-10'>
            <Text className='text-lg font-inter-semibold text-light-80'>Entrar</Text>
        </Button>
        <Text className='text-lg font-inter-semibold text-violet-100 text-center my-8'>Forgot Password?</Text>
        <View className='flex-row gap-1 items-center justify-center'>
          <Text className='text-base font-inter-medium text-light-20'>Não tem uma conta ainda?</Text>
          <Text className='text-base font-inter-medium text-violet-100 underline' onPress={() => navigate('sign-up')}>Inscrever-se</Text>
        </View>
      </View>
    </View>
  )
}
