import { TouchableOpacity, Text } from 'react-native'
import { File } from 'phosphor-react-native'
import * as DocumentPicker from 'expo-document-picker'

type AttachmentType = {
  type: 'document'
  uri: string
}

interface DocumentPickerProps {
  documentState: (data: AttachmentType) => void
  fn?: () => void
}

export function DocumentPickerComponent ({ documentState, fn }: DocumentPickerProps) {
  async function documentPicker () {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf'
    })
    if (result.type === 'success') {
      documentState({
        type: 'document',
        uri: result.uri
      })
      if (fn) fn()
    }
  }
  return (
    <TouchableOpacity
      onPress={documentPicker} className='flex-1 h-24 bg-violet-20 rounded-2xl items-center justify-center'>
      <File weight='fill' size={32} color='#7F3DFF' />
      <Text className='text-base text-violet-100 font-inter-semibold mt-2'>Arquivo</Text>
    </TouchableOpacity>
  )
}
