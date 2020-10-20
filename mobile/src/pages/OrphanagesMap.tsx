import React, { useCallback, useState } from 'react';

import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'
import mapMarker from '../images/map-marker.png'
import { useNavigation } from '@react-navigation/core';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';
import { useFocusEffect } from '@react-navigation/native';

interface Orphanage {
  id: number,
  name: string,
  latitude: number,
  longitude: number
}

export default function OrphanagesMap() {
  const navigation = useNavigation();
  function navigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }

  function navigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useFocusEffect(useCallback(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data)
    })
  }, []))

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -30,
          longitude: 30,
          latitudeDelta: 0.888,
          longitudeDelta: 0.888
        }}>
        {orphanages.map(orphanage => (
          <Marker
            key={orphanage.id}
            icon={mapMarker}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude
            }}
            calloutAnchor={{
              x: 2.7,
              y: 0.8
            }}>
            <Callout tooltip onPress={() => navigateToOrphanageDetails(orphanage.id)}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
        <RectButton style={styles.createOrphanageButton} onPress={navigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="white" />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center'
  },
  calloutText: {
    color: '#0089a5',
    fontFamily: 'Nunito_700Bold',
    fontSize: 14
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: 'white',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3
  },
  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3'
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center'
  }
});