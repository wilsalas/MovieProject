import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from '../components/Home';

export default createAppContainer(createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                title: ''
            }
        }
    },
    {
        initialRouteName: "Home"
    }
));


