import { useRef, useState } from 'react'

export type FieldValues = { [fieldId: string]: any }
export type FieldError = string | boolean | null
export type FieldErrors = { [fieldId: string]: FieldError }
export type FieldValidator = {
  validate: ((fieldValue: any, formValues?: FieldValues) => boolean) | RegExp
  errorMessage?: string
}

interface FormStore {
  [fieldId: string]: {
    value: any
    changed: boolean
    error: FieldError
    updateChildElementValue: (value: any) => void
    updateChildElementError: (error: FieldError) => void
    validators: FieldValidator | FieldValidator[] | null
  }
}

export interface UseFormProps {
  onFormChanged?: (changed?: boolean) => void
  onFormValueChanged?: { [fieldId: string]: (fieldValue: any, formValues?: FieldValues) => void }
}

export interface FormInstance {
  getFormValue: (fieldId?: string) => any | FieldValues
  setFormValue: (fieldId: string, value: any, isInitialSet?: boolean) => void
  setFormValues: (values: FieldValues, isInitialSet?: boolean) => void
  setFormError: (fieldId: string, error: FieldError) => void
  setFormErrors: (errors: FieldErrors) => void
  resetFormError: (fieldId: string) => void
  resetFormErrors: () => void
  validateForm: () => boolean
  _registerField: (
    fieldId: string,
    updateChildElementValue: (value: any) => void,
    updateChildElementError: (error: FieldError) => void,
    validators: FieldValidator | FieldValidator[] | null
  ) => void
  _updateFieldValue: (fieldId: string, value: any, isInitial?: boolean, shouldUpdateFieldChildElement?: boolean) => void
}

export default function useForm(props: UseFormProps): FormInstance {
  const { onFormChanged, onFormValueChanged } = props

  const formStore = useRef<FormStore>({})
  const [storeValues, setStoreValues] = useState<FieldValues>()

  const _getField = (fieldId: string) => {
    return formStore.current[fieldId]
  }

  const _registerField = (
    fieldId: string,
    updateChildElementValue: (value: any) => void,
    updateChildElementError: (error: FieldError) => void,
    validators: FieldValidator | FieldValidator[] | null
  ) => {
    formStore.current[fieldId] = {
      value: null,
      changed: false,
      error: null,
      updateChildElementValue,
      updateChildElementError,
      validators,
    }
  }

  const getFormValue = (fieldId?: string) => {
    if (fieldId) {
      const field = _getField(fieldId)
      if (!field) {
        console.warn(`Field "${fieldId}" not found!`)
        return null
      }
      return field.value
    } else {
      const values: FieldValues = {}
      for (const [fieldId, field] of Object.entries(formStore.current)) {
        values[fieldId] = field.value
      }
      return values
    }
  }

  const _handleOnFormValueChanged = (fieldId: string, value: any) => {
    const handler = onFormValueChanged?.[fieldId]
    if (!handler) return
    const values = getFormValue()
    handler(value, values)
  }

  const _updateFieldValue = (
    fieldId: string,
    value: any,
    isInitial?: boolean,
    shouldUpdateFieldChildElement?: boolean
  ) => {
    console.log(isInitial)
    const field = _getField(fieldId)
    if (!field) {
      console.warn(`Field "${fieldId}" not found!`)
      return
    }
    if (shouldUpdateFieldChildElement === true) {
      field.updateChildElementValue(value)
    }
    field.value = value
    if (isInitial === true) {
      field.changed = false
    }
    _handleOnFormValueChanged(fieldId, value)
    onFormChanged?.(!isInitial)
  }

  const setFormValue = (fieldId: string, value: any, isInitialSet?: boolean) => {
    _updateFieldValue(fieldId, value, isInitialSet, true)
  }

  const setFormValues = (values: FieldValues, isInitialSet?: boolean) => {
    for (const [fieldId, value] of Object.entries(values)) {
      setFormValue(fieldId, value, isInitialSet)
    }
  }

  const setFormError = (fieldId: string, error: FieldError) => {
    const field = _getField(fieldId)
    if (!field) {
      console.warn(`Field "${fieldId}" not found!`)
      return
    }
    field.error = error
    field.updateChildElementError(error)
  }

  const setFormErrors = (errors: FieldErrors) => {
    for (const [fieldId, error] of Object.entries(errors)) {
      setFormError(fieldId, error)
    }
  }

  const resetFormError = (fieldId: string) => {
    setFormError(fieldId, null)
  }
  const resetFormErrors = () => {
    for (const fieldId of Object.keys(formStore.current)) {
      setFormError(fieldId, null)
    }
  }

  const validateForm = () => {
    const formValues = getFormValue()
    let success = true
    for (const [fieldId, field] of Object.entries(formStore.current)) {
      const { validators } = field
      if (!validators) continue
      let _validators = []
      if (!Array.isArray(validators)) {
        _validators.push(validators)
      }
      for (const validator of _validators) {
        const { validate, errorMessage } = validator
        if (typeof validate === 'function') {
          try {
            const result = validate(field.value, formValues)
            if (!result) {
              field.error = errorMessage ?? true
              success = false
              setFormError(fieldId, errorMessage ?? true)
            }
          } catch (error: any) {
            console.log(error)
            const message = errorMessage ? errorMessage : error.message ?? true
            field.error = message
            success = false
            setFormError(fieldId, message)
          }
        } else if (validate instanceof RegExp) {
          if (typeof field.value !== 'string') {
            throw new Error(`Field "${fieldId}" does not has string value, can not be validated again RegExp!`)
          }
          if (!validate.test(field.value)) {
            field.error = errorMessage ?? true
            success = false
            setFormError(fieldId, errorMessage ?? true)
          }
        } else {
          throw new Error(`Field "${fieldId}" has unknow validator type!`)
        }
      }
    }
    return success
  }

  return {
    getFormValue,
    setFormValue,
    setFormValues,
    setFormError,
    setFormErrors,
    resetFormError,
    resetFormErrors,
    validateForm,
    _registerField,
    _updateFieldValue,
  }
}
