import * as React from 'react';
import { StyleSheet} from 'react-native';
import Signup from './app/signup_';
import EndPage from './app/results';
import Login from './app/login_';
import { SignedIn } from './app/router';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './app/splashScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#3740FE',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        >
        <Stack.Screen name="SignedIn" component={SignedIn} options={{ headerShown: false }}/>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/>   
        <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup' }} />   
        <Stack.Screen name="Login" component={Login} options={{title: 'Login'}} />
        <Stack.Screen name="Result" component={EndPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});