import { Pressable, StyleSheet, Text, View } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { supabase } from "../utils/supabase";
import { SUPABASE_URL } from "../utils/config";

const Signin = () => {
    // No need to fill this fields
    // I added them because they are required params
    const [req, _res, promptAsync] = Google.useAuthRequest({
        expoClientId: '',
        iosClientId: '',
        androidClientId: ''
    })

    console.log({ss: req?.redirectUri})

    const handleGoogleSignIn = () => {
        // Will trigger Google sign-in pop up and redirect
        // the redirect url must be added in supabase setting -> authentication -> Redirect url
        // You can get the url by logging `req.redirectUri`
        promptAsync({
            url: `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${req?.redirectUri}`,

        }).then(async (res) => {
            // After we got refresh token with the response, we can send it to supabase to sign-in the user
            const { user, session, error } = await supabase.auth.signIn({
                refreshToken: res.params.refresh_token,
            });
            console.log({ user, session, error });
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headline}>Supabase Auth</Text>

            <Pressable style={styles.btn} onPress={handleGoogleSignIn}>
                <Text style={styles.btnText}>Login With Google</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 6,
    },
    headline: {
        fontSize: 40,
    },
    btn: {
        width: 250,
        backgroundColor: "#000",
        borderRadius: 6,
        paddingTop: 6,
        paddingBottom: 6,
        marginTop: 100,
    },
    btnText: {
        textAlign: "center",
        fontSize: 20,
        color: "#ffffff",
        fontWeight: "400",
    },
});

export default Signin;
