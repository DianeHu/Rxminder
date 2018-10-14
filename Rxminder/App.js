import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import ImgToBase64 from 'react-native-image-base64';
import * as body from "express";

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

    stringToUint8Array(str) {
        const length = str.length
        const array = new Uint8Array(new ArrayBuffer(length))
        for(let i = 0; i < length; i++) array[i] = str.charCodeAt(i)
        return array
    }

    uploadExpress(uriString) {
        // Instantiate a FormData() object
        const image = {
            uri: uriString,
            type: 'image/jpeg',
            name: 'myImage' + '-' + Date.now() + '.jpg'
        }

        const imgBody = new FormData();
        // append the image to the object with the title 'image'
        body.append('image', image);
        const url = 'http://localhost:5000/';
        // Perform the request. Note the content type - very important
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: imgBody
        }).then(res => res.json()).then(results => console.log(results))
            .catch(error => console.log(error));
    }


    upload(uri) {
        console.log(uri);
        console.log("THIS IS THE URI");
        /*try {
            FileSystem.readAsStringAsync(uri).then(content => this.postTo(base64.fromByteArray(this.stringToUint8Array(content))));
        } catch(e) {
            console.warn('fileToBase64()', e.message)
            return ''
        }*/
        ImgToBase64.getBase64String(uri).then(base64String => /*this.postTo(base64String*/console.log(base64String)).catch(err => console.log(err));
    }

    uploadExpress(uriString) {
        const image = {
            uri: uriString,
            type: 'image/jpeg',
            name: 'myImage' + '-' + Date.now() + '.jpg'
        }

        const imgBody = new FormData();
        body.append('image', image);
        const url = 'https://guarded-headland-19054.herokuapp.com/';

        fetch(url, {
            method: 'GET'
            /*headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: imgBody*/
        }).then(res => res.json()).then(results => {
            console.log("success");
        }).catch(error => {
            console.log("error");
        })
    }

    postTo(stringBody) {
        fetch('https://rxminder-219319.appspot.com/?string=' + stringBody);
    }

    _takeImage = async() => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status === 'granted') {
            let result = await ImagePicker.launchCameraAsync({
            });

            if (!result.cancelled) {
                //CameraRoll.saveToCameraRoll((await Expo.ImagePicker.launchCameraAsync({})).uri);
                this.setState({ image: result.uri });
                console.log(result);
                this.uploadExpress(result.uri);
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

            if (!result.cancelled) {
                this.setState({ image: result.uri });
                this.uploadExpress(result.uri);
            }
        } else {
            throw new Error('Camera roll permission not granted');
        }
    };
}
