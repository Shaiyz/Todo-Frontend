import { colors } from '@material-ui/core'

const white = '#FFFFFF'
const black = '#000000'

const palette = {
  black,
  white,
  primary: {
    contrastText: white,
    dark: '#f9a100',
    main: '#ffa500',
    light: '#ffb732',
  },
  secondary: {
    contrastText: white,
    dark: '#1d3b1c',
    main: '#457a43',
    light: '#b3e3b1',
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400],
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400],
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: '#353535',
    secondary: white,
    link: colors.blue[600],
  },
  background: {
    dark: colors.grey[800],
    darker: colors.grey[900],
    default: '#F4F6F8',
    paper: white,
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200],
  transparent: '#00000000',
}

export default palette
