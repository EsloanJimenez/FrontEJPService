export const ViewBillTable = ({ search, bill, openModal, deleteBill }) => {
   const result = bill.filter(value => value.description.toLowerCase().includes(search)).map((reg, i) =>
      <tr key={i}>
         <td>{reg.idBill}</td>
         <td>{reg.description}</td>
         <td>{reg.newDate}</td>
         <td>{reg.amount}</td>
         <td>{reg.price}</td>
         <td>{reg.subTo}</td>
         <td>
            <button onClick={() => openModal(2, reg.idBill, reg.description, reg.date, reg.amount, reg.price)} className="btn btn-info">Editar</button>
            <button onClick={() => deleteBill(reg.idBill, reg.description)} className="btn btn-delete">Eliminar</button>
         </td>
      </tr>
   )
   return (
      <div className='table'>
         <table>
            <thead>
               <tr>
                  <th>ID</th>
                  <th>DESCRIPCION</th>
                  <th>FECHA</th>
                  <th>CANTIDAD</th>
                  <th>PRECIO</th>
                  <th>SUB TOTAL</th>
                  <th>ACCIONES</th>
               </tr>
            </thead>
            <tbody id='listaCiudades'>
               {
                  result
               }
               <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>TOTAL</td>
               </tr>
            </tbody>
         </table>
      </div>
   )
}