import {Button, Image, View, Linking} from "react-native";
import React, {Component} from "react";
import {ImagePicker, Permissions} from "expo";

class Camera extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {/*<View>*/}
                <Button
                    title="Take image from camera"
                    onPress={this._takeImage}/>
                <Button
                    title="Pick an image from camera roll"
                    onPress={this._pickImage}/>
            </View>
        );
    }

    _takeImage = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        if (status === 'granted') {
            let result = await ImagePicker.launchCameraAsync({});

            if (!result.cancelled) {
                this.sendImage(result);
                this.props.callback(result.uri);
            }
            else {
                throw new Error('Camera permission not granted')
            }
        }
    };

    _pickImage = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });

            if (!result.cancelled) {
                this.sendImage(result);
                this.props.callback(result.uri);
            }
        } else {
            throw new Error('Camera roll permission not granted');
        }
    };

    sendImage(img) {
        // Linking.openURL('https://rxminder-219319.appspot.com/string='+img.uri)

        const data = new FormData();
        data.append('photo', {
            uri: img.uri,
            type: 'image/jpeg', // or photo.type
            name: 'testPhotoName'
        });
        //const url_full = 'https://rxminder-219319.appspot.com/upload';
        const url_full = 'https://8080-dot-4607138-dot-devshell.appspot.com/hi';
        fetch(url_full, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                // 'Authorization': 'Bearer ' + 'ya29.Gls2BjYilbwQTQoyv01afAbjDBiGNe3bHV1cjVM_tg_ug37bHlgqQWPeUDL3VlXOBGMygQmaOYrg0Tg_EUCE5ksEJJUYR3kCPNubrAitt6jJuza4homLJRBYrLXR'

            },
            body: data,
        }).then(res => {
            console.log(res)
            console.log('HEREEEE')
        });
    }
}

export default Camera;