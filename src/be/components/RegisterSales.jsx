export const RegisterSales = ({title, closeClient, customer, idCustomers, nameCustomer, description, time, amount, price, comment, setDescription, setIdCustomers, setDate, setTime, setAmount, setPrice, setComment, validar, btnSubmit}) => {
   return (
      <div className="container-form hide_font">
         <div className="card">
            <div className="card-header">
               <span className='title'>{title}</span>
               <button className='closeClient' onClick={closeClient}>X</button>
            </div>
            <div className="card-body">
               <div className="mb-3">
                  <label htmlFor="description" className="form-label">Descripcion</label>
                  <textarea rows="2" cols="30" placeholder='Descripcion' className="form-control" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
               </div>
               <div className="mb-3">
                  <label htmlFor="idCustomers" className="form-label">Cliente</label>
                  <select className="form-control" id="idCustomers" name="idCustomers" onChange={(e) => setIdCustomers(e.target.value)}>
                     <option value={idCustomers}>{nameCustomer}</option>
                     {
                        customer.map((teamList) =>
                           <option key={teamList.idCustomers} value={teamList.idCustomers}>{teamList.name}</option>
                        )
                     }
                  </select>
               </div>
               <div className="mb-3">
                  <label htmlFor="date" className="form-label">Fecha</label>
                  <input type="date" className="form-control" id="date" name="date"  onChange={(e) => setDate(e.target.value)} />
               </div>
               <div className="mb-3">
                  <label htmlFor="time" className="form-label">Hora</label>
                  <input type="time" className="form-control" id="time" name="time" value={time} onChange={(e) => setTime(e.target.value)} />
               </div>
               <div className="mb-3">
                  <label htmlFor="amount" className="form-label">Cantidad</label>
                  <input type="number" className="form-control" id="amount" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
               </div>
               <div className="mb-3">
                  <label htmlFor="tpriceime" className="form-label">Precio</label>
                  <input type="number" className="form-control" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
               </div>
               <div className="mb-3">
                  <label htmlFor="time" className="form-label">Comentario</label>
                  <textarea className='form-control' id='comment' name='comment' value={comment} rows="3" cols="30" placeholder='Comentario' maxLength='200' onChange={(e) => setComment(e.target.value)}></textarea>
               </div>
               <button onClick={() => validar(1)} className="btn btn-primary" >{btnSubmit}</button>
            </div>
         </div>
      </div>
   )
}