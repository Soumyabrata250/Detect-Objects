import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { Camera } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from "@tensorflow/tfjs";


const TensorCamera = cameraWithTensors(Camera);

export default function App() {

const [model, setModel] = useState<cocoSsd.ObjectDetection>();  


let textureDims = Platform.OS == 'ios'
  ? {height: 1920, width: 1080} 
  : { height: 1200 , width: 1600};

  function handleCameraStream (images : any) {
    const loop = async() => {
      const nextImageTensor = images.next().value;
      if (!model || !nextImageTensor) 
        throw new Error('No model or image tensor');
      model
      .detect(nextImageTensor)
      .then((prediction) => {


      })
      .catch((error) => {
        console.log();
      });
    };
    loop();
  }

  useEffect(() => {

    (async() => {

      const { status} = await Camera.requestCameraPermissionsAsync();
      await tf.ready();
      setModel(await cocoSsd.load());

    })


  }, [])
  return (
    <View style={styles.container}>
      <TensorCamera style = {styles.camera}
        type = {Camera.Constants.Type.back}
        cameraTextureHeight = {textureDims.height}
        cameraTextureWidth = {textureDims.width}
        resizeHeight= {200}
        resizeWidth={152}
        resizeDepth = {3}
        onReady = {handleCameraStream}
        autorender = {true}
        useCustomShadersToResize = {false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  camera: {

  },
});
