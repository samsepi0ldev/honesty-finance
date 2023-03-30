import {
  type BottomTabNavigationProp,
  createBottomTabNavigator,
  type BottomTabNavigationEventMap
} from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
import { HouseSimple, Tag, User } from 'phosphor-react-native'
import { useEffect } from 'react'

import { Home } from '../screens/Home'
import { Profile } from '../screens/Profile'
import { Wallet } from '../screens/Wallet'
import { NewWallet } from '../screens/NewWallet'
import { IconNewTransaction } from '../components/IconNewTransaction'
import TransactionIcon from '../assets/Transaction.svg'
import { WalletDetails } from '../screens/WalletDetails'
import { Transactions } from '../screens/Transactions'
import { FinancialReport } from '../screens/FinancialReport'
import { NewIncome } from '../screens/NewIncome'
import { NewExpense } from '../screens/NewExpense'
import { Login } from '../screens/Login'
import { SignUp } from '../screens/SignUp'
import { EditWallet } from '../screens/EditWallet'
import { Onboarding } from '../screens/Onboarding'

const Tab = createBottomTabNavigator()

type HomeScreenNavigationProp = BottomTabNavigationProp<BottomTabNavigationEventMap>

interface Props {
  navigation: HomeScreenNavigationProp
}

function NewTransaction ({ navigation }: Props) {
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      e.preventDefault()
    })
    return unsubscribe
  }, [navigation])
  return (
    <View />
  )
}

function Category () {
  return (
    <View>
      <Text>Category</Text>
    </View>
  )
}

export function AppRoutes () {
  return (
    <Tab.Navigator
      initialRouteName='onboarding'
      backBehavior='history'
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#7F3DFF',
        tabBarInactiveTintColor: '#C6C6C6',
        tabBarLabelStyle: {
          fontFamily: 'Inter_500Medium',
          fontSize: 10
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
        name='onboarding'
        component={Onboarding}
        options={{
          tabBarButton: () => null,
          tabBarStyle: {
            display: 'none',
            opacity: 0
          }
        }}
      />
      <Tab.Screen
        name='login'
        component={Login}
        options={{
          tabBarButton: () => null,
          tabBarStyle: {
            display: 'none',
            opacity: 0
          }
        }}
      />
      <Tab.Screen
        name='sign-up'
        component={SignUp}
        options={{
          tabBarButton: () => null,
          tabBarStyle: {
            display: 'none',
            opacity: 0
          }
        }}
      />
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
            <HouseSimple
              size={size}
              color={color}
              weight='fill'
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
            <Tag
              size={size}
              color={color}
              weight='fill'
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
            <User
              size={size}
              color={color}
              weight='fill'
            />
          )
        }}
      />
      <Tab.Screen
        name='wallet'
        component={Wallet}
        options={{
          tabBarButton: () => null,
          tabBarStyle: {
            display: 'none',
            opacity: 0
          }
        }}
      />
      <Tab.Screen
        name='new-wallet'
        component={NewWallet}
        options={{
          tabBarButton: () => null,
          tabBarStyle: {
            display: 'none',
            opacity: 0
          }
        }}
      />
      <Tab.Screen
        name='wallet-details'
        component={WalletDetails}
        options={{
          tabBarButton: () => null,
          tabBarStyle: {
            display: 'none',
            opacity: 0
          }
        }}
      />
      <Tab.Screen
        name='edit-wallet'
        component={EditWallet}
        options={{
          tabBarButton: () => null,
          tabBarStyle: {
            display: 'none',
            opacity: 0
          }
        }}
      />
      <Tab.Screen
        name='financial-report'
        component={FinancialReport}
        options={{
          tabBarButton: () => null,
          tabBarStyle: {
            display: 'none',
            opacity: 0
          }
        }}
      />
       <Tab.Screen
        name='new-income'
        component={NewIncome}
        options={{
          tabBarButton: () => null,
          tabBarStyle: {
            display: 'none',
            opacity: 0
          }
        }}
      />
       <Tab.Screen
        name='new-expense'
        component={NewExpense}
        options={{
          tabBarButton: () => null,
          tabBarStyle: {
            display: 'none',
            opacity: 0
          }
        }}
      />
    </Tab.Navigator>
  )
}
