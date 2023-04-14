import { ImageBackground, View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import { Wallet as WalletIcon } from 'phosphor-react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { HeaderSimple } from '../components/HeaderSimple'
import bgImage from '../assets/BG.png'
import { Button } from '../components/Button'
import { useState } from 'react'
import { api } from '../lib/api'

type WalletProps = {
  account_balance: number
  wallets: Array<
  {
    id: string
    name: string
    account_type: string
    wallet_balance: number
  }
  >
}

export function Wallet () {
  const { navigate } = useNavigation()
  const [walletData, setWalletData] = useState<WalletProps>({
    wallets: [],
    account_balance: 0
  })

  async function getWallets () {
    const response = await api.get('wallets/list')
    setWalletData(response.data)
  }
  useFocusEffect(() => {
    StatusBar.setBackgroundColor('#fff')
    StatusBar.setBarStyle('dark-content')
    getWallets()
  })
  return (
    <View className='flex-1 bg-light-100'>
      <HeaderSimple
        className='bg-light-100'
        title='Carteiras'
        backButton
      />
      <View className='h-52 mt-2.5'>
        <ImageBackground
          source={bgImage}
          resizeMode='cover'
          className='flex-1 justify-center items-center'
        >
          <Text className='text-sm text-light-20 font-inter-medium'>Saldo da conta</Text>
          <Text className='text-dark-75 font-inter-semibold text-4xl text-center mt-2'>
            {(walletData.account_balance / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </Text>
        </ImageBackground>
      </View>
      <ScrollView className='mt-5'
        contentContainerStyle={{
          flex: 1
        }}>
        {walletData.wallets.map((wallet, index) => (
          <TouchableOpacity
            key={index}
            className='h-20 flex-row items-center justify-between p-4 border-b border-dark-100/10'
            activeOpacity={0.7}
            onPress={() => navigate('wallet-details', { id: wallet.id, name: wallet.name })}
          >
            <View className='flex-row items-center'>
              <View className='w-12 h-12 rounded-2xl bg-violet-20 items-center justify-center mr-2'>
                <WalletIcon weight='fill' color='#7F3DFF' size={24} />
              </View>
              <Text className='text-lg font-inter-semibold text-dark-50'>
                {wallet.name}
              </Text>
            </View>
            <Text className='text-lg font-inter-semibold text-dark-50'>
              {(wallet.wallet_balance / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </Text>
          </TouchableOpacity>
        ))}
        <View className='px-4 mt-auto mb-4'>
          <Button
            className='mt-6'
            onPress={() => navigate('new-wallet')}>
            + Adicionar nova carteira
          </Button>
        </View>
      </ScrollView>
    </View>
  )
}
