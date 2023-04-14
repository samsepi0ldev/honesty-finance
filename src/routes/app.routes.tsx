import {
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View } from 'react-native'

import { Home } from '../screens/Home'
import { Profile } from '../screens/Profile'
import { Wallet } from '../screens/Wallet'
import { NewWallet } from '../screens/NewWallet'
import { IconNewTransaction } from '../components/IconNewTransaction'
import { WalletDetails } from '../screens/WalletDetails'
import { Transactions } from '../screens/Transactions'
import { FinancialReport } from '../screens/FinancialReport'
import { NewIncome } from '../screens/NewIncome'
import { NewExpense } from '../screens/NewExpense'
import { Login } from '../screens/Login'
import { SignUp } from '../screens/SignUp'
import { EditWallet } from '../screens/EditWallet'
import { Onboarding } from '../screens/Onboarding'
import { TransactionDetails } from '../screens/TransactionDetails'
import { Config } from '../screens/Config'
import { Category } from '../screens/Category'

import HomeIcon from '../assets/Icons/home.svg'
import PieChartIcon from '../assets/Icons/pie-chart.svg'
import UserIcon from '../assets/Icons/user.svg'
import TransactionIcon from '../assets/Icons/transaction.svg'
import { useAuth } from '../context/auth'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function NewTransaction () {
  return (
    <View />
  )
}

export function StackRoutes () {
  const { isLogged } = useAuth()
  return (
    <Stack.Navigator
      initialRouteName='onboarding'
      screenOptions={{
        headerShown: false
      }}
    >
      {!isLogged && (
        <>
          <Stack.Screen name='onboarding' component={Onboarding} />
          <Stack.Screen name='login' component={Login} />
          <Stack.Screen name='sign-up' component={SignUp} />
        </>
      )}

      <Stack.Screen name='main' component={TabRoutes} />
      <Stack.Screen name='wallet' component={Wallet} />
      <Stack.Screen name='new-wallet' component={NewWallet} />
      <Stack.Screen name='wallet-details' component={WalletDetails} />
      <Stack.Screen name='edit-wallet' component={EditWallet} />
      <Stack.Screen name='financial-report' component={FinancialReport} />
      <Stack.Screen name='new-income' component={NewIncome} />
      <Stack.Screen name='new-expense' component={NewExpense} />
      <Stack.Screen name='transaction-details' component={TransactionDetails} />
      <Stack.Screen name='config' component={Config} />
    </Stack.Navigator>
  )
}

export function TabRoutes () {
  return (
    <Tab.Navigator
      initialRouteName='home'
      backBehavior='history'
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#7F3DFF',
        tabBarInactiveTintColor: '#C6C6C6',
        tabBarLabelStyle: {
          fontFamily: 'Inter_500Medium',
          fontSize: 10,
          zIndex: 10
        },
        tabBarStyle: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 70,
          borderRadius: 16,
          borderTopWidth: 0,
          elevation: 0,
          shadowOffset: {
            width: 0,
            height: 0
          },
          shadowRadius: 0,
          shadowOpacity: 0
        }

      }}

    >
      <Tab.Screen
        name='home'
        component={Home}
        options={{
          tabBarItemStyle: {
            height: 48,
            alignItems: 'center',
            justifyContent: 'center'
          },
          title: 'Inicio',
          tabBarIcon: ({ color, focused, size }) => (
            <HomeIcon
              width={size}
              height={size}
              fill={color}
            />
          )
        }}
      />
      <Tab.Screen
        name='transaction'
        component={Transactions}
        options={{
          tabBarItemStyle: {
            height: 48,
            alignItems: 'center',
            justifyContent: 'center'
          },
          title: 'Traslações',
          tabBarIcon: ({ color, focused, size }) => (
            <TransactionIcon
              width={size}
              height={size}
              color={color}
              fill={color}
            />
          )
        }}
      />
      <Tab.Screen
        name='new'
        component={NewTransaction}
        options={{
          tabBarItemStyle: {
            height: 48,
            alignItems: 'center',
            justifyContent: 'center'
          },
          title: '',
          tabBarIcon: () => <IconNewTransaction />
        }}
        listeners={{
          tabPress: e => e.preventDefault()
        }}
      />
      <Tab.Screen
        name='category'
        component={Category}
        options={{
          tabBarItemStyle: {
            height: 48,
            alignItems: 'center',
            justifyContent: 'center'
          },
          title: 'Categorias',
          tabBarIcon: ({ color, focused, size }) => (
            <PieChartIcon
              width={size}
              height={size}
              fill={color}
            />
          )
        }}
      />
      <Tab.Screen
        name='profile'
        component={Profile}
        options={{
          tabBarItemStyle: {
            height: 48,
            alignItems: 'center',
            justifyContent: 'center'
          },
          title: 'Perfil',
          tabBarIcon: ({ color, focused, size }) => (
            <UserIcon
              width={size}
              height={size}
              fill={color}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}
