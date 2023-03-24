import store from './redux-store/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core'
import theme from './theme'
import Routes from './Routes'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
          <Routes />
      </Provider>
    </ThemeProvider>
  )
}

export default App
