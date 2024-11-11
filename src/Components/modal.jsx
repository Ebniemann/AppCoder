
import { Modal, Text, View,  StyleSheet, Pressable } from "react-native";
import { colors } from "../Global/colors";


const ModalView = ({ visible, onAcept, onClose, selectedProd, closeOption, aceptOption }) => {
  return (

    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <View style={style.modalOverlay}>
        <View style={style.modalContainer}>
          <Text style={style.message}>Esta por eliminar este producto:</Text>
          <Text style={style.text}>{selectedProd.value}</Text>
          <View style={style.buttonContent}>
            <Pressable style={style.button}  onPress={onClose} ><Text style={style.textButton}>{closeOption}</Text></Pressable>
            <Pressable style={style.button}  onPress={onAcept} ><Text style={style.textButton}>{aceptOption}</Text></Pressable>
          </View>
        </View>
      </View>
    </Modal>

  );
};

export default ModalView;

const style = StyleSheet.create({

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 350, 
    height: 250, 
    backgroundColor: colors.white,
    borderColor: colors.blue,
    borderWidth: 3,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 10
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 20
  },
  buttonContent: {
    width:'100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button:{
    width:'38%',
    height: 40,
    backgroundColor: colors.blue,
    borderRadius:5,
    justifyContent: 'center'
  },
  textButton:{
    fontSize: 20,
    color: colors.white,
    textAlign: 'center'
  }
})