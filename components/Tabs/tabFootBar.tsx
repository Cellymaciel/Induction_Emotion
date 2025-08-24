import { View, StyleSheet } from "react-native";
import { colors } from "@/constants/Colors";
import React from "react";

interface TabFootBarProps{}

export function TabFootBar({ children }: React.PropsWithChildren<TabFootBarProps>) {
    return (
        <View style={styles.tabBarContainer}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBarContainer: {
        backgroundColor: colors.Pure_White,
        height: 85,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        elevation: 15,
        position: 'absolute',
        borderColor: '#DCDCDC',
        borderWidth: 1,
        bottom: 0,
        width: '100%'
    }
});