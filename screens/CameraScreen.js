
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';

import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';

export default function CameraScreen({ onBack }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [photos, setPhotos] = useState([]);

  const cameraRef = useRef(null);

  const openCamera = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();

      if (!result.granted) {
        Alert.alert('Permission required', 'Allow camera access.');
        return;
      }
    }

    setCameraOpen(true);
  };

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync();

      setPhotos(old => [
        { id: Date.now().toString(), uri: photo.uri },
        ...old,
      ]);

      setCameraOpen(false);
      Alert.alert('Success', 'Photo captured!');
    } catch {
      Alert.alert('Error', 'Unable to capture photo.');
    }
  };

  const getLocation = async () => {
    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permission required', 'Allow location access.');
        return;
      }

      const position = await Location.getCurrentPositionAsync({});

      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch {
      Alert.alert('Error', 'Unable to get location.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📍 Camera & GPS</Text>
      <Text style={styles.subtitle}>Capture your coffee moments!</Text>

      {cameraOpen ? (
        <View>
          <CameraView ref={cameraRef} style={styles.camera} />

          <TouchableOpacity
            style={styles.button}
            onPress={takePhoto}
          >
            <Text style={styles.buttonText}>📸 Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCameraOpen(false)}
          >
            <Text style={styles.buttonText}>Cancel Camera</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={openCamera}
          >
            <Text style={styles.buttonText}>📷 Open Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={getLocation}
          >
            <Text style={styles.buttonText}>📍 Get My Location</Text>
          </TouchableOpacity>

          {location && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Your Current Location</Text>
              <Text>Latitude: {location.latitude}</Text>
              <Text>Longitude: {location.longitude}</Text>
            </View>
          )}

          <Text style={styles.heading}>My Coffee Photos</Text>

          {photos.length === 0 ? (
            <Text>No photos captured yet.</Text>
          ) : (
            photos.map(photo => (
              <Image
                key={photo.id}
                source={{ uri: photo.uri }}
                style={styles.photo}
              />
            ))
          )}

          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.buttonText}>← Back to Home</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6F4E37',
    textAlign: 'center',
    marginTop: 35,
  },
  subtitle: {
    textAlign: 'center',
    color: '#795548',
    marginBottom: 20,
  },
  heading: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#6F4E37',
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6F4E37',
    marginBottom: 6,
  },
  button: {
    backgroundColor: '#6F4E37',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 8,
  },
  backButton: {
    backgroundColor: '#A1887F',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  camera: {
    height: 400,
    overflow: 'hidden',
    borderRadius: 10,
  },
  photo: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginVertical: 8,
  },
});