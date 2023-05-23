export const ViewAdmin = ({ search, admins, openModal, deleteAdmin }) => {
   const result = admins.filter(value => value.userName.toLowerCase().includes(search)).map((reg, i) =>
      <tr key={i}>
         <td>{reg.idAdmin}</td>
         <td>{<img src={`http://localhost:9005/${reg.photo}`} alt="imagen rota" />}</td>
         <td>{reg.userName}</td>
         <td>{reg.password}</td>
         <td>{reg.roll}</td>
         <td>
            <button onClick={() => openModal(2, reg.idAdmin, reg.photo, reg.userName, reg.password, reg.roll)} className="btn btn-info">Editar</button>
            <button onClick={() => deleteAdmin(reg.idAdmin, reg.userName)} className="btn btn-delete">Eliminar</button>
         </td>
      </tr>
   )

   return (
      <div className='table'>
         <table>
            <thead>
               <tr>
                  <th>ID</th>
                  <th>FOTO</th>
                  <th>NOMBRE DE USUARIO</th>
                  <th>CONTRASEÑA</th>
                  <th>ROLL</th>
                  <th>ACCIONES</th>
               </tr>
            </thead>
            <tbody id='listaCiudades'>
               {
                  result
               }
            </tbody>
         </table>
      </div>
   )
}