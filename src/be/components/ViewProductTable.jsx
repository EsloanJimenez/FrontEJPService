export const ViewProductTable = ({ search, inventory, valuePrice, valueSubTotal, openModal, deleteInventory }) => {
   const result = inventory.filter(value => value.product.toLowerCase().includes(search)).map((reg, i) =>
      <tr key={i}>
         <td>{reg.idInventory}</td>
         <td>{reg.product}</td>
         <td>{reg.newDate}</td>
         <td>{reg.time}</td>
         <td>{reg.amount}</td>
         <td>{valuePrice[i]}</td>
         <td>{valueSubTotal[i]}</td>
         <td>
            <button onClick={() => openModal(2, reg.idInventory, reg.product, reg.date, reg.time, reg.amount, reg.price)} className="btn btn-info">Editar</button>
            <button onClick={() => deleteInventory(reg.idInventory, reg.product)} className="btn btn-delete">Eliminar</button>
         </td>
      </tr>
   )

   return (
      <div className='table'>
         <table>
            <thead>
               <tr><th colspan="8">PRODUCTOS</th></tr>
               <tr>
                  <th>ID</th>
                  <th>PRODUCTO</th>
                  <th>FECHA</th>
                  <th>HORA</th>
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
            </tbody>
         </table>
      </div>
   )
}