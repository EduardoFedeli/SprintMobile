import React from "react";
import { Image, View, StyleSheet, SafeAreaView } from "react-native";

export const Header = () => {
  return (
    <SafeAreaView style={StyleSheet.create({
      container: {
        alignItems: "center",
        // Ajuste sutil para garantir que o logo não toque a borda
        paddingVertical: 4, 
      }
    }).container}>
      <Image
        source={require("../../../assets/images/logo.png")}
        style={StyleSheet.create({
          logo: {
            width: 120,
            height: 40,
            resizeMode: "contain",
          }
        }).logo}
      />
    </SafeAreaView>
  );
};