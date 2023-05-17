import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebook, faInstagram, faWhatsapp} from '@fortawesome/free-brands-svg-icons'
import {faEnvelope} from '@fortawesome/free-regular-svg-icons'

import '../css/footer.css'

export const Footer = () => {
   return(
         <footer>
            <div id="column--33">
               <article className="column">
                  <h3>¿Por que adquirir nuestros servicios?</h3>
                  <p>
                     Por el buen servicio que brindamos, Nuestros clientes quedan encantados con la fluidez y la atención, 
                     ya que no sabemos decir que no, Aparte de contar con un equipo profesional, la administración se 
                     encarga de enviar un supervisor de parte nuestra a dar apoyo en cualquier necesidad requerida.
                  </p>
               </article>
         
               <article className="column">
                  <h3>Contactenos</h3>
                  <a href="https://api.whatsapp.com/send?phone=18493308701" target="_blank"><FontAwesomeIcon icon={faWhatsapp} /><span>849 330 8701</span></a><br/>
                  <a href="mailto:ejptheservice@gmail.com" title="ejptheservice@gmail.com"><FontAwesomeIcon icon={faEnvelope} /><span>ejptheservice@gmail.com</span></a>
               </article>
         
               <article className="column">
                  <h3>Siguenos en nuestras redes sociales</h3>
                  <a target="_blank" href="https://web.facebook.com/ejpservice" title="ejpservice"><FontAwesomeIcon icon={faFacebook} /><span>CAMAREROS_EJP</span></a><br/>
                  <a target="_blank" href="https://www.instagram.com/ejpservice/" title="ejpservice"><FontAwesomeIcon icon={faInstagram} /><span>CAMAREROS_EJP</span></a>
               </article>
            </div>

            <p>© 2022 Your Service | Todos los derechos reservados</p>
         </footer>
   )
}