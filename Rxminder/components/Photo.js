import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button
} from 'react-native';
import * as Dimensions from "react-native";

export default class Camera extends React.Component {

    constructor() {
        super(props);
        this.state = ({
            pickedImage: null
        });
    }

    takePicture() {
        this.camera.capture().then(
            (data) => console.log(data)).catch(err =>
            console.error(err));
    }

    render() {
        return (
            <View style={styles.container}>
                <Camera ref={cam => { this.camera = cam; }} style={styles.preview} aspect={Camera.constants.Aspect.fill}> <Text style={styles.capture} onPress={this.takePicture.bind(this)}> [CAPTURE] </Text></Camera>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems:"center"
    },
    textStyle: {
        fontWeight:"bold",
        fontSize:30,
        textAlign:"center",
        color:"red",
        marginTop:10
    },
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "70%",
        height: 280,
        marginTop:50,
    },
    button: {
        width: "80%",
        marginTop:20,
        flexDirection:"row",
        justifyContent: "space-around"
    },
    previewImage: {
        width: "100%",
        height: "100%"
    },
    preview: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', height: Dimensions.get('window').height, width: Dimensions.get('window').width},capture: { flex: 0, backgroundColor: '#fff', borderRadius: 5, color: '#000', padding: 10, margin: 40}
});
