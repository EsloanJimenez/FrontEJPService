export const ViewSalesTable = ({ sales, search, modalInfo, addEvent, deleteSales }) => {
   const resultado = sales.filter(valor => valor.name.toLowerCase().includes(search.toLowerCase())).map((reg, i) =>
      <tr key={i} title={reg.comment}>
         <td>{i + 1}</td>
         <td>{reg.description}</td>
         <td>{reg.name}</td>
         <td>{reg.newDate}</td>
         <td>{reg.time}</td>
         <td>{reg.amount}</td>
         <td>{reg.price}</td>
         <td>{reg.total}</td>
         <td>
            <button onClick={() => modalInfo(reg.idSales, reg.description, reg.name, reg.newDate, reg.time, reg.amount, reg.price, reg.total, reg.comment)} className='btn btn-info'>Info</button>
            <button onClick={() => addEvent(2, reg.idSales, reg.description, reg.name, reg.customers, reg.date, reg.time, reg.amount, reg.price, reg.comment)} className="btn btn-update">Editar</button>
            <button onClick={() => deleteSales(reg.idSales, reg.description)} className="btn btn-delete">Eliminar</button>
         </td>
      </tr>
   )

   return (
      <div className='table tableSales'>
         <table>
            <thead>
               <tr>
                  <th>ROW</th>
                  <th>DESCRIPCION</th>
                  <th>CLIENTE</th>
                  <th>FECHA</th>
                  <th>HORA</th>
                  <th>CANTIDAD</th>
                  <th>PRECIO</th>
                  <th>TOTAL</th>
                  <th>ACCIONES</th>
               </tr>
            </thead>
            <tbody id='listaCiudades'>
               {
                  resultado
               }
            </tbody>
         </table>
      </div>
   )
}