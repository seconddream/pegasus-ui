'use client'

import {Divider, Button, Section} from '../..'
import Input from '../../components/Input'

import {
  AiOutlineBlock,
  AiOutlineDelete,
  AiOutlineExclamationCircle,
  AiOutlineFileAdd,
  AiOutlineHome,
  AiOutlineReload,
  AiOutlineSave,
  AiOutlineStop,
} from 'react-icons/ai'

export default function Home() {
  return (
    <div className='flex flex-col items-end w-screen h-screen px-6 py-5 gap-4'>
      <Section
        title='Buttons'
        loading
        error
        errorMessage='Failed to load!'
        collapsible
        summary='Some information when collapsed'
        tools={[
          <Button type='primary' icon={<AiOutlineFileAdd />}>
            Create
          </Button>,
          <Input prefix='https://' suffix='Kg' error placeHolder='haha' allowShowPassword  />,
          <Button focusable type='secondary' icon={<AiOutlineSave />}>Save</Button>,
          <Button type='secondary' disabled icon={<AiOutlineDelete />}>Disable</Button>,
          <Button type='secondary' success icon={<AiOutlineDelete />}>Success</Button>,
          <Button type='secondary' error icon={<AiOutlineDelete />}>Error</Button>,
          <Button type='secondary' danger icon={<AiOutlineDelete />}>Danger</Button>,
          <Button type='secondary' tooltips='Some information' position='bottom' icon={<AiOutlineReload />}>Refresh</Button>,
          <Button type='transparent' tooltips='Some information' position='bottom' icon={<AiOutlineReload />}>Refresh</Button>,
        ]}
      >
        <div className='bg-red-300'>{Math.random()}</div>
      </Section>
    </div>
  )
}
