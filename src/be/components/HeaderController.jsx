import { Link } from 'react-router-dom';
import imgLogo from '../../images/logo_nuevo_blanco.png';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAddressCard, faBug, faCartFlatbed, faCartShopping, faHandshake, faHouseChimney, faMoneyBillTrendUp, faRightFromBracket, faUser, faUserPlus, faWarehouse } from '@fortawesome/free-solid-svg-icons';

import '../../css/headerController.css'

export const HeaderController = () => {
   return(
      <div className="lateral_menu">
         <div id='img_logo'>
            <img src={imgLogo} alt="Logo" />
         </div>

         <div className="separator"></div>

         <ul className='main'>
            <li><Link to="/"><span className="icon"><FontAwesomeIcon icon={faHouseChimney} /></span><span>Inicio</span></Link><div className='efecto'></div></li>
            <li><Link to="/be/views/panel" title="Panel"><span className="icon"><FontAwesomeIcon icon={faWarehouse} /></span><span>Panel</span></Link><div id="Panel" className='efecto'></div></li>
            <li><Link to="/be/views/customers" title="Clientes"><span className="icon"><FontAwesomeIcon icon={faUser} /></span><span>Clientes</span></Link><div id='Customers' className='efecto'></div></li>
            <li><Link to="/be/views/inventory" title="Inventario"><span className="icon"><FontAwesomeIcon icon={faCartFlatbed} /></span><span>Inventario</span></Link><div id='Inventory' className='efecto'></div></li>
            <li><Link to="/be/views/report" title="Reportes"><span className="icon"><FontAwesomeIcon icon={faBug} /></span><span>Reportes</span></Link><div id='Reportes' className='efecto'></div></li>
            <li><Link to="/be/views/bill" title="Gastos"><span className="icon"><FontAwesomeIcon icon={faMoneyBillTrendUp} /></span><span>Gastos</span></Link><div id='Bill' className='efecto'></div></li>
            <li><Link to="/be/views/sales" title="Ventas"><span className="icon"><FontAwesomeIcon icon={faHandshake} /></span><span>Ventas</span></Link><div id='Sales' className='efecto'></div></li>
            <li><Link to="/be/views/registerTeamMember" title="RegistrarMDE"><span className="icon"><FontAwesomeIcon icon={faUserPlus} /></span><span>Registrar Miembro De Equipo</span></Link><div id='TeamMember' className='efecto'></div></li>
            <li><Link to="/be/views/purchased_events" title="EventosComprados"><span className="icon"><FontAwesomeIcon icon={faCartShopping} /></span><span>Eventos Comprados</span></Link><div id='EventosComprados' className='efecto'></div></li>
            <li><Link to="/be/views/admin" title="RegistrarAdmin"><span className='icon'><FontAwesomeIcon icon={faAddressCard} /></span><span>Registrar Administrador</span></Link><div id='RegistrarAdmin' className='efecto'></div></li>
            <li><Link to="/be/views/sign_off" title="Cerrar Seccion"><span className="icon"><FontAwesomeIcon icon={faRightFromBracket} /></span><span>Cerrar Seccion</span></Link><div className='efecto'></div></li>
         </ul>
      </div>
   )
}