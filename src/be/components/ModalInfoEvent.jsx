export const ModalInfoEvent = ({description, idCustomers, date, time, amount, price, total, closeClient}) => {
   return (
      <div className="tableShort">
         <table>
            <thead>
               <tr><th colSpan={7}>INFORMACION DEL EVENTO <button className='closeClient right' onClick={closeClient}>X</button></th></tr>
               <tr>
                  <th>DESCRIPCION</th>
                  <th>CLIENTE</th>
                  <th>FECHA</th>
                  <th>HORA</th>
                  <th>CANTIDAD</th>
                  <th>PRECIO</th>
                  <th>TOTAL</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>{description}</td>
                  <td>{idCustomers}</td>
                  <td>{date}</td>
                  <td>{time}</td>
                  <td>{amount}</td>
                  <td>{price}</td>
                  <td>{total}</td>
               </tr>
            </tbody>
         </table>
      </div>
   )
}