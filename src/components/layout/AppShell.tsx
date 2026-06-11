import React from "react";
import { Platform, StyleSheet, View } from "react-native";

import { colors } from "../../theme";

const webShell =
  Platform.OS === "web"
    ? ({
        maxWidth: 460,
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        alignSelf: "center",
        height: "100vh",
        overflow: "hidden",
        boxShadow: "0 22px 80px rgba(55, 38, 20, 0.16)"
      } as object)
    : null;

export function AppShell({ children }: { children: React.ReactNode }) {
  return <View style={[styles.shell, webShell]}>{children}</View>;
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: colors.backgroundTop
  }
});
