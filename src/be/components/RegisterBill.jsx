export const RegisterBill = ({title, closeClient, description, setDescription, setDate, amount, setAmount, price, setPrice, validate, btnSubmit}) => {
   return (
      <div className="container-form hide_font">
         <div className="card">
            <div className="card-header">
               <span className='title'>{title}</span>
               <button className='closeClient' onClick={closeClient}>X</button>
            </div>
            <div className="card-body">
               <div className="mb-3">
                  <label for="description" className="form-label">DESCRIPCION</label>
                  <input type="text" className="form-control" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
               </div>
               <div className="mb-3">
                  <label for="date" className="form-label">Fecha</label>
                  <input type="date" className="form-control" id="date" name="date" onChange={(e) => setDate(e.target.value)} />
               </div>
               <div className="mb-3">
                  <label for="amount" className="form-label">Cantidad</label>
                  <input type="number" className="form-control" id="amount" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
               </div>
               <div className="mb-3">
                  <label for="price" className="form-label">Precio</label>
                  <input type="number" className="form-control" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
               </div>
               <button onClick={() => validate()} className="btn btn-primary" tabindex="6">{btnSubmit}</button>
            </div>
         </div>
      </div>
   )
}