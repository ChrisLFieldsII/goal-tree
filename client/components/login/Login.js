import { TabNavigator } from 'react-navigation';
import EZLogin from './tabComponents/EZLogin';
import EmailLogin from './tabComponents/EmailLogin';
import Register from './tabComponents/Register'

export default TabNavigator({
  EZ_Login: {
    screen: EZLogin
  },
  Regular_Login: {
    screen: EmailLogin
  },
  Register: {
    screen: Register
  },
});