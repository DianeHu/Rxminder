import React from 'react';
import { Button, Image, View , Linking} from 'react-native';
import Camera from './components/Camera.js';

export default class ImagePickerExample extends React.Component {
    state = {
        image: null,
    };

    render() {
        let {image} = this.state;

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Camera isMedia={false} data={this.state.post} callback={this.getImage.bind(this)}/>
                {image &&
                <Image source={{uri: image}} style={{width: 200, height: 200}}/>}
            </View>
        );
    }

    getImage(img) {
        this.setState({image: img});
    }
}
