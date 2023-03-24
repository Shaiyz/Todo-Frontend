import {
  TextField,
  Select,
  withStyles,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'

const CssTextField = withStyles((theme) => ({
  root: {
    '& .MuiFormLabel-root': {
      color: 'black',
      textTransform: 'uppercase',
      fontSize: '14px',

      '&:hover': {
        color: theme.palette.primary.main,
      },
    },

    '& label.Mui-focused': {
      color: theme.palette.primary.main,
    },

    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.primary.main,
    },

    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
        borderRadius: '1px',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
    margin: '10px 0',
  },
}))(TextField)

const Formfeild = (props) => {
  // const classes = useStyle()
  var field = null
  switch (props.elementType) {
    default:
      field = (
        <CssTextField
          variant='outlined'
          fullWidth
          inputProps={{ ...props.elementConfig }}
          value={props.value}
          label={props.label}
          InputLabelProps={{ shrink: true }}
          required={props.required}
          disabled={props.disabled}
          error={props.invalid}
          helperText={props.invalid ? props.invalidMessage : ''}
          onChange={props.valueChanged}
        />
      )
      break
    case 'input':
      
        field = (
          <CssTextField
            variant='outlined'
            fullWidth
            inputProps={{ ...props.elementConfig }}
            InputLabelProps={{ shrink: true }}
            label={props.label}
            value={props.value}
            required={props.required}
            disabled={props.disabled}
            error={props.invalid}
            helperText={props.invalid ? props.invalidMessage : ''}
            onChange={props.valueChanged}
          />
        )
      
      break
    case 'textarea':
      field = (
        <CssTextField
          InputLabelProps={{ shrink: true }}
          variant='outlined'
          multiline
          fullWidth
          inputProps={{ ...props.elementConfig }}
          value={props.value}
          label={props.label}
          required={props.required}
          error={props.invalid}
          helperText={props.invalid ? props.invalidMessage : ''}
          onChange={props.valueChanged}
        />
      )
      break
    case 'select':
        field = (
          <FormControlLabel
            control={
              <Checkbox
                checked={props.value}
                onChange={(e) =>
                  props.valueChanged({
                    ...e,
                    target: { ...e.target, value: e.target.checked },
                  })
                }
                name={props.elementConfig.name}
                color='primary'
              />
            }
            label={props.label}
          />
        )
      
      break
 
  }

  return field
}

export default Formfeild
