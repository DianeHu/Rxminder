import {createStackNavigator} from 'react-navigation';

const Screens = createStackNavigator({
    Home: { screen: HomeScreen },
    Profile: { screen: ProfileScreen },
});

export default Screens;