import '../../css/register.css'

export const TotalSales2024 = ({totalS2024}) => {
   const currencyFormatter = ({currency, value}) => {
      const formatter = new Intl.NumberFormat('en-US', {
         style: 'currency',
         minimumFractionDigits: 2,
         currency
      })

      return formatter.format(value)
   }

   const value = totalS2024.map(reg => reg.salesTotal2024);

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
                        <th>TOTAL VENTAS 2024</th>
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