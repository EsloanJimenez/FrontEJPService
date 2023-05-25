import { Link } from 'react-router-dom'

import '../css/main.css'
import '../css/style.css'
import '../css/header.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLocationDot, faAngleDown} from '@fortawesome/free-solid-svg-icons'
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons'

export const Header = () => {
   return(
      <div id="home">
          {/* ----- HEADER ----- */}
         <header className="main-long">
            <nav id="info">
               <div className="imgLong"></div>
      
               <div className="InfoLong">
                  <span>
                     <a href="https://api.whatsapp.com/send?phone=18493308701" target="_blank"><FontAwesomeIcon icon={faWhatsapp} /><span id="tel">849-330-8701</span></a>
                  </span>
                  <span>
                     <a href="https://goo.gl/maps/AAwQrxLFiXpaBa2t6" target="_blank"><FontAwesomeIcon icon={faLocationDot} /><span id="dire">Av. 27 de Febrero #23, Edf. Master Suite 4-7, D.N.</span></a>
                  </span>
               </div>
            </nav>
         
            <nav className="main">
               <ul>
                  <li><Link to="/">Inicio</Link></li>
                  <li>{/*<FontAwesomeIcon icon={faAngleDown} />*/}<a href="#">Servicios</a>
                     <ul className='sub-menu'>
                        <li><Link to="/views/waiter">Camareros</Link></li>
                        <li><Link to="/views/mixologist">Mixologos</Link></li>
                        <li><Link to="/views/buffet">Buffet</Link></li>
                        <li><Link to="/views/decorations">Decoraciones</Link></li>
                     </ul>
                  </li>
                  <li><Link to="/views/we">Nosotros</Link></li>
                  <li><Link to="/views/contact">Contacto</Link></li>
                </ul>
            </nav>
         </header>
      </div>
   )
}