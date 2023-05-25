import { useEffect, useState } from "react"
import axios from "axios";

import { HeaderController } from "../components/HeaderController"
import Card from "../components/Card";

import '../../css/Card.css'
import { Activos } from "../components/Activos";

export const Panel = () => {
   const url = 'http://localhost:9005/api/';

   const [sales, setSales] = useState([]);
   const [customers, setCustomers] = useState([]);
   const [inventory, setInventary] = useState([]);
   const [teamMemberAsset, setTeamMemberAsset] = useState([]);
   const [teamMemberInactive, setTeamMemberInactive] = useState([]);

   useEffect(() => {
      const panel = document.getElementById("Panel");
      panel.style.setProperty("transform", "translateY(0px)")

      getEventHeld();
   }, [])

   const getEventHeld = async () => {
      const sa = await axios(`${url}panelSales`);
      setSales(sa.data[0].totalSales);

      const res = await axios(`${url}panelCustomers`);
      setCustomers(res.data[0].totalCustomer);

      const inv = await axios(`${url}panelInventory`);
      setInventary(inv.data[0].totalAmount);

      const tma = await axios(`${url}panelTeamMemberAsset`);
      setTeamMemberAsset(tma.data[0].totalTeamMember);

      const tmi = await axios(`${url}panelTeamMemberInactive`);
      setTeamMemberInactive(tmi.data[0].totalTeamMember);
   }

   return (
      <div className="container">
         <HeaderController />

         <div className="totales">
         <Card
               link='be/views/sales'
               leftColor='#A74CF2'
               rightColor='#47ceff'
               value={sales}
               title='Total Sales'
               icon='https://cdn-icons-png.flaticon.com/512/5567/5567444.png'
            />

            <Card
               link='be/views/customers'
               leftColor='#A74CF2'
               rightColor='#617BFB'
               value={customers}
               title='Total Clientes'
               icon='https://cdn-icons-png.flaticon.com/512/9752/9752345.png'
            />

            <Card
               link='be/views/inventory'
               leftColor='#A74CF2'
               rightColor='#c87121'
               value={inventory}
               title='Total Inventario'
               icon='https://cdn-icons-png.flaticon.com/512/1291/1291749.png'
            />

            <Card
               link='be/views/registerTeamMember'
               leftColor='#A74CF2'
               rightColor='#279c50'
               value={teamMemberAsset}
               title='ME Activo'
               icon='https://cdn-icons-png.flaticon.com/512/609/609104.png'
            />

            <Card
               link='be/views/registerTeamMember'
               leftColor='#A74CF2'
               rightColor='#e41616'
               value={teamMemberInactive}
               title='ME Inactivo'
               icon='https://cdn-icons-png.flaticon.com/512/692/692453.png'
            />
         </div>
      </div>
   )
}