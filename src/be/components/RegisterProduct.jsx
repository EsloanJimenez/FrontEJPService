export const RegisterProduct = ({title, closeClient, product, setProduct, setDate, time, setTime, amount, setAmount, price, setPrice, validate, btnSubmit}) => {
   return (
      <div className="container-form hide_font">
         <div className="card">
            <div className="card-header">
               <span className='title'>{title}</span>
               <button className='closeClient' onClick={closeClient}>X</button>
            </div>
            <div className="card-body">
               <div className="mb-3">
                  <label for="product" className="form-label">Nombre Producto</label>
                  <input type="text" className="form-control" id="product" name="product" value={product} onChange={(e) => setProduct(e.target.value)} />
               </div>
               <div className="mb-3">
                  <label for="date" className="form-label">Fecha</label>
                  <input type="date" className="form-control" id="date" name="date" onChange={(e) => setDate(e.target.value)} />
               </div>
               <div className="mb-3">
                  <label for="time" class="form-label">Hora</label>
                  <input type="time" class="form-control" id="time" name="time" value={time} onChange={(e) => setTime(e.target.value)} />
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