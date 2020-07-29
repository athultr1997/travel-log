import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogs } from './API';

const App = () => {
  const [logs, setLogs] = useState([]);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 27.1751,
    longitude: 78.0421,
    zoom: 5,
  });  

  useEffect(() => {
    (async () => {
      try {
        // eslint-disable-next-line no-shadow
        const logs = await listLogs();        
        setLogs(logs);        
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(`Error ${err.message}`);
      }
    })();
  }, []);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <ReactMapGL
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/athultr/ckd4m309o0kn71imdwdi92y8u"
    >
      {
        logs.map((log) => (
          <Marker            
            key={log._id}
            latitude={log.latitude}
            longitude={log.longitude}            
          >
            <div>
              <img
                className="marker"
                style={{
                  width: `${6 * viewport.zoom}px`,
                  height: `${6 * viewport.zoom}px`,
                }}
                src="https://i.imgur.com/y0G5YTX.png"
                alt="marker"
              />
            </div>
          </Marker>
        ))
      }
      <Popup
        latitude={27.1751}
        longitude={81}
        closeButton={true}
        closeOnClick={false}
        onClose={() => this.setState({showPopup: false})}
        anchor="top" >
        <div>You are here</div>
      </Popup>
    </ReactMapGL>
  );
};

export default App;
