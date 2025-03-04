import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import moment from 'moment';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Show = () => {
  const [familiares, setFamiliares] = useState([]);
  const [search, setSearch] = useState('');

  const familiaresCollection = collection(db, "familiares");

  const getFamiliares = async () => {
    try {
      const data = await getDocs(familiaresCollection);
      setFamiliares(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      MySwal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
      });
    }
  };

  const deleteFamiliar = async (id) => {
    const familiarDoc = doc(db, "familiares", id);
    await deleteDoc(familiarDoc);
    getFamiliares();
  };

  const confirDelete = (id) => {
    MySwal.fire({
      title: "Eliminar registro",
      text: "¿Esta usted seguro que desea eliminar el registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar registro"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFamiliar(id);
        Swal.fire({
          title: "Eliminado",
          text: "El registro a sido eliminado",
          icon: "success"
        });
      }
    });
  }

  useEffect(() => {
    getFamiliares();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredFamiliares = familiares.filter((familiares) => {
    return (
      (familiares.nombre && familiares.nombre.toLowerCase().includes(search.toLowerCase())) ||
      (familiares.fecha_nacimiento && familiares.fecha_nacimiento.toString().includes(search)) ||
      (familiares.fecha_fallecimiento && familiares.fecha_fallecimiento.toString().includes(search)) ||
      (familiares.coordenadas && familiares.coordenadas._lat.toString().includes(search) || familiares.coordenadas._long.toString().includes(search))
    );
  }).sort((a, b) => a.nombre.localeCompare(b.nombre));

  const formatCoordinates = (coordinates) => {
    if (!coordinates) return '';
    return `${coordinates._lat}, ${coordinates._long}`;
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-grid gap-2">
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Buscar..."
              />
            </div>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Fecha nacimiento</th>
                  <th>Fecha fallecimiento</th>
                  <th>Coordenadas</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredFamiliares.map((familiares) => {
                  const fechaNacimiento = familiares.fecha_nacimiento ? new Date(familiares.fecha_nacimiento * 1000) : null;
                  const fechaFallecimiento = familiares.fecha_fallecimiento ? new Date(familiares.fecha_fallecimiento * 1000) : null;

                  const yearNacimiento = fechaNacimiento ? Math.max(fechaNacimiento.getFullYear() - 1969, 1) : null;
                  const yearFallecimiento = fechaFallecimiento ? Math.max(fechaFallecimiento.getFullYear() - 1969, 1) : null;

                  const nuevaFechaNacimiento = fechaNacimiento ? new Date(fechaNacimiento) : null;
                  nuevaFechaNacimiento && nuevaFechaNacimiento.setFullYear(yearNacimiento);

                  const nuevaFechaFallecimiento = fechaFallecimiento ? new Date(fechaFallecimiento) : null;
                  nuevaFechaFallecimiento && nuevaFechaFallecimiento.setFullYear(yearFallecimiento);

                  return (
                    <tr key={familiares.id}>
                      <td>{familiares.nombre}</td>
                      <td>
                        {nuevaFechaNacimiento ? nuevaFechaNacimiento.toLocaleString('es-EC', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        }) : ''}
                      </td>
                      <td>
                        {nuevaFechaFallecimiento ? nuevaFechaFallecimiento.toLocaleString('es-EC', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        }) : ''}
                      </td>
                      <td>
                        {formatCoordinates(familiares.coordenadas)}
                      </td>
                      <td>
                        <Link
                          to={`/edit/${familiares.id}`}
                          className="btn btn-light"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                        <button onClick={() => confirDelete(familiares.id)}>
                          <i class="fa-solid fa-eraser"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;