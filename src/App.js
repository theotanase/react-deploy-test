import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import GoogleMapReact from 'google-map-react';

/*
  Vrem sa cream o aplicatie care pe pagina principala afiseaza o lista de orase din SUA (New York, Atlanta, Miami, etc)

  Cand dam click pe numele unui oras, suntem redirectionati spre alta pagina care 
  afiseaza berarii din orasul respectiv folsind API-ul https://www.openbrewerydb.org/

  Ajuns in pagina orasului, cand userul da click pe numele unei berarii, este redirectionat
  catre o pagina a berariei, in care sunt afisate coordonatele si adresa berariei

  Bonus, In pagina berariei afisam un Google Map cu locatia berariei.

  Pasul 1. Cream o componenta pentru homepage
  1.1 Ruta pentru homepage  - /
  1.2 Componenta pentru homepage
  1.3 Afisam o lista de orase - Orasele se hardcodeaza

  Pasul 2. Pentru fiecare oras - afisam un link catre pagina orasului -> Eg. /city/new_york
                                                                    E.g. /city/atlanta
                                                                    E.g /city/miami

      2.2. Cream componenta si ruta pentru pagina orasului
      2.3. In componenta paginii orasului, pentru a obtine berariile din orasul respectiv
          Trebuie sa luam parametrul "numele orasului" din adresa -> useParams
      2.4 Cu numele orasului, apelez API-ul care ne da berarii dupa oras ->
          https://api.openbrewerydb.org/breweries?by_city=san_diego
      2.5 Afisam lista de berarii obtinuta                                                       
*/

export default function App() {

  return (
    <Router>
      <div>
        <nav>

        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>


          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>

    </Router>
  );
}

const towns = [
  "Hello",
  "World"
];



function Home() {

  const [brewery, setBrewery] = useState();

  useEffect(() => {
    fetch('https://api.openbrewerydb.org/breweries/5494')
      .then(response => response.json())
      .then(data => {
        setBrewery(data);
      })
  }, [])

  let center = undefined;

  if (brewery != undefined) {
    center = { // brewery coordinates
      lat: parseFloat(brewery.latitude),
      lng: parseFloat(brewery.longitude)
    };
  }

  const zoom = 15;


  return <div>
    {towns.map(town => <div>{town}</div>)}

    <div style={{ height: '80vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBerdP5pTfdP2yvroZX3j9sNQSFfsm-vxE' }}
        defaultCenter={{ lat: 0, lng: 0 }}
        defaultZoom={zoom}
        center={center}
      >
      </GoogleMapReact>
    </div>

  </div>;
}
