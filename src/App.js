import React, {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const tablaOscars = [
  { anio: '2018', pelicula: 'La forma del agua', director: 'Guillermo del Toro'},
  { anio: '2017', pelicula: 'Moonlight', director: 'Barry Jenkins'},
  { anio: '2016', pelicula: 'Spotlight', director: 'Tom McCarthy'},
  { anio: '2015', pelicula: 'Birdman', director: 'Alejandro González Iñárritu'},
  { anio: '2014', pelicula: '12 anios de esclavitud', director: 'Steve McQueen'},
  { anio: '2013', pelicula: 'Argo', director: 'Ben Affleck'},
  { anio: '2012', pelicula: 'El artista', director: 'Michel Hazanavicius'},
  { anio: '2011', pelicula: 'El discurso del rey', director: 'Michel Hazanavicius'},
  { anio: '2010', pelicula: 'Vivir al límite', director: 'Kathryn Bigelow'},
  { anio: '2009', pelicula: 'Slumdog Millionaire', director: 'Danny Boyle'},
  { anio: '2008', pelicula: 'Sin lugar para los débiles', director: 'Ethan Coen'},
  { anio: '2007', pelicula: 'Los infiltrados', director: 'Martin Scorsese'},
  { anio: '2006', pelicula: 'Crash', director: 'Paul Haggis'},
  { anio: '2005', pelicula: 'Million Dollar Baby', director: 'Clint Eastwood'},
  { anio: '2004', pelicula: 'El Señor de los Anillos: el retorno del Rey', director: 'Peter Jackson'},
  { anio: '2003', pelicula: 'Chicago', director: 'Rob Marshall'},
  { anio: '2002', pelicula: 'Una mente brillante', director: 'Ron Howard'},
  { anio: '2001', pelicula: 'Gladiador', director: 'Ridley Scott'},
  { anio: '2000', pelicula: 'Belleza americana', director: 'Sam Mendes'},
  { anio: '1999 ', pelicula: 'Shakespeare enamorado', director: 'John Madden'},
];

const paginacionOpciones = {
  rowsPerPageText : 'Filas por páginas',
  rangeSeparatorText :  'de',
  selectAllRowsItem : true,
  selectAllRowsItemText : 'Todos',
}

function App() {
  const [busqueda, guardarBusqueda] = useState('');
  const [oscars, guardarOscar] = useState();
  const [columnas, guardarColumnas] = useState([]);
  
  useEffect(() =>{
    crearIndex();
    asignarColumnas();
    guardarOscar(tablaOscars);
  },[] );

  const crearIndex = () =>{
    
    let contador = 1;

    tablaOscars.map(elemento =>{
      elemento['id'] = contador;
      contador++;
    });
  }

  const asignarColumnas = () =>{
    const columnasTabla = [
      {
        name: 'ID',
        selector: 'id',
        sortable: true
      },
      {
        name: 'Año',
        selector: 'anio',
        sortable: true
      },
      {
        name: 'Pelicula',
        selector: 'pelicula',
        sortable: true,
        grow: 3
      },
      {
        name: 'Director',
        selector: 'director',
        sortable: true,
        right: true
      },
    ];

    guardarColumnas( columnasTabla);
  }

  const buscarTabla =  (e) => {
   
    guardarBusqueda( e.target.value);

    filtrarElementos();
  }

  const filtrarElementos = () => {

    let search =  tablaOscars.filter(item=>{
      if(item.anio.toString().includes(document.getElementById('busqueda').value) ||
        item.pelicula.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(document.getElementById('busqueda').value)||
        item.director.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(document.getElementById('busqueda').value)
      ){
        return item;
      }
    });

    guardarOscar(search);
  }

  return (
    <div className="table-responsive">
      <div className="barraBusqueda">
        
          <input 
          type="text"
          placeholder="buscar"
          className="textField"
          id="busqueda"
          name="busqueda" 
          value={busqueda}
          onChange={buscarTabla}
          />
          <button type="button" className="btnBuscar">
            <FontAwesomeIcon icon={faSearch} />
          </button>
       
      </div>
      <DataTable 
        columns={columnas}
        data={oscars}
        title="Premios Oscar 1999-2019"
        pagination
        paginationComponentOptions={paginacionOpciones}
        fixedHeader
        fixedHeaderScrollHeight="600px"
        noDataComponent={<span>No se encontraron resultados</span>}
      />
    </div>
  );
}

export default App;
