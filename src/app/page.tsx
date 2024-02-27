'use client'

import ButtonBase from '@/pegasus-ui/components/Button/ButtonBase'
import { AiOutlineHome } from 'react-icons/ai'

export default function Home() {
  return (
    <div className='flex flex-col gap-3 m-5'>
      <div className='flex m-3 gap-3'>
        <ButtonBase type='primary'>Click Me</ButtonBase>
        <ButtonBase type='secondary'>Click Me</ButtonBase>
        <ButtonBase type='transparent'>Click Me</ButtonBase>
        <ButtonBase type='slient'>Click Me</ButtonBase>
      </div>
      <div className='flex m-3 gap-3'>
        <ButtonBase focusable size='lg' icon={<AiOutlineHome />} iconPosition='right'>Click Me</ButtonBase>
        <ButtonBase size='md' icon={<AiOutlineHome />}>Click Me</ButtonBase>
        <ButtonBase size='sm' icon={<AiOutlineHome />}>Click Me</ButtonBase>

      </div>
      <div className='flex m-3 gap-3'>
        <ButtonBase error>Click Me</ButtonBase>
        <ButtonBase success>Click Me</ButtonBase>
        <ButtonBase loading>Click Me</ButtonBase>
        <ButtonBase disabled>Click Me</ButtonBase>
        <ButtonBase danger>Click Me</ButtonBase>
      </div>
      
    </div>
  )
}
