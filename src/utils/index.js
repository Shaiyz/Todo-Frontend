import { useEffect, useRef } from 'react'
export function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
export const copy = (object) => JSON.parse(JSON.stringify(object))

export const commafy = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')


export const url_encode = (val) => encodeURIComponent(JSON.stringify(val))

export const url_decode = (val) => JSON.parse(decodeURIComponent(val))

export const keyfy = (key) =>
  key
    .split('')
    .reduce((acc, curr) => {
      let char = ''
      if (acc.length === 0 && curr !== curr.toUpperCase()) {
        char = curr.toUpperCase()
      } else if (
        acc.length > 0 &&
        curr === curr.toUpperCase() &&
        curr !== ' ' &&
        acc[acc.length - 1] !== ' '
      ) {
        char = ' ' + curr
      } else {
        char = curr
      }
      acc.push(char)
      return acc
    }, [])
    .join('')

export const populateForm = (data, formState) => {
  const form = {}
  for (let key in formState) {
    form[key] = {
      ...formState[key],
      elementConfig: { ...formState[key].elementConfig },
    }
  }
  for (let key in data) {
    if (typeof data[key] === 'object' && data[key] !== null) {
      const nested = data[key]
      for (let key2 in nested) {
        if (form[key2]) {
          form[key2].value = nested[key2]
        }
      }
    } else {
      if (form[key]) {
        form[key].value = data[key]
      }
    }
  }
  return form
}

export const validateForm = (form) => {
  var valid = true
  for (let k in form)
    if (form[k].validatingRules.required) {
      valid = valid && form[k].valid && form[k].value.length !== 0
    } else valid = valid && form[k].valid
  return valid
}

export const validateField = (value, validatingRules) => {
  var isValid = true

  if (validatingRules.required) isValid = value.length !== 0 && isValid
  if (validatingRules.maxLength)
    isValid = value.length <= validatingRules.maxLength && isValid
  if (validatingRules.minLength)
    isValid = value.length >= validatingRules.minLength && isValid
  if (validatingRules.isEmail && value !== '') {
    let pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    isValid = pattern.test(value.toLowerCase()) && isValid
  }
  if (validatingRules.url && value !== '') {
    let pattern = new RegExp(
      '^((ftp|http|https):\\/\\/)' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ) // fragment locator
    isValid = pattern.test(value.toLowerCase()) && isValid
  }
  if (validatingRules.strongPassword && value !== '') {
    let pattern = new RegExp(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'
    )
    isValid = pattern.test(value) && isValid
  }

  return isValid
}

export const validateSongFields = (value, validatingRules) => {
  var isValid = true

  if (validatingRules.required) isValid = value.value.length !== 0 && isValid

  return isValid
}
