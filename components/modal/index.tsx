import { colors } from "@/constants/Colors"
import { font } from "@/constants/font"
import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";


interface CustomModalProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    titleButon: string
  }


const CustomModal : React.FC<CustomModalProps> = ({visible, onClose, title, children, titleButon}) => {
    return(
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
        <View style={styles.overlay}>
            <View style={styles.modalContainer}>
            {title && <Text style={styles.title}>{title}</Text>}
         <View style={styles.content}>{children}</View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>{titleButon}</Text>
           </TouchableOpacity>
         </View>
        </View>
    </Modal>
    )
}
const styles = StyleSheet.create({
    overlay: {
         flex: 1, 
         justifyContent: "center",
          alignItems: "center", 
          
         },
    modalContainer: {
         width: "80%", 
         padding: 20, 
         paddingBottom:25,
         backgroundColor: colors.Pure_White,
         borderRadius: 10,
         alignItems: "center" 
        },
    title: {
         fontSize: 18, 
         color:colors.Black,
         fontFamily:font.bold,
         marginBottom: 10 
        },
    content: {
         marginBottom: 20 ,
         color:colors.Black
        },
    closeButton: { 
        backgroundColor: colors.Black,
         padding: 10, 
         borderRadius: 5 
    },
    closeButtonText: { 
        color:colors.branco,
         fontFamily:font.bold
         },
  });

  export default CustomModal