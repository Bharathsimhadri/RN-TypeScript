import React, {useState, useEffect, useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {Modal} from 'react-native';
import {
  launchCamera,
  CameraOptions,
  ImageLibraryOptions,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import Loader from '../../components/commonComponents/Loader';
import {
  getFrontPartDataAsync,
  getBackPartDataAsync,
} from '../../services/ocr/fetchFrontPartData';

const ScanImageScreen = () => {
  const [isToShowLoader, setIsToShowLoader] = useState(false);
  const [isFrontSelected, setIsFrontSelected] = useState(false);
  const [isToShowImageSelection, setIsToShowImageSelection] = useState(false);
  const [uri, setUri] = useState('');

  const onCameraSelected = async () => {
    setIsToShowImageSelection(false);
    let options: CameraOptions = {
      includeBase64: true,
      mediaType: 'photo',
      saveToPhotos: true,
    };
    let res: ImagePickerResponse = {};
    res = await launchCamera(options);
    if (res?.assets[0]?.base64) {
      console.log('launchCamera',res?.assets[0]?.base64);
      if (isFrontSelected) {
        await upLoadFrontPart(res?.assets[0]?.base64);
      } else {
        await upLoadBackPart(res?.assets[0]?.base64);
      }
    }
    //console.log('result*************', res);
  };

  const onGallerySelected = async () => {
    setIsToShowImageSelection(false);
    let options: ImageLibraryOptions = {
      includeBase64: true,
      mediaType: 'photo',
    };
    let res: ImagePickerResponse = {};
    res = await launchImageLibrary(options);
    if (res?.assets[0]?.base64) {
     // console.log('launchImageLibrary',res?.assets[0]?.base64);
      if (isFrontSelected) {
        await upLoadFrontPart(res?.assets[0]?.base64);
      } else {
        await upLoadBackPart(res?.assets[0]?.base64);
      }
    }
  };

  const upLoadFrontPart = async (base64: string) => {
    console.log('upLoadFrontPart****************');
    setIsToShowLoader(true);
    var data = await getFrontPartDataAsync(base64);
    setIsToShowLoader(false);
    console.log('data****************', data);
  };

  const upLoadBackPart = async (base64: string) => {
    console.log('upLoadBackPart****************');
    setIsToShowLoader(true);
    var data = await getBackPartDataAsync(base64);
    setIsToShowLoader(false);
    console.log('data****************', data);
  };

  return (
    <View style={{height: '100%', width: '100%'}}>
      <View>
        <TouchableOpacity
          onPress={() => {
            setIsToShowImageSelection(true);
            setIsFrontSelected(true);
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              margin: 10,
              backgroundColor: 'blue',
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>
              Scan front
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsToShowImageSelection(true);
            setIsFrontSelected(false);
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              margin: 10,
              backgroundColor: 'blue',
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>Scan back</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isToShowImageSelection}
        statusBarTranslucent={true}
        transparent={true}
        onRequestClose={() => setIsToShowImageSelection(false)}>
        <TouchableWithoutFeedback
          onPress={() => setIsToShowImageSelection(false)}>
          <View
            style={{
              height: '100%',
              width: '100%',
              alignContent: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(100, 100, 100, 0.9)',
            }}>
            <TouchableOpacity onPress={() => onCameraSelected()}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  margin: 10,
                  backgroundColor: 'white',
                }}>
                <Text style={{textAlign: 'center', color: 'black'}}>
                  Open camera
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onGallerySelected()}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  margin: 10,
                  backgroundColor: 'white',
                }}>
                <Text style={{textAlign: 'center', color: 'black'}}>
                  choose from gallery
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        visible={isToShowLoader}
        statusBarTranslucent={true}
        transparent={true}
        onRequestClose={() => setIsToShowLoader(false)}>
        <Loader />
      </Modal>
    </View>
  );
};

export default ScanImageScreen;
