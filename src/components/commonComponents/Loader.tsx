import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

const Loader = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  return (
    <View style={styles.mainContainer}>
      <ActivityIndicator color="Blue" size={80} />
    </View>
  );
};

export default Loader;

const useStyles = (theme: any) =>
  StyleSheet.create({
    mainContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      width: '100%',
    },
  });
