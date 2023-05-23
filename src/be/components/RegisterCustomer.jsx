export const RegisterCustomer = ({title, closeClient, name, setName, company, setCompany, email, setEmail, cellPhone, setCellPhone, validate, btnSubmit}) => {
   return (
      <div className="container-form hide_font">
         <div className="card">
            <div className="card-header">
               <span className='title'>{title}</span>
               <button className='closeClient' onClick={closeClient}>X</button>
            </div>
            <div className="card-body">
               <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nombre</label>
                  <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
               </div>
               <div className="mb-3">
                  <label htmlFor="company" className="form-label">Compañia</label>
                  <input type="text" className="form-control" id="company" name="company" value={company} onChange={(e) => setCompany(e.target.value)} />
               </div>
               <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo</label>
                  <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
               </div>
               <div className="mb-3">
                  <label htmlFor="cellPhone" className="form-label">Telefono</label>
                  <input type="tel" className="form-control" id="cellPhone" name="cellPhone" value={cellPhone} onChange={(e) => setCellPhone(e.target.value)} />
               </div>
               <button onClick={() => validate()} className="btn btn-primary" >{btnSubmit}</button>
            </div>
         </div>
      </div>
   )
}