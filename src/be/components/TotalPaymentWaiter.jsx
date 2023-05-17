import '../../css/register.css'

export const TotalPaymentWaiter = ({totalPW}) => {
   const currencyFormatter = ({currency, value}) => {
      const formatter = new Intl.NumberFormat('en-US', {
         style: 'currency',
         minimumFractionDigits: 2,
         currency
      })

      return formatter.format(value)
   }

   const value = totalPW.map(reg => reg.payWaiterTotal);

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
                        <th>TOTAL PAGO CAMARERO</th>
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