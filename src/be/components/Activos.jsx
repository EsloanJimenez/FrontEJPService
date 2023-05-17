import '../../css/register.css'

export const Activos = ({totalS, totalPW, totalB}) => {
   const currencyFormatter = ({currency, assets}) => {
      const formatter = new Intl.NumberFormat('en-US', {
         style: 'currency',
         minimumFractionDigits: 2,
         currency
      })

      return formatter.format(assets)
   }

   const totalSales = totalS.map(reg => reg.salesTotal);
   const totalPayWaiter = totalPW.map(reg => reg.payWaiterTotal);
   const totalBill = totalB.map(reg => reg.billTotal);

   const assets = totalSales - totalPayWaiter - totalBill;

   console.log(assets);

   const dollar = currencyFormatter({
      currency: "USD",
      assets
   })

   return(
      <>
         <div className='table'>
               <table>
                  <thead>
                     <tr>
                        <th>ACTIVOS</th>
                     </tr>
                  </thead>
                  <tbody id='listaCiudades'>
                     <tr>
                        <td>{dollar}</td>
                     </tr>
                  </tbody>
               </table>
            </div>
      </>
   )
}