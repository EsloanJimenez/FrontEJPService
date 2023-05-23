export const ModalTeamAssistance = ({paymentWaiter, closeClient, total, paymentWaiterTotal, eventProfit, waiterPay, deleteWaiter}) => {
   return (
      <div className='tableSmall'>
         <table>
            <thead>
               <tr>
                  <th colSpan={7}>
                     MIEMBROS DE EQUIPO QUE ASISTIERON
                     <button className='closeClient right' onClick={closeClient}>X</button>
                  </th>
               </tr>
               <tr>
                  <th>ID</th>
                  <th>NOMBRE</th>
                  <th>APELLIDO</th>
                  <th>PAGO</th>
                  <th>STATUS</th>
                  <th>ACCIONES</th>
               </tr>
            </thead>
            <tbody>
               {
                  paymentWaiter.map((reg, i) =>
                     <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{reg.lastName}</td>
                        <td>{reg.firstName}</td>
                        <td>{reg.payment}</td>
                        <td className={reg.status ? 'pay' : 'payable'}>{reg.status ? 'Pagado' : 'Por Pagar'}</td>
                        <td>
                           <button onClick={() => waiterPay(reg.idPaymentWaiter, reg.lastName, reg.firstName, reg.idSales, reg.description, reg.date, reg.time, reg.payment, reg.status)} className="btn btn-update">Editar</button>
                           <button onClick={() => deleteWaiter(reg.idPaymentWaiter, reg.lastName, reg.firstName)} className="btn btn-delete">Eliminar</button>
                        </td>
                     </tr>
                  )
               }
               <tr>
                  <td></td>
                  <td></td>
                  <td><strong><i>PAGO DEL CLIENTE</i></strong></td>
                  <td><strong><i>{total}</i></strong></td>
               </tr>
               <tr>
                  <td></td>
                  <td></td>
                  <td><strong><i>PAGO DEL CAMARERO</i></strong></td>
                  <td><strong><i>{paymentWaiterTotal}</i></strong></td>
               </tr>
               <tr>
                  <td></td>
                  <td></td>
                  <td><strong><i>GANANCIA DEL EVENTO</i></strong></td>
                  <td><strong><i>{eventProfit}</i></strong></td>
               </tr>
            </tbody>
         </table>
      </div>
   )
}