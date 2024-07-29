import React from 'react'
import { SafeAreaView, Text, View } from '@/components/Themed'
import { StyleSheet } from 'react-native';

const SignInScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>Sign In Screen</Text>
      </View>
    </SafeAreaView>
  )
}

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapper: {
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: 16,
    },
  });