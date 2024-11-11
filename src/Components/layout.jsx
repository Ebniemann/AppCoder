import { SafeAreaView, View, StyleSheet } from "react-native";
import Header from "./header";
import Footer from "./footer";
import { colors } from "../Global/colors";


const Layout =({children})=>{
  return(
    <SafeAreaView style={style.container}>
      {/* <Header/> */}
      <View style={style.ViewContainer}>{children}</View>
      <Footer/>
    </SafeAreaView>
  )
}

export default Layout;

const style = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: colors.white
  },
  ViewContainer: {
    flex:1,
    paddingLeft:10,
    paddingRight:10
    
  }

})