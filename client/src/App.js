import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogs } from './API';
import LogCreationForm from './LogCreationForm';

const App = () => {
  const [addLog, setAddLog] = useState(null)
  const [showPopup, setShowPopup] = useState({})
  const [logs, setLogs] = useState([]);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 27.1751,
    longitude: 78.0421,
    zoom: 5,
  });

  const getLogs = async () => {
    try {      
      const logs = await listLogs();        
      setLogs(logs);
    } catch (err) {      
      console.log(`Error ${err.message}`);
    }
  };

  useEffect(() => {
    getLogs();
  }, []);

  const showAddMarkerPopup = ((event) => {
    const [longitude, latitude] = event.lngLat;
    setAddLog({
      longitude,
      latitude
    });
  });

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <ReactMapGL
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/athultr/ckd4m309o0kn71imdwdi92y8u"
      onDblClick={showAddMarkerPopup}
    >
      {
        logs.map((log) => (
          <React.Fragment key={log._id}>
            <Marker
              latitude={log.latitude}
              longitude={log.longitude}            
            >
              <div
                onClick={()=>setShowPopup({
                  [log._id]: true,
                })}
              >
                <svg
                  className="marker yellow"
                  style={{
                    height: `${6 * viewport.zoom}px`,
                    width: `${6 * viewport.zoom}px`,
                  }}
                  version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                  <g>
                    <g>
                      <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                    </g>
                  </g>
                </svg>
              </div>
            </Marker>
            {
              showPopup[log._id] ? (
                <Popup
                  latitude={log.latitude}
                  longitude={log.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setShowPopup({})}
                  anchor="top"
                  dynamicPosition={true}
                >
                  <div className="popup">
                    <h3>{log.title}</h3>
                    <p>{log.description}</p>
                    <h4>{log.rating}</h4>
                    <small>Date visited: {new Date(log.dateVisited).toLocaleDateString()}</small>
                    {log.image && <img src={log.image} alt={log.title} />}
                  </div>
                </Popup>
              ) : null
            }
          </React.Fragment>
        ))
      }

      {
        addLog ? (
          <>
            <Marker
              latitude={addLog.latitude}
              longitude={addLog.longitude}            
            >
              <div>
                <svg
                  className="marker red"
                  style={{
                    height: `${6 * viewport.zoom}px`,
                    width: `${6 * viewport.zoom}px`,
                  }}
                  version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                  <g>
                    <g>
                      <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                    </g>
                  </g>
                </svg>
              </div>
            </Marker>
            <Popup
              latitude={addLog.latitude}
              longitude={addLog.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setAddLog(null)}
              anchor="top"
              dynamicPosition={true}
            >
              <div className="popup">
                <LogCreationForm 
                  location={addLog}
                  onClose={() => {
                    setAddLog(null);
                    getLogs();                    
                  }}
                />
              </div>
            </Popup>
          </>
        ) : null
      }
    </ReactMapGL>
  );
};

export default App;
