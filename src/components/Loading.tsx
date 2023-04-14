import { ActivityIndicator, type ActivityIndicatorProps } from 'react-native'

interface LoadingProps extends ActivityIndicatorProps {}

export function Loading (props: LoadingProps) {
  return <ActivityIndicator {...props} />
}
