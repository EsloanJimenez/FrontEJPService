export const ViewCustomerTable = ({ search, customers, openModal, deleteCustomer }) => {
   const results = customers.filter(value => value.name.toLowerCase().includes(search.toLowerCase())).map((reg, i) =>
      <tr key={i}>
         <td>{reg.idCustomers}</td>
         <td>{reg.name}</td>
         <td>{reg.company}</td>
         <td>{reg.email}</td>
         <td>{reg.cellPhone}</td>
         <td>
            <button onClick={() => openModal(2, reg.idCustomers, reg.name, reg.company, reg.email, reg.cellPhone)} className="btn btn-info">Editar</button>
            <button onClick={() => deleteCustomer(reg.idCustomers, reg.name)} className="btn btn-delete">Eliminar</button>
         </td>
      </tr>
   )
   return (
      <div className='table'>
         <table>
            <thead>
               <tr>
                  <th>ID</th>
                  <th>NOMBRE</th>
                  <th>COMPAÑIA</th>
                  <th>CORREO</th>
                  <th>TELEFONO</th>
                  <th>ACCIONES</th>
               </tr>
            </thead>
            <tbody id='listaCiudades'>
               {
                  results
               }
            </tbody>
         </table>
      </div>
   )
}