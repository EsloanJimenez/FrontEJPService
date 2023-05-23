export const RegisterAdmin = ({title, closeClient, setPhoto, userName, setUserName, password, setPassword, roll, setRoll, validate, btnSubmit}) => {
   return (
      <div className="container-form hide_font">
         <div className="card fadeUp">
            <form action="http://localhost:9005/api/admin" method="post" enctype="multipart/form-data">
               <div className="card-header">
                  <span className='title'>{title}</span>
                  <button className='closeClient' onClick={closeClient}>X</button>
               </div>
               <div className="card-body">
                  <div className="mb-3">
                     <label htmlFor="photo" className="form-label">Foto</label>
                     <input type="file" className="form-control" id="photo" name="photo" onChange={(e) => setPhoto(e.target.files[0].name)} />
                  </div>
                  <div className="mb-3">
                     <label htmlFor="userName" className="form-label">Nombre De Usuario</label>
                     <input type="text" className="form-control" id="userName" name="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
                  </div>
                  <div className="mb-3">
                     <label htmlFor="password" className="form-label">Contraseña</label>
                     <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className="mb-3">
                     <label htmlFor="verifyPassword" className="form-label">Repetir Contraseña</label>
                     <input type="password" className="form-control" id="verifyPassword" name="verifyPassword" />
                  </div>
                  <div className="mb-3">
                     <label htmlFor="roll" className="form-label">Roll</label>
                     <select className="form-control" id="roll" name="roll" onChange={(e) => setRoll(e.target.value)}>
                        <option value={roll}>{roll}</option>
                        <option value="Admin">Admin</option>
                        <option value="Contable">Contable</option>
                        <option value="Organizador">Organizador</option>
                     </select>
                  </div>
                  <button onClick={() => validate()} className="btn btn-primary" >{btnSubmit}</button>
               </div>
            </form>
         </div>
      </div>
   )
}

RegisterAdmin.defaultProps = {
   roll: "Seleccione El Roll"
}