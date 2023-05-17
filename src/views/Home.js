import {Header} from "../components/Header";
import {Banner} from "../components/Banner";
import {AsideBanner} from "../components/AsideBanner";
import {Experiencia} from "../components/Experiencia"
import {Footer} from "../components/Footer"
import {EffectCurva} from "../components/EffectCurva";

const Home = () => {
   return(
      <div>
         <div className="fondo BannerHome"></div>

         <Header />

         <Banner />

         <AsideBanner />

         <EffectCurva />

         <Experiencia />

         <Footer />

         <div id="opaco"></div>
      </div>
   )

   
}

export default Home