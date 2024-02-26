import {
  cloneElement,
  createContext,
  createElement,
  useContext,
  useEffect,
  useState,
} from 'react'
import { FieldError, FieldErrors, FieldValidator, FieldValues, FormInstance } from '../hooks/useForm'

import classNames from 'classnames'
import { WithDirectionProps, WithIdProps, WithSizeProps } from '../utils/shared_interfaces'
import { Gap } from '../utils/default_style'

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

export interface FormProps extends WithIdProps {
  form: FormInstance
  gap?: string
  children: any
}
export function Form(props: FormProps) {
  const { id, form, gap = Gap.md, children } = props
  return (
    <FormContext.Provider value={form}>
      <div id={id} className={classNames('flex w-full flex-col', gap)}>
        {children}
      </div>
    </FormContext.Provider>
  )
}

export interface FormSection extends WithIdProps, WithDirectionProps {
  title?: string
  tools?: any[]
  gap?: string
  children: any
}
export function FormSection(props: FormSection) {
  const { id, title, tools, direction = 'vertical', gap = Gap.sm, children } = props
  return (
    <div id={id} className={classNames('flex w-full flex-col', gap)}>
      {title && (
        <div className={classNames('flex w-full items-center', { 'justify-start': !tools, 'justify-between': tools })}>
          <span className='flex justify-start items-center text-sm font-normal text-slate-400'>{title}</span>
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
      <div className={classNames('flex w-full', gap, { 'flex-col': direction === 'vertical' })}>{children}</div>
    </div>
  )
}

export interface FormFieldProps extends WithIdProps, WithDirectionProps, WithSizeProps {
  fieldId: string
  title?: string
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
    title,
    direction = 'vertical',
    size = 'md',
    width = 'w-full',
    required = false,
    disabled = false,
    validate,
    children,
  } = props
  const vertical = direction === 'vertical'
  const horizontal = direction === 'horizontal'
  const lg = size === 'lg'
  const md = size === 'md'
  const sm = size === 'sm'

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
    <div className={classNames('flex', width, Gap.xs, { 'flex-col': vertical })}>
      {title && <div className={classNames('flex')}>{title}</div>}
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
