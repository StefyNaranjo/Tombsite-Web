import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, updateDoc, doc, GeoPoint } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import { GoogleMap, LoadScript, Marker, useJsApiLoader, LatLngLiteral } from '@react-google-maps/api';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
registerLocale("es", es);

const Edit = () => {
  const [nombre, setNombre] = useState('');
  const [fechanacimiento, setFechanacimiento] = useState(new Date());
  const [fechafallecimiento, setFechafallecimiento] = useState(new Date());
  const [coordenadas, setCoordenadas] = useState({ lat: 0, lng: 0 });
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null); // Nuevo estado para el marcador

  const handleFechaNacimientoChange = (date) => {
    setFechanacimiento(date);
  };

  const handleFechaFallecimientoChange = (date) => {
    setFechafallecimiento(date);
  };

  const handleLatChange = (e) => {
    setCoordenadas({ ...coordenadas, lat: parseFloat(e.target.value) });
  };

  const handleLngChange = (e) => {
    setCoordenadas({ ...coordenadas, lng: parseFloat(e.target.value) });
  };

  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();
    const geoPoint = new GeoPoint(coordenadas.lat, coordenadas.lng);
    const familiares = doc(db, "familiares", id);
    const data = {
      nombre: nombre,
      fecha_nacimiento: fechanacimiento,
      fecha_fallecimiento: fechafallecimiento,
      coordenadas: geoPoint,
    };
    await updateDoc(familiares, data);
    navigate('/Show');
  };

  const getFamilarById = async (id) => {
    const familiares = await getDoc(doc(db, "familiares", id));
    if (familiares.exists()) {
      setNombre(familiares.data().nombre);
      setFechanacimiento(familiares.data().fecha_nacimiento.toDate());
      setFechafallecimiento(familiares.data().fecha_fallecimiento.toDate());
      const coordenadasGeoPoint = familiares.data().coordenadas;
      setCoordenadas({
        lat: coordenadasGeoPoint.latitude,
        lng: coordenadasGeoPoint.longitude,
      });
    } else {
      console.log("No existe el registro");
    }
  };

  useEffect(() => {
    getFamilarById(id);
  }, [id]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-maps-script',
    googleMapsApiKey: 'AIzaSyDKZwk8l0U0YUqJvReGxQTcbYYgvnG6GXo',
  });

  if (!isLoaded) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>EDICION DEL REGISTRO DE FALLECIDO</h1>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div className="col">
          <form onSubmit={update}>
            <div className="mb-3">
              <label className="form-label">Nombre:</label>
              <input
                value={nombre.toUpperCase()}
                onChange={(e) => setNombre(e.target.value.toUpperCase())}
                type="text"
                className="form-control"
              />
            </div>
            <h2>Fecha de Nacimiento</h2>
            <DatePicker
              selected={fechanacimiento}
              onChange={handleFechaNacimientoChange}
              dateFormat="dd 'de' MMMM 'de' yyyy"
              calendarClassName="rasta-stripes"
              withPortal
              locale="es"
              showYearDropdown={true}
            />
            <h2>Fecha de Fallecimiento</h2>
            <DatePicker
              selected={fechafallecimiento}
              onChange={handleFechaFallecimientoChange}
              dateFormat="dd 'de' MMMM 'de' yyyy"
              calendarClassName="rasta-stripes"
              withPortal
              locale="es"
            />
                       <div>
              <label>Latitud:</label>
              <input
                type="number"
                value={coordenadas.lat}
                onChange={handleLatChange}
              />
              <br />
              <label>Longitud:</label>
              <input
                type="number"
                value={coordenadas.lng}
                onChange={handleLngChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Actualizar
            </button>
          </form>
        </div>
        <div className="col">
          <GoogleMap
            mapContainerStyle={{ height: '400px', width: '400px' }}
            center={{ lat: -1.398965, lng: -78.427474 }}
            zoom={19}
            onLoad={onMapLoad}
            tilt={0}
            heading={0}
          >
            {coordenadas.lat !== 0 && coordenadas.lng !== 0 && (
              <Marker
                position={{ lat: coordenadas.lat, lng: coordenadas.lng }}
                icon={{
                  url: 'https://maps.google.com/mapfiles/ms/micons/purple-dot.png',
                }}
              />
            )}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default Edit;
             