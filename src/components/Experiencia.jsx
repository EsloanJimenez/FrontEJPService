import '../css/experiencia.css'

export const Experiencia = () => {
   return (
      <section id="experiencia">
         <article id="autoBiografia" className="hide">
         <p className="fadeLeft">
            Inauguramos nuestra empresa, al inicio de una crisis mundial, la cual
            nos afecto a todos, tanto en nuestros proyectos como en nuestra vida
            personal, pero esto no fue un obstáculo, duramos 2 año y 6 meses sin
            laborar, luego de abrir nuevamente nuestras puertas, con una nueva
            cara al público tenemos una aceptación la cual nos ha llevado hacer
            una de la empresa preferida por los clientes.
         </p>
         </article>

         <article id="elojios_principales">
         <div className="elojios hide">
            <h1 className="fadeUp">0</h1>
            <p className="fadeDown">Años de experiencia</p>
         </div>

         <div className="elojios hide">
            <h1 className="fadeUp">121</h1>
            <p className="fadeDown">Personal</p>
         </div>

         <div className="elojios hide">
            <h1 className="fadeUp">60</h1>
            <p className="fadeDown">Eventos realizados</p>
         </div>
         </article>

         <article className="hide">
         <h1 className="fadeLeft" style={{ fontSize: "2vw", width: "500px", color: "#257d98" }}>
            TRABAJAMOS EN TODO TIPO DE UBICACIONES
         </h1>
         </article>
      </section>
   );
};