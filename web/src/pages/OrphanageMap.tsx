import React from 'react';

import mapMarkerImg from '../images/Local.svg';
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';

import '../styles/pages/orphanage-map.css';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
})

function OrphanageMap() {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>Porto Alegre</strong>
          <span>Rio Grande do Sul</span>
        </footer>
      </aside>
      <Map center={[-30.0737285, -51.2097223]} zoom={12} style={{
        width: '100%',
        height: '100%'
      }}>
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          icon={mapIcon}
          position={[-30.0737285, -51.2097223]}
        >
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
            nome do orfanato
            <Link to="/orphanages/1">
              <FiArrowRight size={20} color="white" />
            </Link>
          </Popup>
        </Marker>
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="white" />
      </Link>
    </div>
  )
};

export default OrphanageMap;