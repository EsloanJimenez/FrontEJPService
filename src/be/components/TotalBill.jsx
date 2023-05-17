import '../../css/register.css'

export const TotalBill = ({totalB}) => {
   const currencyFormatter = ({currency, value}) => {
      const formatter = new Intl.NumberFormat('en-US', {
         style: 'currency',
         minimunFractionDigits: 2,
         currency
      })

      return formatter.format(value)
   }

   const value = totalB.map(reg => reg.billTotal);

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
                        <th>TOTAL Gasto</th>
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