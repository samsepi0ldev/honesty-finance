import { TouchableOpacity, Text } from 'react-native'
import { Camera as CameraIcon } from 'phosphor-react-native'
import { Camera } from 'expo-camera'

interface CameraComponentProps {
  startCam: (isActive: boolean | undefined) => void
}

export function CameraComponent ({ startCam }: CameraComponentProps) {
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const requestPermissionCamera = async () => {
    void requestPermission()
    startCam(permission?.granted)
  }
  return (
    <TouchableOpacity
      onPress={requestPermissionCamera}
      className='flex-1 mr-2 h-24 bg-violet-20 rounded-2xl items-center justify-center'>
      <CameraIcon weight='fill' size={32} color='#7F3DFF' />
      <Text className='text-base text-violet-100 font-inter-semibold mt-2'>Camera</Text>
    </TouchableOpacity>
  )
}
