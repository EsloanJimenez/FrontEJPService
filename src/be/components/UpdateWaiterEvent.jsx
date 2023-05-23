export const UpdateWaiterEvent = ({title, closeClient, setIdTeamMember, ids, lastName, firstName, teamMember, time, setDate, setTime, idSales, description, setIdSales,event, payment, setPayment, status, setStatus, updateWaiterPay, btnSubmit}) => {
   return (
      <div className="waiterPay container-form hide_font">
         <div className="card">
            <div className="card-header">
               <span className='title'>{title}</span>
               <button className='closeClient' onClick={closeClient}>X</button>
            </div>
            <div className="card-body">
               <div className="mb-3">
                  <label htmlFor="waiter" className="form-label">Nombre</label>
                  <select className='form-control' id='idTeamMember' name='id_team_memeber' onChange={(e) => setIdTeamMember(e.target.value)}>
                     <option value={ids}>{lastName} {firstName}</option>
                     {
                        teamMember.map((reg, i) =>
                           <option key={i} value={reg.idTeamMember}>{reg.lastName} {reg.firstName}</option>
                        )
                     }
                  </select>
               </div>
               <div className="mb-3">
                  <label htmlFor="date" className="form-label">Fecha</label>
                  <input type="date" className="form-control" id="date" name="date" onChange={(e) => setDate(e.target.value)} />
               </div>
               <div className="mb-3">
                  <label htmlFor="time" className="form-label">Hora</label>
                  <input type="time" className="form-control" id="time" value={time} name="time" onChange={(e) => setTime(e.target.value)} />
               </div>
               <div className="mb-3">
                  <label htmlFor="idSales" className="form-label">Evento</label>
                  <select className="form-control" id="idSales" name="idSales" onChange={(e) => setIdSales(e.target.value)}>
                     <option value={idSales}>{description}</option>
                     {
                        event.map((reg) =>
                           <option key={reg.idSales} value={reg.idSales}>{reg.description}</option>
                        )
                     }
                  </select>
               </div>
               <div className="mb-3">
                  <label htmlFor="payment" className="form-label">Pagar Al Camarero</label>
                  <input type="number" className="form-control" id="payment" value={payment} name="payment" onChange={(e) => setPayment(e.target.value)} />
               </div>
               <div className="mb-3">
                  <label htmlFor="status" className="form-label">Stado</label>
                  <select className="form-control" id="status" name="status" onChange={(e) => setStatus(e.target.value)}>
                     <option className={status}>{status ? 'Pagado' : 'Por Pagar'}</option>
                     <option value="0">Por Pagar</option>
                     <option value="1">Pagado</option>
                  </select>
               </div>
               <button onClick={() => updateWaiterPay()} className="btn btn-primary" >{btnSubmit}</button>
            </div>
         </div>
      </div>
   )
}