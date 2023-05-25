import { Link } from "react-router-dom"

import circlesImg from '../../images/circles.png'

const Card = ({ link, leftColor, rightColor, value, title, icon }) => {

   return (
      <Link to={link}>
         <div className="total" style={{ backgroundImage: `url(${circlesImg}), linear-gradient(to right, ${leftColor}, ${rightColor})` }}>
            <div className="titulo">
               <h3>{value}</h3>
               <h3>{title}</h3>
            </div>
            <div className="icono" >
               <img src={icon} alt="" />
            </div>
         </div>
      </Link>
   )
}

export default Card