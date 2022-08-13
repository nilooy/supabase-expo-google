import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { supabase } from "../utils/supabase";

const Profile = () => {
    // Get authenticated user data
    const user = supabase.auth.user();

    const handleSignOut = () => supabase.auth.signOut();

    return (
        <View style={styles.container}>
            {!!user.user_metadata && (
                <>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: user.user_metadata.picture,
                        }}
                    />
                    <Text style={styles.infoTxt}>
                        Name: {user.user_metadata.full_name}
                    </Text>
                </>
            )}

            <Text style={styles.infoTxt}>Email: {user.email}</Text>

            <Pressable style={styles.btn} onPress={handleSignOut}>
                <Text style={styles.btnText}>Logout</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fffff3",
        alignItems: "center",
        padding: 6,
        paddingTop: 20,
    },
    infoTxt: {
        fontSize: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 20,
    },
    btn: {
        width: 150,
        backgroundColor: "red",
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

export default Profile;
