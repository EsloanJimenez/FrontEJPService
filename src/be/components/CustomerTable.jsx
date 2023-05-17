import '../../css/customer.css'
import { newClient } from '../../js/RegistrationForm'

const CustomerTable = ({formCustomer, customers, setListUpdated}) => {
   let {name, company, email, cell_phone} = formCustomer

   const handleDelete = (id) => {
      const requestInit = {
         method: 'DELETE'
      }

      fetch('http://localhost:9000/api/' + id, requestInit)
      .then(res => res.text())
      .then(res => console.log(res))

      setListUpdated(true)
   }

   const handleUpdate = (id) => {
      newClient();
      // if(name == '' || company == '' || email == '' || cell_phone == '') return alert('Todos los campos son requeridos');

      // const requestInit = {
      //    method: 'PUT',
      //    headers: {'Content-Type': 'application/json'},
      //    body: JSON.stringify(formCustomer)
      // }

      // fetch('http://localhost:9000/api/' + id, requestInit)
      // .then(res => res.text())
      // .then(res => console.log(res))

      // setListUpdated(true)
   }

   return(
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
            <tbody>
               {
                  customers.map((cus) => (
                     <tr key={cus.id_customers}>
                        <td>{cus.id_customers}</td>
                        <td>{cus.name}</td>
                        <td>{cus.company}</td>
                        <td>{cus.email}</td>
                        <td>{cus.cell_phone}</td>
                        <td>
                           <button onClick={() => handleUpdate(cus.id_customers)} className="btn btn-info">Editar</button>
                           <button onClick={() => handleDelete(cus.id_customers)} className="btn btn-delete">Eliminar</button>
                        </td>
                     </tr>
                  ))
               }
            </tbody>
         </table>
      </div>
   )
}

export default CustomerTable;