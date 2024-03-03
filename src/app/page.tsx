'use client'

import {Divider, Button, Section} from '@/pegasus-ui'
import Input from '@/pegasus-ui/components/Input'

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
        // loading
        // error
        errorMessage='Failed to load!'
        collapsible
        summary='Some information when collapsed'
        tools={[
          <Button type='primary' icon={<AiOutlineFileAdd />}>
            Create
          </Button>,
          <Input type='password' placeHolder='haha' allowShowPassword  />,
          <Button focusable type='secondary' icon={<AiOutlineSave />}>Save</Button>,
          <Button type='secondary' icon={<AiOutlineDelete />}>Delete</Button>,
          <Button type='secondary' tooltips='Some information' position='bottom' icon={<AiOutlineReload />}>Refresh</Button>,
        ]}
      >
        <div className='bg-red-300'>{Math.random()}</div>
      </Section>
    </div>
  )
}
