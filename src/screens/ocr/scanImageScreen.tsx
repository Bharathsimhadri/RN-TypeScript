import React, {useState, useEffect, useCallback} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Modal
} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {
  launchCamera,
  CameraOptions,
  ImageLibraryOptions,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import NFC from 'react-native-rfid-nfc-scanner';
import nfcManager, {NfcTech} from 'react-native-nfc-manager';

import {
  getFrontPartDataAsync,
  getBackPartDataAsync,
} from '../../services/ocr/fetchFrontPartData';
import Loader from '../../components/commonComponents/Loader';

const ScanImageScreen = () => {
  const [isToShowLoader, setIsToShowLoader] = useState(false);
  const [isFrontSelected, setIsFrontSelected] = useState(false);
  const [isToShowImageSelection, setIsToShowImageSelection] = useState(false);
  const [uri, setUri] = useState('');

  // useFocusEffect(
  //   useCallback(() => {
  //     initializeNFCmanager();
  //   }, []),
  // );

  useEffect(() => {
    return () => {
      NFC.removeListener('READ');
    };
  });

  const checkAndUseNfcScanner = () => {
    try {
      var deviceStatus = NFC.checkDeviceStatus();
      if (deviceStatus == 'ready' && NFC.isEnabled()) {
        NFC.addListener('READ', _notifyListener, _notifyErrListeners);
        NFC.initialize();
      } else {
        Alert.alert(
          'Error',
          ' Your device doesnt Support NFC reading, Device NFC Status:-' +
            deviceStatus,
          [
            {
              text: 'Ok',
              onPress: () => {
                console.log('Ok clicked');
              },
            },
          ],
        );
      }
    } catch (error) {
      var e = error as Error;
      Alert.alert('Error', e.message, [
        {
          text: 'Ok',
          onPress: () => {
            console.log('Ok clicked');
          },
        },
      ]);
    }
  };

  const _notifyListener = response => {
    NFC.stopScan();
    Alert.alert('Sucess', 'Data' + response?.from_device?.data[0][0]?.data, [
      {
        text: 'Ok',
        onPress: () => {
          console.log('Ok clicked');
        },
      },
    ]);
  };

  const _notifyErrListeners = data => {
    NFC.stopScan();
    Alert.alert('Error', 'Failed to read data', [
      {
        text: 'Ok',
        onPress: () => {
          console.log('Ok clicked');
        },
      },
    ]);
  };

  async function initializeNFCmanager() {
    await nfcManager?.start().catch(err => {
      Alert.alert(
        'Error',
        ' Your device doesnt Support NFC reading, Device',
        [
          {
            text: 'Ok',
            onPress: () => {
              console.log('Ok clicked');
            },
          },
        ],
      );
    });
  }
  const nfcManagerAsync = async () => {
    await initializeNFCmanager();
    try {
      console.log('nfcManagerAsync***********', nfcManager);
      await nfcManager.requestTechnology(NfcTech.NfcA);
      const tag = await nfcManager.getTag();
      console.warn('Tag found', tag);
    } catch (ex) {
      console.log('Oops!', ex);
    } finally {
      // stop the nfc scanning
      nfcManager.cancelTechnologyRequest();
    }
  };

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
      console.log('launchCamera', res?.assets[0]?.base64);
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
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => checkAndUseNfcScanner()}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              margin: 10,
              backgroundColor: 'blue',
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>NFC Scan</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => nfcManagerAsync()}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              margin: 10,
              backgroundColor: 'blue',
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>
              NFC Scan 2
            </Text>
          </View>
        </TouchableOpacity> */}
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
