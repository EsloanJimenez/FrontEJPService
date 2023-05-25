import {Header} from "../components/Header";
import {Banner} from "../components/Banner";
import {AsideBanner} from "../components/AsideBanner";
import {Experiencia} from "../components/Experiencia"
import {Footer} from "../components/Footer"
import {EffectCurva} from "../components/EffectCurva";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
   const url = 'http://localhost:9005/api/';

   const [sales, setSales] = useState([]);
   const [teamMemberAsset, setTeamMemberAsset] = useState([]);

   useEffect(() => {
      getConsultation();
   }, []);

   const getConsultation = async () => {
      const sa = await axios(`${url}panelSales`);
      setSales(sa.data[0].totalSales);

      const tma = await axios(`${url}panelTeamMemberAsset`);
      setTeamMemberAsset(tma.data[0].totalTeamMember);
   }

   return(
      <div>
         <div className="fondo BannerHome"></div>

         <Header />

         <Banner />

         <AsideBanner />

         <EffectCurva />

         <Experiencia
            sales={sales}
            teamMemberAsset={teamMemberAsset}
         />

         <Footer />

         <div id="opaco"></div>
      </div>
   )

   
}

export default Home