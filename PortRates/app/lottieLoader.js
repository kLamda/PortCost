import LottieView from "lottie-react-native";
import React from "react";
import {View, StyleSheet} from "react-native";

export default function LottiePreloader() {
    return (
        <View style={styles.preLoader}>
            <LottieView
            source={require("../assets/loading.json")}
            loop
            autoPlay>
            </LottieView>
        </View>
    );
}

const styles = StyleSheet.create({
    preLoader: {
    backgroundColor: "#133971",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});