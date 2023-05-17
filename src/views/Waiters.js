import {Header} from "../components/Header";
import {Banner} from "../components/Banner";
import {AsideBanner} from "../components/AsideBanner";
import {Footer} from "../components/Footer"
import {EffectCurva} from "../components/EffectCurva";

const Waiter = () => {
   return(
      <div>
         <div className="fondo BannerWaiter"></div>

         <Header />

         <Banner />

         <AsideBanner />

         <EffectCurva />

         <Footer />
      </div>
   )
}

export default Waiter;