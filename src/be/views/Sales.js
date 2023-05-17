import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"

import { HeaderController } from "../components/HeaderController"
import { closeClient } from '../../js/RegistrationForm'
import { show_alerta } from '../../js/Function'

import '../../css/register.css'
import '../../css/buttons.css'
import '../../css/modal.css'

import { showHint } from '../../js/search'
import { TotalSales } from '../components/TotalSales'

export const Sales = () => {
   const url = 'http://localhost:9005/api/'

   const [sales, setSales] = useState([]);
   const [event, setEvent] = useState([]);
   const [customer, setCustomer] = useState([]);
   const [teamMember, setTeamMember] = useState([]);
   const [paymentWaiter, setPaymentWaiter] = useState([]);

   const [ids, setIds] = useState('');
   const [description, setDescription] = useState('');
   const [idCustomers, setIdCustomers] = useState('');
   const [date, setDate] = useState('');
   const [time, setTime] = useState('');
   const [amount, setAmount] = useState('');
   const [price, setPrice] = useState('');
   const [total, setTotal] = useState('');
   const [comment, setComment] = useState('');
   const [title, setTitle] = useState([]);
   const [btnSubmit, setBtnSubmit] = useState('');
   const [operation, setOperation] = useState(1);

   const [idSales, setIdSales] = useState();
   const [idTeamMember, setIdTeamMember] = useState();
   const [status, setStatus] = useState();
   const [payment, setPayment] = useState();

   const [search, setSearch] = useState('');

   const paymentWaiterTotal = 0;
   let eventProfit;

   useEffect(() => {
      getSales();
      modalInfo();

      const customer = document.getElementById("Sales");
      customer.style.setProperty("transform", "translateY(0px)")
   }, []);

   const getSales = async () => {
      const res = await axios.get(`${url}sales`);
      setSales(res.data);

      const se = await axios(`${url}salesEvent`);
      setEvent(se.data);

      const cus = await axios(`${url}customers`);
      setCustomer(cus.data);

      const tm = await axios(`${url}teamMember`);
      setTeamMember(tm.data);
   }

   const addEvent = (op, id, description, idCustomers, date, time, amount, price, comment) => {
      const fund_new_client = document.querySelector(".container-form");
      fund_new_client.classList.remove('hide_font');

      setIds('');
      setDescription('');
      setIdCustomers('');
      setDate('');
      setTime('');
      setAmount('');
      setPrice('');
      setComment('');
      setOperation(op);

      if (op === 1) {
         setTitle('Registrar Venta');
         setBtnSubmit('Registrar');
      }
      else if (op === 2) {
         setTitle('Editar Venta');
         setBtnSubmit('Actualizar');
         setIds(id);
         setDescription(description);
         setIdCustomers(idCustomers);
         setDate(date);
         setTime(time);
         setAmount(amount);
         setPrice(price);
         setComment(comment);
      }

      window.setTimeout(() => {
         document.getElementById('description').focus();
      }, 500)
   }

   const addWaiter = () => {
      const fundWaiterEvent = document.querySelector(".waiterEvent");
      fundWaiterEvent.classList.remove('hide_font');

      setTitle('Registrar Camarero Al Evento');
      setBtnSubmit('Registrar');
   }

   const modalInfo = async (idSales, description, customer, date, time, amount, price, total, comment) => {
      const fundInfoEvent = document.querySelector(".infoEvent");
      fundInfoEvent.classList.remove('hide_font');

      setIdSales(idSales);
      setDescription(description);
      setIdCustomers(customer);
      setDate(date);
      setTime(time);
      setAmount(amount);
      setPrice(price);
      setTotal(total);
      setComment(comment);

      const pw = await axios(`${url}paymentWaiter/${idSales}`);
      setPaymentWaiter(pw.data);

      const pwt = await axios(`${url}paymentWaiterTotal/${idSales}`);
      let payWai = pwt.data[0].pago;

      paymentWaiterTotal = payWai;

      eventProfit = total - paymentWaiterTotal;

   }

   const validar = (op) => {
      let parameters;

      if (op === 1) {
         if (description.trim() === '') show_alerta('Escribe la descripcion de la venta', 'warning')
         else if (idCustomers.trim() === '') show_alerta('Seleccione el cliente', 'warning')
         else if (amount.trim() === '') show_alerta('Ingrese la cantidad de camareros', 'warning')
         else if (price.trim() === '') show_alerta('Ingrese el precio por camarero', 'warning')
         else {
            if (operation === 1) {
               parameters = { description: description.trim(), idCustomers: idCustomers.trim(), date: date.trim(), time: time.trim(), amount: amount.trim(), price: price.trim(), comment: comment.trim() };

               const requestInit = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(parameters)
               }

               fetch(`${url}sales`, requestInit)
                  .then(res => res.text())
                  .then(res => {

                     show_alerta('Venta Registrado', 'success');

                     if (res === 'success') {
                        closeClient();
                        getSales();
                     }
                  })

            } else if (operation === 2) {
               parameters = { id_sales: ids, description: description, idCustomers: idCustomers, date: date, time: time, amount: amount, price: price, comment: comment };

               const requestInit = {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(parameters)
               }

               fetch(`${url}salesUpdate/${ids}`, requestInit)
                  .then(res => res.text())
                  .then(res => {

                     show_alerta('Venta Actualizado', 'success');

                     if (res == 'sales updated!') {
                        closeClient();
                        getSales();
                     }
                  })
            }
         }
      } else {
         if (idTeamMember === undefined) show_alerta('Seleccione El Camarero', 'warning')
         else if (date === '') show_alerta('Seleccione la fecha en que fue el evento', 'warning')
         else if (time === '') show_alerta('Seleccione la hora en la que inicio el evento', 'warning')
         else if (idSales === undefined) show_alerta('Seleccione el evento', 'warning')
         else if (payment === undefined) show_alerta('Ingrese el pago', 'warning')
         else if (status === undefined) show_alerta('Seleccione el stado', 'warning')
         else {
            parameters = { idTeamMember: idTeamMember.trim(), date: date.trim(), time: time.trim(), idSales: idSales.trim(), payment: payment.trim(), status: status.trim() }

            const requestInit = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(parameters)
            }

            fetch(`${url}paymentWaiter`, requestInit)
               .then(res => res.text())
               .then(res => {
                  show_alerta('Camarero Registrado', 'success');

                  if (res === 'success') {
                     closeClient();
                     getSales();
                  }
               })
         }
      }
   }

   const updateWaiter = async () => {
      let parameters = { idPaymentWaiter: ids, idTeamMember: idTeamMember.trim(), date: date.trim(), time: time.trim(), payment: payment.trim(), status: status.trim() };

      const requestInit = {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(parameters)
      }

      fetch(`${url}salesUpdate/${ids}`, requestInit)
         .then(res => res.text())
         .then(res => {

            show_alerta('Venta Actualizado', 'success');

            if (res == 'sales updated!') {
               closeClient();
               getSales();
            }
         })
   }

   const deleteSales = (id, description) => {
      const MySwal = withReactContent(Swal);

      MySwal.fire({
         title: `Seguro de eliminar la venta ${description}?`,
         icon: 'question', text: 'No se podra dar marcha a tras',
         showCancelButton: true, confirmButtonText: 'Si, eliminar', cancelButtonText: 'cancelar'
      }).then((result) => {
         if (result.isConfirmed) {
            const requestInit = {
               method: 'DELETE'
            }

            fetch(`${url}salesDelete/${id}`, requestInit)
               .then(res => res.text())
               .then(res => console.log(res))

            show_alerta('Venta Eliminada', 'success')
            getSales();
         } else {
            show_alerta('La venta NO fue eliminada', 'info');
         }
      });
   }

   const deleteWaiter = (id, lastName, firstName) => {
      const MySwal = withReactContent(Swal);

      MySwal.fire({
         title: `Seguro de eliminar a ${lastName} ${firstName}?`,
         icon: 'question', text: 'No se podra dar marcha a tras',
         showCancelButton: true, confirmButtonText: 'Si, eliminar', cancelButtonText: 'cancelar'
      }).then((result) => {
         if (result.isConfirmed) {
            const requestInit = {
               method: 'DELETE'
            }

            fetch(`${url}paymentWaiterDelete/${id}`, requestInit)
               .then(res => res.text())
               .then(res => console.log(res))

            show_alerta('Camarero Eliminado', 'success')
            getSales();
         } else {
            show_alerta('El Camarero NO fue eliminada', 'info');
         }
      });
   }

   return (
      <div className="container">
         <HeaderController />

         <div className="container-table">
            <div className='header'>
               <button name="addRegister" id="addRegister" className="btn-primary" onClick={() => addEvent(1)}><span><FontAwesomeIcon icon={faCirclePlus} /></span></button>
               <button name="addWaiter" id="addWaiter" className="btn-secondary" onClick={() => addWaiter()}><span><FontAwesomeIcon icon={faCirclePlus} /></span></button>

               <div>
                  <input type="text" name="campo" id="campo" onChange={(e) => setSearch(e.target.value)} />
                  <button id='buscar' onclick={showHint} >Buscar</button>
               </div>
            </div>

            <div className='table'>
               <table>
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>DESCRIPCION</th>
                        <th>CLIENTE</th>
                        <th>FECHA</th>
                        <th>HORA</th>
                        <th>CANTIDAD</th>
                        <th>PRECIO</th>
                        <th>TOTAL</th>
                        <th>ACCIONES</th>
                     </tr>
                  </thead>
                  <tbody id='listaCiudades'>
                     {
                        sales.map((reg, i) => (
                           <tr key={reg.idSales} title={reg.comment}>
                              <td>{i + 1}</td>
                              <td>{reg.description}</td>
                              <td>{reg.name}</td>
                              <td>{reg.newDate}</td>
                              <td>{reg.time}</td>
                              <td>{reg.amount}</td>
                              <td>{reg.price}</td>
                              <td>{reg.total}</td>
                              <td>
                                 <button onClick={() => modalInfo(reg.idSales, reg.description, reg.name, reg.newDate, reg.time, reg.amount, reg.price, reg.total, reg.comment)} className='btn btn-info'>Info</button>
                                 <button onClick={() => addEvent(2, reg.idSales, reg.description, reg.customers, reg.date, reg.time, reg.amount, reg.price, reg.comment)} className="btn btn-update">Editar</button>
                                 <button onClick={() => deleteSales(reg.idSales, reg.description)} className="btn btn-delete">Eliminar</button>
                              </td>
                           </tr>
                        ))
                     }
                  </tbody>
               </table>
            </div>

            {/* REGISTRAR VENTA  */}
            <div className="container-form hide_font">
               <div className="card">
                  <div className="card-header">
                     <span className='title'>{title}</span>
                     <button className='closeClient' onClick={closeClient}>X</button>
                  </div>
                  <div className="card-body">
                     <div className="mb-3">
                        <label for="description" className="form-label">Descripcion</label>
                        <textarea rows="5" cols="30" placeholder='Descripcion' className="form-control" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                     </div>
                     <div className="mb-3">
                        <label for="idCustomers" className="form-label">Cliente</label>
                        <select className="form-control" id="idCustomers" name="idCustomers" onChange={(e) => setIdCustomers(e.target.value)}>
                           <option value="0">Seleccione El Cliente</option>
                           {
                              customer.map((teamList) =>
                                 <option key={teamList.idCustomers} value={teamList.idCustomers}>{teamList.name}</option>
                              )
                           }
                        </select>
                     </div>
                     <div className="mb-3">
                        <label for="date" class="form-label">Fecha</label>
                        <input type="date" class="form-control" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
                     </div>
                     <div className="mb-3">
                        <label for="time" className="form-label">Hora</label>
                        <input type="time" className="form-control" id="time" name="time" value={time} onChange={(e) => setTime(e.target.value)} />
                     </div>
                     <div className="mb-3">
                        <label for="amount" className="form-label">Cantidad</label>
                        <input type="number" className="form-control" id="amount" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                     </div>
                     <div className="mb-3">
                        <label for="tpriceime" className="form-label">Precio</label>
                        <input type="number" className="form-control" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                     </div>
                     <div className="mb-3">
                        <label for="time" className="form-label">Comentario</label>
                        <textarea className='form-control' id='comment' name='comment' value={comment} rows="5" cols="30" placeholder='Comentario' maxLength='200' onChange={(e) => setComment(e.target.value)}></textarea>
                     </div>
                     <button onClick={() => validar(1)} className="btn btn-primary" >{btnSubmit}</button>
                  </div>
               </div>
            </div>

            {/* REGISTRAR CAMARERO AL EVENTO  */}
            <div className="waiterEvent container-form hide_font">
               <div className="card">
                  <div className="card-header">
                     <span className='title'>{title}</span>
                     <button className='closeClient' onClick={closeClient}>X</button>
                  </div>
                  <div className="card-body">
                     <div className="mb-3">
                        <label for="waiter" className="form-label">Camarero</label>
                        <select className='form-control' id='idTeamMember' name='id_team_memeber' onChange={(e) => setIdTeamMember(e.target.value)}>
                           <option value="0">Seleccione El Camarero</option>
                           {
                              teamMember.map((reg, i) =>
                                 <option key={i} value={reg.idTeamMember}>{reg.lastName} {reg.firstName}</option>
                              )
                           }
                        </select>
                     </div>
                     <div className="mb-3">
                        <label for="date" class="form-label">Fecha</label>
                        <input type="date" class="form-control" id="date" name="date" onChange={(e) => setDate(e.target.value)} />
                     </div>
                     <div className="mb-3">
                        <label for="time" className="form-label">Hora</label>
                        <input type="time" className="form-control" id="time" name="time" onChange={(e) => setTime(e.target.value)} />
                     </div>
                     <div className="mb-3">
                        <label for="idSales" className="form-label">Evento</label>
                        <select className="form-control" id="idSales" name="idSales" onChange={(e) => setIdSales(e.target.value)}>
                           <option value="0">Seleccione El Evento</option>
                           {
                              event.map((reg) =>
                                 <option key={reg.idSales} value={reg.idSales}>{reg.description}</option>
                              )
                           }
                        </select>
                     </div>
                     <div className="mb-3">
                        <label for="payment" className="form-label">Pago</label>
                        <input type="number" className="form-control" id="payment" name="payment" onChange={(e) => setPayment(e.target.value)} />
                     </div>
                     <div className="mb-3">
                        <label for="status" className="form-label">Stado</label>
                        <select className="form-control" id="status" name="status" onChange={(e) => setStatus(e.target.value)}>
                           <option value="null">Seleccione El Stado</option>
                           <option value="Por Pagar">Por Pagar</option>
                           <option value="Pagado">Pagado</option>
                        </select>
                     </div>
                     <button onClick={() => validar(2)} className="btn btn-primary" >{btnSubmit}</button>
                  </div>
               </div>
            </div>

            {/* INFORMACION DEL EVENTO */}
            <div className='infoEvent container-form hide_font'>
               <div className="tableShort">
                  <table>
                     <thead>
                        <tr><th colSpan={7}>INFORMACION DEL EVENTO <button className='closeClient right' onClick={closeClient}>X</button></th></tr>
                        <tr>
                           <th>DESCRIPCION</th>
                           <th>CLIENTE</th>
                           <th>FECHA</th>
                           <th>HORA</th>
                           <th>CANTIDAD</th>
                           <th>PRECIO</th>
                           <th>TOTAL</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>{description}</td>
                           <td>{idCustomers}</td>
                           <td>{date}</td>
                           <td>{time}</td>
                           <td>{amount}</td>
                           <td>{price}</td>
                           <td>{total}</td>
                        </tr>
                     </tbody>
                  </table>
               </div>

               <div className='tableSmall'>
                  <table>
                     <thead>
                        <tr>
                           <th colSpan={7}>
                              MIEMBROS DE EQUIPO QUE ASISTIERON
                              <button className='closeClient right' onClick={closeClient}>X</button>
                           </th>
                        </tr>
                        <tr>
                           <th>ID</th>
                           <th>NOMBRE</th>
                           <th>APELLIDO</th>
                           <th>PAGO</th>
                           <th>STATUS</th>
                           <th>ACCIONES</th>
                        </tr>
                     </thead>
                     <tbody>
                        {
                           paymentWaiter.map((reg, i) =>
                              <tr key={i}>
                                 <td>{i + 1}</td>
                                 <td>{reg.lastName}</td>
                                 <td>{reg.firstName}</td>
                                 <td>{reg.payment}</td>
                                 <td>{reg.status}</td>
                                 <td>
                                    <button onClick={() => updateWaiter(reg.idPaymentWaiter, reg.date, reg.time, reg.payment, reg.status)} className="btn btn-update">Editar</button>
                                    <button onClick={() => deleteWaiter(reg.idPaymentWaiter, reg.lastName, reg.firstName)} className="btn btn-delete">Eliminar</button>
                                 </td>
                              </tr>
                           )
                        }
                        <tr>
                           <td></td>
                           <td></td>
                           <td><strong><i>PAGO DEL CLIENTE</i></strong></td>
                           <td><strong><i>{total}</i></strong></td>
                        </tr>
                        <tr>
                           <td></td>
                           <td></td>
                           <td><strong><i>PAGO DEL CAMARERO</i></strong></td>
                           <td><strong><i>{paymentWaiterTotal}</i></strong></td>
                        </tr>
                        <tr>
                           <td></td>
                           <td></td>
                           <td><strong><i>GANANCIA DEL EVENTO</i></strong></td>
                           <td><strong><i>{eventProfit}</i></strong></td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>

            <div className='updateWaiter container-form hide_font'>
               <div className="card">
                  <div className="card-header">
                     <span className='title'>Actualizar Camarero</span>
                     <button className='closeClient' onClick={closeClient}>X</button>
                  </div>
                  <div className="card-body">
                     <div className="mb-3">
                        <label for="waiter" className="form-label">Nombre</label>
                        <select className='form-control' id='idTeamMember' name='id_team_memeber' onChange={(e) => setIdTeamMember(e.target.value)}>
                           <option value="0">Seleccione El Camarero</option>
                           {
                              teamMember.map((reg, i) =>
                                 <option key={i} value={reg.idTeamMember}>{reg.lastName} {reg.firstName}</option>
                              )
                           }
                        </select>
                     </div>
                     <div className="mb-3">
                        <label for="date" class="form-label">Fecha</label>
                        <input type="date" class="form-control" id="date" name="date" onChange={(e) => setDate(e.target.value)} />
                     </div>
                     <div className="mb-3">
                        <label for="time" className="form-label">Hora</label>
                        <input type="time" className="form-control" id="time" name="time" onChange={(e) => setTime(e.target.value)} />
                     </div>
                     <div className="mb-3">
                        <label for="payment" className="form-label">Pago</label>
                        <input type="number" className="form-control" id="payment" name="payment" onChange={(e) => setPayment(e.target.value)} />
                     </div>
                     <div className="mb-3">
                        <label for="status" className="form-label">Stado</label>
                        <select className="form-control" id="status" name="status" onChange={(e) => setStatus(e.target.value)}>
                           <option value="null">Seleccione El Stado</option>
                           <option value="Por Pagar">Por Pagar</option>
                           <option value="Pagado">Pagado</option>
                        </select>
                     </div>
                     <button onClick={() => validar(2)} className="btn btn-primary" >{btnSubmit}</button>
                  </div>
               </div>
            </div>
         </div>
      </div>

   )
}