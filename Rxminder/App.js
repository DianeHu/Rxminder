import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker, Permissions } from 'expo';

//
// import React, { Component } from 'react';
// import { Text, View } from 'react-native';
//
// export default class HelloWorldApp extends Component {
//     render() {
//         return (
//             <View>
//                 <Text>Hello world!</Text>
//             </View>
//         );
//     }
// }

// import React from 'react';
// import {
//     AppRegistry,
//     StyleSheet,
//     Text,
//     View,
//     PixelRatio,
//     TouchableOpacity,
//     Image,
// } from 'react-native';
//
// import ImagePicker from 'react-native-image-picker';
// export default class App extends React.Component {
//
//     state = {
//         avatarSource: null,
//         // videoSource: null
//     };
//
//     selectPhotoTapped() {
//         const options = {
//             quality: 1.0,
//             maxWidth: 500,
//             maxHeight: 500,
//             storageOptions: {
//                 skipBackup: true
//             }
//         };
//
//         ImagePicker.showImagePicker(options, (response) => {
//             console.log('Response = ', response);
//
//             if (response.didCancel) {
//                 console.log('User cancelled photo picker');
//             }
//             else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             }
//             else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//             }
//             else {
//                 let source = { uri: response.uri };
//
//                 // You can also display the image using data:
//                 // let source = { uri: 'data:image/jpeg;base64,' + response.data };
//
//                 this.setState({
//                     avatarSource: source
//                 });
//             }
//         });
//     }
//
//
//     render() {
//         return (
//             <View style={styles.container}>
//                 <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
//                     <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
//                         { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
//                             <Image style={styles.avatar} source={this.state.avatarSource} />
//                         }
//                     </View>
//                 </TouchableOpacity>
//             </View>
//         );
//     }
//
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF'
//     },
//     avatarContainer: {
//         borderColor: '#9B9B9B',
//         borderWidth: 1 / PixelRatio.get(),
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     avatar: {
//         borderRadius: 75,
//         width: 150,
//         height: 150
//     }
// });


export default class ImagePickerExample extends React.Component {
    state = {
        image: null,
    };

    render() {
        let { image } = this.state;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    title="Take image from camera"
                    onPress={this._takeImage}/>
                <Button
                    title="Pick an image from camera roll"
                    onPress={this._pickImage}/>
                {image &&
                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
        );
    }

    _takeImage = async() => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status === 'granted') {
            let result = await ImagePicker.launchCameraAsync({

            });

            if (!result.cancelled) {
                //CameraRoll.saveToCameraRoll((await Expo.ImagePicker.launchCameraAsync({})).uri);
                this.setState({ image: result.uri });
            }
        }
    }

    _pickImage = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            console.log(result);

            if (!result.cancelled) {
                this.setState({ image: result.uri });
            }
        } else {
            throw new Error('Camera roll permission not granted');
        }
    };
}
