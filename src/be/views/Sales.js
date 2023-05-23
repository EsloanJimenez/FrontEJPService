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

import { ModalTeamAssistance } from '../components/ModalTeamAssistance'
import { ModalInfoEvent } from '../components/ModalInfoEvent'
import { ViewSalesTable } from '../components/ViewSalesTable'
import { ViewWaiterToPay } from '../components/ViewWaiterToPay'
import { RegisterSales } from '../components/RegisterSales'
import { RegisterWaiterEvent } from '../components/RegisterWaiterEvent'
import { UpdateWaiterEvent } from '../components/UpdateWaiterEvent'
import { Searcher } from '../components/Searcher'

export const Sales = () => {
   const url = 'http://localhost:9005/api/'

   const [sales, setSales] = useState([]);
   const [event, setEvent] = useState([]);
   const [customer, setCustomer] = useState([]);
   const [teamMember, setTeamMember] = useState([]);
   const [paymentWaiter, setPaymentWaiter] = useState([]);
   const [waiterToPay, setWaiterToPay] = useState([]);

   const [ids, setIds] = useState('');
   const [description, setDescription] = useState('');
   const [nameCustomer, setNameCustomer] = useState('');
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
   const [lastName, setLastName] = useState();
   const [firstName, setFirstName] = useState();
   const [status, setStatus] = useState();
   const [payment, setPayment] = useState();

   const [searchCustomer, setSearchCustomer] = useState('');
   const [searchWaiter, setSearchWaiter] = useState('');

   const [paymentWaiterTotal, setPaymentWaiterTotal] = useState();
   const [eventProfit, setEventProfit] = useState();

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

      const wtp = await axios(`${url}waiterToPay`);
      setWaiterToPay(wtp.data);
   }

   const addEvent = (op, id, description, nameCustomer, idCustomers, date, time, amount, price, comment) => {
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
         setNameCustomer(nameCustomer);
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

   const waiterPay = (id, lastName, firstName, idSales, description, date, time, payment, status) => {
      const fund_new_client = document.querySelector(".waiterPay");
      fund_new_client.classList.remove('hide_font');

      setTitle('Actualizar Evento Por Pagar');
      setBtnSubmit('Actualizar');

      setIds(id);
      setLastName(lastName);
      setFirstName(firstName);
      setIdSales(idSales);
      setDescription(description);
      setDate(date);
      setTime(time);
      setPayment(payment);
      setStatus(status);

      const infoEvent = document.querySelector(".infoEvent");
      infoEvent.classList.add('hide_font');
   }

   const updateWaiterPay = () => {
      let parameters = { idPaymentWaiter: ids, idSales: idSales, date: date, time: time, payment: payment, status: status };

      const requestInit = {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(parameters)
      }

      fetch(`${url}paymentWaiterUpdated/${ids}`, requestInit)
         .then(res => res.text())
         .then(res => {

            show_alerta('Pago Camarero Actualizado', 'success');

            if (res == 'Payment Waiter Updated!') {
               getSales();
               closeClient();
            }
         })
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

      setPaymentWaiterTotal(payWai);

      setEventProfit(total - paymentWaiterTotal);
   }

   const validar = (op) => {
      let parameters;

      if (op === 1) {
         if (description.trim() === '') show_alerta('Escribe la descripcion de la venta', 'warning')
         else if (idCustomers.trim() === '') show_alerta('Seleccione el cliente', 'warning')
         else if (amount.trim() === '') show_alerta('Ingrese la cantidad de camareros', 'warning')
         else if (price.trim() === '') show_alerta('Ingrese el precio por camarero', 'warning')
         else {
            if (operation == 1) {
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

            } else if (operation == 2) {
               parameters = { idSales: ids, description: description, idCustomers: idCustomers, date: date, time: time, amount: amount, price: price, comment: comment };

               const requestInit = {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(parameters)
               }

               fetch(`${url}salesUpdate/${ids}`, requestInit)
                  .then(res => res.text())
                  .then(res => {

                     show_alerta('Venta Actualizada', 'success');

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

               <Searcher
                  holder='Buscar Por Nombre Del Cliente'
                  setSearch={setSearchCustomer}
               />

               <Searcher
                  holder='Buscar Por Nombre Del Camarero'
                  setSearch={setSearchWaiter}
               />
            </div>

            <ViewSalesTable
               sales={sales}
               search={searchCustomer}
               modalInfo={modalInfo}
               addEvent={addEvent}
               deleteSales={deleteSales}
            />

            <ViewWaiterToPay
               waiterToPay={waiterToPay}
               search={searchWaiter}
               waiterPay={waiterPay}
               deleteSales={deleteSales}
            />

            {/* REGISTRAR VENTA  */}
            <RegisterSales
               title={title}
               closeClient={closeClient}
               customer={customer}
               nameCustomer={nameCustomer}
               idCustomers={idCustomers}
               description={description}
               time={time}
               amount={amount}
               price={price}
               comment={comment}
               setDescription={setDescription}
               setIdCustomers={setIdCustomers}
               setDate={setDate}
               setTime={setTime}
               setAmount={setAmount}
               setPrice={setPrice}
               setComment={setComment}
               validar={validar}
               btnSubmit={btnSubmit}
            />

            {/* REGISTRAR CAMARERO AL EVENTO  */}
            <RegisterWaiterEvent
               title={title}
               closeClient={closeClient}
               teamMember={teamMember}
               event={event}
               setIdTeamMember={setIdTeamMember}
               setDate={setDate}
               setTime={setTime}
               setIdSales={setIdSales}
               setPayment={setPayment}
               setStatus={setStatus}
               validar={validar}
               btnSubmit={btnSubmit}
            />

            {/* INFORMACION DEL EVENTO */}
            <div className='infoEvent container-form hide_font'>
               <ModalInfoEvent
                  description={description}
                  idCustomers={idCustomers}
                  date={date}
                  time={time}
                  amount={amount}
                  price={price}
                  total={total}
                  closeClient={closeClient}
               />

               {/* MIEMBROS DE EQUIPOS QUE ASISTIERON AL EVENTO */}
               <ModalTeamAssistance
                  paymentWaiter={paymentWaiter}
                  closeClient={closeClient}
                  waiterPay={waiterPay}
                  total={total}
                  paymentWaiterTotal={paymentWaiterTotal}
                  eventProfit={eventProfit}
               />
            </div>

            {/* EDITAR CAMARERO DEL EVENTO  */}
            <UpdateWaiterEvent
               title={title}
               closeClient={closeClient}
               teamMember={teamMember}
               event={event}
               setIdTeamMember={setIdTeamMember}
               ids={ids}
               lastName={lastName}
               firstName={firstName}
               time={time}
               idSales={idSales}
               description={description}
               payment={payment}
               status={status}
               updateWaiterPay={updateWaiterPay}
               setDate={setDate}
               setTime={setTime}
               setIdSales={setIdSales}
               setPayment={setPayment}
               setStatus={setStatus}
               btnSubmit={btnSubmit}
            />
         </div>
      </div>

   )
}