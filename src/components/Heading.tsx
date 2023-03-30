import { Text } from 'react-native'

interface HeadingProps {
  title: string
}

export function Heading ({ title }: HeadingProps) {
  return <Text className='h-12 px-4 bg-light-100 text-lg font-inter-semibold text-dark-100 leading-10'>{title}</Text>
}
