import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { FieldError, FieldErrors, FieldValidator, FieldValues, FormInstance } from '../../hooks/useForm'

import clsx from 'clsx'
import { WithDirection, WithId, WithSizing, parseDirection } from '../../shared/interfaces'
import {  Spacing } from '../../shared/styles'

export const FormContext = createContext<FormInstance>({
  getFormValue: () => {},
  setFormValue: (fieldId: string, value: any) => {},
  setFormValues: (values: FieldValues) => {},
  setFormError: (fieldId: string, error: FieldError) => {},
  setFormErrors: (errors: FieldErrors) => {},
  resetFormError: (fieldId: string) => {},
  resetFormErrors: () => {},
  validateForm: () => {
    return true
  },
  _registerField: (
    fieldId: string,
    updateChildElementValue: (value: any) => void,
    updateChildElementError: (error: FieldError) => void,
    validators: FieldValidator | FieldValidator[] | null
  ) => {},
  _updateFieldValue: (fieldId: string, value: any, isInitial?: boolean, shouldUpdateFieldChildElement?: boolean) => {},
})

export interface FormProps extends WithId {
  form: FormInstance
  gap?: string
  children: any
}
export function Form(props: FormProps) {
  const { id, form, gap=Spacing.gap.normal, children } = props
  return (
    <FormContext.Provider value={form}>
      <div id={id} className={clsx('flex w-full flex-col', gap)}>
        {children}
      </div>
    </FormContext.Provider>
  )
}

export interface FormSection extends WithId, WithDirection {
  title?: string
  tools?: any[]
  gap?: string
  children: any
}
export function FormSection(props: FormSection) {
  const { id, title, tools, direction = 'vertical', gap = Spacing.gap.normal, children } = props
  return (
    <div id={id} className={clsx('flex w-full flex-col', gap)}>
      {title && (
        <div className={clsx('flex w-full items-center', { 'justify-start': !tools, 'justify-between': tools })}>
          <span className='flex justify-start items-center text-sm font-normal text-deemphasized-content'>{title}</span>
          {tools && (
            <span className='flex justify-start items-center'>
              {tools.map((tool, index) => {
                return (
                  <span key={index} className='flex justify-start items-center'>
                    {tool}
                  </span>
                )
              })}
            </span>
          )}
        </div>
      )}
      <div className={clsx('flex w-full', gap, { 'flex-col': direction === 'vertical' })}>{children}</div>
    </div>
  )
}

export interface FormFieldProps extends WithId, WithDirection, WithSizing {
  fieldId: string
  label?: string
  width?: string
  required?: boolean
  disabled?: boolean
  validate?: FieldValidator | FieldValidator[]
  children: any
}
export function FormField(props: FormFieldProps) {
  const {
    id,
    fieldId,
    label,
    direction = 'vertical',
    size = 'md',
    width = 'w-full',
    required = false,
    disabled = false,
    validate,
    children,
  } = props
  const {vertical} = parseDirection(direction)


  const form = useContext(FormContext)

  const [fieldValue, setFieldValue] = useState(null)
  const [fieldError, setFieldError] = useState<FieldError>(null)

  useEffect(() => {
    let validators: FieldValidator | FieldValidator[] = []
    if (required) {
      validators.push({
        validate: (fieldValue) => {
          if (fieldValue === null || fieldValue === undefined || fieldValue === '') {
            return false
          }
          return true
        },
      })
    }
    if (validate) {
      if (Array.isArray(validate)) {
        validators = [...validators, ...validate]
      } else {
        validators.push(validate)
      }
    }
    if (fieldId) {
      form._registerField(fieldId, setFieldValue, setFieldError, validators)
    }
  }, [])

  return (
    <div className={clsx('flex', width, Spacing.gap.tight, { 'flex-col': vertical })}>
      {label && <div className={clsx('flex text-content')}>{label}</div>}
      <div>
        {cloneElement(children, {
          ...children.props,
          value: fieldValue,
          onChange: (value: any) => {
            setFieldValue(value)
            form._updateFieldValue(fieldId, value)
          },
          size,
          disabled,
          error: fieldError,
        })}
      </div>
      {fieldError && typeof fieldError === 'string' && <div>{fieldError}</div>}
    </div>
  )
}
