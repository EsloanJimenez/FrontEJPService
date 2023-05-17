import React, {useEffect} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from "./views/Home";
import Waiter from "./views/Waiters";
import NotFound from "./views/NotFound";

// IMPORTACIONES BACK END
import { Panel } from "./be/views/Panel";
import { Customers } from './be/views/Customers'
import { Inventory } from "./be/views/Inventory";
import { Bill } from "./be/views/Bill";
import { RegisterTeamMember } from './be/views/RegisterTeamMember'
import { Sales } from "./be/views/Sales";
import {Admin} from "./be/views/Admin"

// IMPORTACIONES DE JavaScript Puro
import Animation from "./js/Animation";
import { Main } from "./js/Main";

// OJAS DE STYLO
import './css/animaciones.css'
import './css/fondoBanner.css'

const App = () => {
   useEffect(() => {
      Animation();
      Main();
   })

   return (
      <BrowserRouter>
            <Routes>
               <Route exact path="/" element={<Home />}/>
               <Route exact path="/views/waiter" element={<Waiter />} />

               {/* ENLACES BACK END */}
               <Route exact path="/be/views/panel" element={<Panel />} />
               <Route exact path="/be/views/customers" element={<Customers />} />
               <Route path="/be/views/inventory" element={<Inventory/>} />
               <Route path="/be/views/bill" element={<Bill />} />
               <Route exact path="/be/views/sales" element={<Sales />} />
               <Route exact path="/be/views/registerTeamMember" element={<RegisterTeamMember />} />
               <Route path="/be/views/admin" element={<Admin />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
      </BrowserRouter>
   )
}

export default App