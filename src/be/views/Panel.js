import { useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";

import { HeaderController } from "../components/HeaderController"
import Card from "../components/Card";

import '../../css/Card.css'

import circlesImg from '../../images/circles.png'

export const Panel = () => {
   const url = 'http://localhost:9005/api/';

   const [customers, setCustomers] = useState([]);

   useEffect(() => {
      const panel = document.getElementById("Panel");
      panel.style.setProperty("transform", "translateY(0px)")

      getEventHeld();
   })

   const getEventHeld = async () => {
      const res = await axios(`${url}panelCustomers`);
      setCustomers(res.data);
   }
   
   const [date, setDate] = useState([{
      "id": 2,
      "link": "/be/views/inventory",
      "leftColor": "#A74CF2",
      "rightColor": "#c87121",
      "description": "5",
      "title": "Total Inventario",
      "icon": "https://cdn-icons-png.flaticon.com/512/1291/1291749.png"
   }, {
      "id": 3,
      "link": "/be/views/customers",
      "leftColor": "#A74CF2",
      "rightColor": "#255c77",
      "description": "10",
      "title": "Total Cliente",
      "icon": "https://cdn-icons-png.flaticon.com/512/9752/9752345.png"
   }, {
      "id": 4,
      "link": "/be/views/team_member",
      "leftColor": "#A74CF2",
      "rightColor": "#47ceff",
      "description": "125",
      "title": "Miembros De Equipo",
      "icon": "https://cdn-icons-png.flaticon.com/512/609/609104.png"
   }, {
      "id": 5,
      "link": "/be/views/team_member",
      "leftColor": "#A74CF2",
      "rightColor": "#279c50",
      "description": "25",
      "title": "ME Activos",
      "icon": "https://cdn-icons-png.flaticon.com/512/706/706170.png"
   }, {
      "id": 6,
      "link": "/be/views/team_member",
      "leftColor": "#A74CF2",
      "rightColor": "#e41616",
      "description": "25",
      "title": "ME Inactivos",
      "icon": "https://cdn-icons-png.flaticon.com/512/692/692453.png"
   }])

   return (
      <div className="container">
         <HeaderController />

         <div className="totales">
            <Link to={'/be/views/sales'}>
               <div className="total" style={{ backgroundImage: `url(${circlesImg}), linear-gradient(to right, #A74CF2, #617BFB)` }}>
                  <div className="titulo">
                     <h3>{/*customers[0].total*/}13</h3>
                     <h3>Total Clientes</h3>
                  </div>
                  <div className="icono" >
                     <img src="https://cdn-icons-png.flaticon.com/512/5567/5567444.png" alt="" />
                  </div>
               </div>
            </Link>

            <Link to={'/be/views/inventory'}>
               <div className="total" style={{ backgroundImage: `url(${circlesImg}), linear-gradient(to right, #A74CF2, #c87121)` }}>
                  <div className="titulo">
                     <h3>7</h3>
                     <h3>Total Inventario</h3>
                  </div>
                  <div className="icono" >
                     <img src="https://cdn-icons-png.flaticon.com/512/609/609104" alt="" />
                  </div>
               </div>
            </Link>
         </div>
      </div>
   )
}