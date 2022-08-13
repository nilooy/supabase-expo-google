import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { supabase } from "./utils/supabase";
import Signin from "./screens/signin";
import Profile from "./screens/profile";

const Stack = createNativeStackNavigator();

const App = () => {
// This state to check the authentication state of the user
// !! operator to transform the value to Boolean
  const [isAuth, setIsAuth] = useState(!!supabase.auth.user());

  /*Supabase has this authentication's event listener
   * We are setting the isAuth state by checking supabase user data for all events
   * signed_in -> !!supabase.auth.user() -> true
   * signed_out -> !!supabase.auth.user() -> false
   * */
  supabase.auth.onAuthStateChange((event, session) => {
    setIsAuth(!!supabase.auth.user());
  });

  return (
      <NavigationContainer>
        <Stack.Navigator>
          {/* Conditionally render private and prublic screens */}
          {!isAuth ? (
              <Stack.Screen name="Signin" component={Signin} />
          ) : (
              <Stack.Screen name="Profile" component={Profile} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
