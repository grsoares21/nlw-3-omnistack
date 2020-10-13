import React from 'react';

import mapMarkerImg from '../images/Local.svg';
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi';

import { Map, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import '../styles/pages/orphanage-map.css';

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
      </Map>

      <Link to="" className="create-orphanage">
        <FiPlus size={32} color="white" />
      </Link>
    </div>
  )
};

export default OrphanageMap;