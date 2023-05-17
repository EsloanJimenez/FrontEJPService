import '../../css/register.css'

export const TotalSales = ({totalS}) => {
   const currencyFormatter = ({currency, value}) => {
      const formatter = new Intl.NumberFormat('en-US', {
         style: 'currency',
         minimumFractionDigits: 2,
         currency
      })

      return formatter.format(value)
   }

   const value = totalS.map(reg => reg.salesTotal);

   const dollar = currencyFormatter({
      currency: "USD",
      value
   })

   return(
      <>
         <div className='table'>
               <table>
                  <thead>
                     <tr>
                        <th>TOTAL VENTAS</th>
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