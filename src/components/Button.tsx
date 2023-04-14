import clsx from 'clsx'
import { styled } from 'nativewind'
import { type ReactNode } from 'react'
import { TouchableOpacity, Text, type TouchableOpacityProps, ActivityIndicator } from 'react-native'

interface ButtonProps extends TouchableOpacityProps {
  children?: ReactNode
  type?: 'primary' | 'secondary'
  _isLoading?: boolean
}

export function CustomButton ({ children, type = 'primary', _isLoading, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={clsx('h-14 w-full p-2 items-center justify-center rounded-2xl', {
        'bg-violet-100': type === 'primary',
        'bg-violet-20': type === 'secondary'
      })} {...rest}>
      {_isLoading
        ? (
        <ActivityIndicator size={32} color='#D3BDFF' />
          )
        : (
         <Text className={clsx('text-lg font-inter-semibold', {
           'text-light-80': type === 'primary',
           'text-violet-100': type === 'secondary'
         })}>{children}</Text>
          )}
    </TouchableOpacity>
  )
}

export const Button = styled(CustomButton)
