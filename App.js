// App.js ou seu arquivo de navegação

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignUpPage from './screens/SignUpPage';
import HomeScreen from './screens/HomeScreen';
import ProfilePage from './screens/ProfilePage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} // Remover o título
        />
        <Stack.Screen 
          name="SignUpPage" 
          component={SignUpPage} 
          options={{ headerShown: false }} // Remover o título
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} // Remover o título
        />
        <Stack.Screen 
          name="ProfilePage" 
          component={ProfilePage} 
          options={{ headerShown: false }} // Remover o título
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
