import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faEnvelope} from '@fortawesome/free-regular-svg-icons'

import '../css/aside.css'

export const AsideBanner = () => {
   return(
      <div>
         <aside className='hide'>
            <a className='fadeRight' target="_blank" href="https://web.facebook.com/ejpservice" title="ejpservice"><FontAwesomeIcon icon={faFacebook} /></a>
            <a className='fadeRight' target="_blank" href="https://www.instagram.com/ejpservice/" title="ejpservice"><FontAwesomeIcon icon={faInstagram} /></a>
            <a className='fadeRight' href="mailto:ejptheservice@gmail.com" title="ejptheservice@gmail.com"><FontAwesomeIcon icon={faEnvelope} /></a>
         </aside>
      </div>
   )
}