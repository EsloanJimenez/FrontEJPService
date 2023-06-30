import mantenimiento from '../images/website_construction.jpg'
import logoNegro from '../images/logo_nuevo_negro.png';

import '../css/style.css'
import { Link } from 'react-router-dom';
export const Maintenance = () => {
   return(
      <>
         <figcaption>
            <img src={logoNegro} alt="roto" id='logoNegro'/>
         </figcaption>

         <figcaption>
            <div id='mantenimiento'></div>
            <figure>
               <h1>El sitio web está en construcción</h1>
               <a href="https://linktr.ee/ejpservice" target='_bank'><button>Contactenos</button></a>
            </figure>
         </figcaption>

         <footer>
            <Link to='/be/views/panel' id='backEnd'>Back End</Link>
         </footer>
      </>
   )
}