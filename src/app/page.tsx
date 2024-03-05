'use client'

import { ButtonType } from '@/pegasus-ui/components/Button/ButtonBase'
import { Divider, Button, Section, Input, DropdownSelection } from '../pegasus-ui'
import DateTimeSelection from '@/pegasus-ui/components/Select/DateTimeSelection'

const SelectionOptions = [
  { label: 'Option1', value: 'option1' },
  { label: 'Option2', value: 'option2' },
  { label: 'Option3', value: 'option3' },
  { label: 'Option4', value: 'option4' },
  { label: 'Option5', value: 'option5' },
  { label: 'Option6', value: 'option6' },
  { label: 'Option7', value: 'option7' },
  { label: 'Option8', value: 'option8' },
  { label: 'Option9', value: 'option9' },
]
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
      >
        <div className='flex w-full gap-2'>
          {['primary', 'secondary', 'transparent'].map((type, index) => {
            return (
              <Button key={index} type={type} tooltips='Infomation' position='bottom'>
                {type}
              </Button>
            )
          })}
        </div>
        <div className='flex w-full gap-2'>
          {['lg', 'md', 'sm', 'xs'].map((size, index) => {
            return (
              <Button key={index} size={size}>
                {size}
              </Button>
            )
          })}
        </div>
        <div className='flex w-full gap-2'>
          <Button success>Success</Button>
          <Button error>Error</Button>
          <Button danger>Danger</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>
      <Section title='Input' direction='horizontal'>
        <Input width='w-56' />
        <Input width='w-56' prefix='https://' />
        <Input width='w-56' suffix='Kg' type='number' />
        <Input width='w-56' type='password' />
        <Input width='w-56' showCopy />
        <Input width='w-56' error />
        <Input width='w-56' disabled placeHolder='disabled' />
      </Section>
      <Section title='Dropdown Selection' direction='horizontal'>
        <DropdownSelection width='w-56' options={SelectionOptions} />
        {/* <DropdownSelection width='w-56' error options={SelectionOptions} /> */}
        <DropdownSelection width='w-56' multiple options={SelectionOptions} />
      </Section>
      <Section title='Calendar'>
        <DateTimeSelection width='w-56' position='bottomLeft' locale='de' />
      </Section>
    </div>
  )
}
