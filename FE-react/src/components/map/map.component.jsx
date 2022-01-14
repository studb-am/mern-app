import React, {useState, useEffect, useRef} from 'react';
import maplibregl from 'maplibre-gl';

import './map.css';

const Map = props => {
  const {location} = props;

  const mapContainer = useRef (null);
  const map = useRef (null);
  const [lat] = useState (location.lat);
  const [lng] = useState (location.lng);
  const [zoom] = useState (15);

  useEffect (
    () => {
      if (map.current) return; //stop map of inizializing more than once
      map.current = new maplibregl.Map ({
        container: mapContainer.current,
        style: 'http://locomovolt.com:8080/styles/basic-preview/style.json',
        center: [lng, lat],
        zoom: zoom,
      });
      map.current.addControl (new maplibregl.NavigationControl (), 'top-right');
      new maplibregl.Marker ({color: '#FF0000'})
        .setLngLat ([location.lng, location.lat])
        .addTo (map.current);
    },
    [lng, lat, zoom, map, mapContainer]
  );

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default Map;
