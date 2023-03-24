import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
} from '@material-ui/core'

import Formfield from '../Formfeild/Formfeild'
import { populateForm, validateField, validateForm } from '../../utils'
const DialogForm = ({
  open,
  onClose,
  formData,
  formConfig,
  onSubmit,
  title,
}) => {
  const [formState, setFormState] = useState(formConfig)

  useEffect(() => {
    if (formData) {
      setFormState(populateForm(formData, formState))
    } else {
      setFormState(formConfig)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData])

  const changeFormValue = async (event, fieldIdentifier) => {
    let value = event.target.value
    
    const updatedForm = {
      ...formState,
      [fieldIdentifier]: {
        ...formState[fieldIdentifier],
        elementConfig: { ...formState[fieldIdentifier].elementConfig },
        value,
        valid: validateField(value, formState[fieldIdentifier].validatingRules),
      },
    }
    setFormState(updatedForm)
  }

  const form = (
    <div>
      {formState &&
        Object.keys(formState).map((el) => (
          <Formfield
            key={el}
            label={formState[el].label}
            elementType={formState[el].elementType}
            value={formState[el].value}
            elementConfig={formState[el].elementConfig}
            options={formState[el].options}
            required={formState[el].validatingRules.required}
            invalid={!formState[el].valid}
            invalidMessage={formState[el].validityMessage}
            valueChanged={(event) => changeFormValue(event, el)}
          />
        ))}
    </div>
  )

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {form}
        <DialogActions>
          <Button variant='contained' onClick={onClose} color='default'>
            Cancel
          </Button>
          <Button
            variant='contained'
            disabled={!validateForm(formState)}
            onClick={() => {
              onSubmit(formState)
              onClose()
            }}
            color='secondary'
          >
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default DialogForm
