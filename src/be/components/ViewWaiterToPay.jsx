export const ViewWaiterToPay = ({ search, waiterToPay, waiterPay, deleteSales }) => {
   const results = waiterToPay.filter(value => value.lastName.toLowerCase().includes(search.toLowerCase())).map((reg, i) =>
      <tr key={i} title={reg.comment}>
         <td>{i + 1}</td>
         <td>{reg.lastName}</td>
         <td>{reg.firstName}</td>
         <td>{reg.newDate}</td>
         <td>{reg.time}</td>
         <td>{reg.description}</td>
         <td>{reg.price}</td>
         <td>{reg.payment}</td>
         <td>200</td>
         <td className={reg.status ? 'pay' : 'payable'}>{reg.status ? 'Pagado' : 'Por Pagar'}</td>
         <td>
            <button onClick={() => waiterPay(reg.idPaymentWaiter, reg.lastName, reg.firstName, reg.idSales, reg.description, reg.date, reg.time, reg.payment, reg.status)} className="btn btn-update">Editar</button>
            <button onClick={() => deleteSales(reg.idPaymentWaiter, reg.lastName)} className="btn btn-delete">Eliminar</button>
         </td>
      </tr>
   )
   return (
      <div className='table tableSales'>
         <table>
            <thead>
               <tr>
                  <th>ROW</th>
                  <th>NOMBRE</th>
                  <th>APELLIDO</th>
                  <th>FECHA</th>
                  <th>HORA</th>
                  <th>EVENTO</th>
                  <th>COBRAR AL CLIENTE</th>
                  <th>PAGAR AL CAMARERO</th>
                  <th>GANANCIA</th>
                  <th>STATUS</th>
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