export const RegisterTeamMemberForm = ({title, closeClient, setPhoto, lastName, setLastName, firstName, setFirstName, idCard, setIdCard, cellPhone, setCellPhone, sex, setSex, cluster, setCluster, bankName, setBankName, bankAccountType, setBankAccountType, accountNumber, setAccountNumber, status, setStatus, validate, btnSubmit}) => {
   return (
      <div className="container-form hide_font">
         <div className="card">
            <div className="card-header">
               <span className='title'>{title}</span>
               <button className='closeClient' onClick={closeClient}>X</button>
            </div>
            <div className="card-body">
               <form action="https://apiejpservice.onrender.com/api/teamMember" method="post" enctype="multipart/form-data">
                  <div className="mb-3">
                     <label for="photo" className="form-label">Foto</label>
                     <input type="file" className="form-control" id="photo" name="photo" onChange={(e) => setPhoto(e.target.files[0].name)} />
                  </div>
                  <div className="mb-3">
                     <label for="lastName" className="form-label">Nombre</label>
                     <input type="text" className="form-control" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                  <div className="mb-3">
                     <label for="firstName" className="form-label">Apellido</label>
                     <input type="text" className="form-control" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div className="mb-3">
                     <label for="idCard" className="form-label">Cedula</label>
                     <input type="text" className="form-control" id="idCard" name="idCard" value={idCard} onChange={(e) => setIdCard(e.target.value)} />
                  </div>
                  <div className="mb-3">
                     <label for="cellPhone" className="form-label">Celular</label>
                     <input type="number" className="form-control" id="cellPhone" name="cellPhone" value={cellPhone} onChange={(e) => setCellPhone(e.target.value)} />
                  </div>
                  <div className="mb-3">
                     <label for="sex" className="form-label">Sexo</label>
                     <select className="form-control" id='sex' name='sex' onChange={(e) => setSex(e.target.value)}>
                        <option value={sex}>{sex}</option>
                        <option value='Masculino'>Masculino</option>
                        <option value='Femenino'>Femenina</option>
                     </select>
                  </div>
                  <div className="mb-3">
                     <label for="cluster" className="form-label">Grupo</label>
                     <select className="form-control" id='cluster' name='cluster' onChange={(e) => setCluster(e.target.value)}>
                        <option value={cluster}>{cluster}</option>
                        <option value="Grupo A" >Grupo A</option>
                        <option value="Grupo B">Grupo B</option>
                        <option value="Grupo C">Grupo C</option>
                        <option value="Grupo D">Grupo D</option>
                        <option value="Arroye">Arroye</option>
                        <option value="Cafeteria">Cafeteria</option>
                     </select>
                  </div>
                  <div className="mb-3">
                     <label for="bankName" className="form-label">Nombre Banco</label>
                     <select className="form-control" id='bankName' name='bankName' onChange={(e) => setBankName(e.target.value)}>
                        <option value={bankName}>{bankName}</option>
                        <option value="No Tiene">No Tiene</option>
                        <option value="BHD Leon">BHD Leon</option>
                        <option value="Billet">Billet</option>
                        <option value="Banreservas">Banreservas</option>
                        <option value="Popular">Popular</option>
                        <option value="Asociacion Popular">Asociacion Popular</option>
                        <option value="Promerica">Promerica</option>
                     </select>
                  </div>
                  <div className="mb-3">
                     <label for="bankAccountType" className="form-label">Tipo De Cuenta</label>
                     <select className="form-control" id='bankAccountType' name='bankAccountType' onChange={(e) => setBankAccountType(e.target.value)}>
                        <option value={bankAccountType}>{bankAccountType}</option>
                        <option value="No Tiene">No Tiene</option>
                        <option value="Ahorro">Ahorro</option>
                        <option value="Corriente">Corriente</option>
                     </select>
                  </div>
                  <div className="mb-3">
                     <label for="accountNumber" className="form-label">Numero De Cuenta</label>
                     <input type="number" className="form-control" id="accountNumber" name="accountNumber" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                  </div>
                  <div className="mb-3">
                     <label for="status" className="form-label">Stado</label>
                     <select className="form-control" id='status' name='status' onChange={(e) => setStatus(e.target.value)}>
                        <option value={status}>{status}</option>
                        <option value='Activo'>Activ@</option>
                        <option value='Inactivo'>Inactiv@</option>
                     </select>
                  </div>
                  <button onClick={() => validate()} className="btn btn-primary">{btnSubmit}</button>
               </form>
            </div>
         </div>
      </div>
   )
}

RegisterTeamMemberForm.defaultProps={
   sex: "Seleccionar Sexo",
   cluster: "Seleccione El Grupo",
   bankName: "Seleccione El Nombre Del Banco",
   bankAccountType: "Seleccione El Tipo De Cuenta",
   status: "Seleccione El Stado"
}