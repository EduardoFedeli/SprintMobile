
import React from "react";
import { Image } from "react-native";

export const Header = () => {
  return (
    <Image
      source={require("../../../assets/images/logo.png")} 
      style={{ width: 120, height: 40, resizeMode: "contain" }}
    />
  );
};
