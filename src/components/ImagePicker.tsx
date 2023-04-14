import { TouchableOpacity, Text } from 'react-native'
import { Image } from 'phosphor-react-native'
import * as ImagePicker from 'expo-image-picker'

type AttachmentType = {
  type: 'image'
  uri: string
  base64?: string | null
}

interface ImagePikerProps {
  imageState: (uri: AttachmentType) => void
  fn?: () => void
}

export function ImagePickerComponent ({ imageState, fn }: ImagePikerProps) {
  async function pickImage () {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
      base64: true
    })
    if (!result.canceled) {
      imageState({
        type: 'image',
        uri: result.assets[0].uri,
        base64: result.assets[0].base64
      })
      if (fn) fn()
    }
  }
  return (
    <TouchableOpacity onPress={pickImage} className='flex-1 mr-2 h-24 bg-violet-20 rounded-2xl items-center justify-center'>
      <Image weight='fill' size={32} color='#7F3DFF' />
      <Text className='text-base text-violet-100 font-inter-semibold mt-2'>Imagem</Text>
    </TouchableOpacity>
  )
}
