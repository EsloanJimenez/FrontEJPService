import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"

import { HeaderController } from "../components/HeaderController"
import { closeClient } from '../../js/RegistrationForm'
import { show_alerta } from '../../js/Function'

import '../../css/register.css'
import '../../css/buttons.css'
import { showHint } from '../../js/search'
import { TotalSales } from '../components/TotalSales'
import { TotalBill } from '../components/TotalBill'
import { TotalPaymentWaiter } from '../components/TotalPaymentWaiter'
import { Activos } from '../components/Activos'

export const Inventory = () => {
   const url = 'http://localhost:9005/api/'
   
   const [salesTotal, setSalesTotal] = useState([]);
   const [paymentWaiter, setPaymentWaiter] = useState([]);
   const [billTotal, setBillTotal] = useState([]);

   const [inventory, setInventory] = useState([]);
   const [ids, setIds] = useState('');
   const [product, setProduct] = useState('');
   const [date, setDate] = useState('');
   const [time, setTime] = useState('');
   const [amount, setAmount] = useState('');
   const [price, setPrice] = useState('');
   const [title, setTitle] = useState([]);
   const [btnSubmit, setBtnSubmit] = useState('');
   const [operation, setOperation] = useState(1);

   const [search, setSearch] = useState('');

   let valuePrice = [], valueSubTotal = [];

   useEffect(() => {
      getInventory();

      const customer = document.getElementById("Inventory");
      customer.style.setProperty("transform", "translateY(0px)")
   }, []);

   //FORMATEANDO EL PRCIO
   const cFormatterPrice = ({currency, vPrice}) => {
      const formatter = new Intl.NumberFormat('en-US', {
         style: 'currency',
         minimumFractionDigits: 2,
         currency
      });

      return formatter.format(vPrice);
   }

   const formatterPrice = inventory.map(reg => reg.price);

   for (let i = 0; i < formatterPrice.length; i++) {
      const vPrice = formatterPrice[i];
      
      const dollarPrice = cFormatterPrice({
         currency: "USD",
         vPrice
      })

      valuePrice.push(dollarPrice);
   }

   //FORMATEANDO EL SUB TOTAL
   const cFormatterSubTotal = ({currency, vSubTotal}) => {
      const formatter = new Intl.NumberFormat('en-US', {
         style: 'currency',
         minimumFractionDigits: 2,
         currency
      });

      return formatter.format(vSubTotal);
   }

   const formatterSubTotal = inventory.map(reg => reg.subTo);

   for (let i = 0; i < formatterSubTotal.length; i++) {
      const vSubTotal = formatterSubTotal[i];
      
      const dollarSubTotal = cFormatterSubTotal({
         currency: "USD",
         vSubTotal
      })

      valueSubTotal.push(dollarSubTotal);
   }



   const getInventory = async () => {
      const res = await axios(`${url}inventory`);
      setInventory(res.data);

      const bt = await axios(`${url}billTotal`);
      setBillTotal(bt.data);

      const st = await axios(`${url}salesTotal`);
      setSalesTotal(st.data);

      const pw = await axios(`${url}payWaiter`);
      setPaymentWaiter(pw.data);
   }

   const openModal = (op, id, product, date, time, amount, price) => {
      const fund_new_client = document.querySelector(".container-form");
      fund_new_client.classList.remove('hide_font');
      
      setIds('');
      setProduct('');
      setDate('');
      setTime('');
      setAmount('');
      setPrice('');
      setOperation(op);

      if(op === 1) {
         setTitle('Registrar Producto');
         setBtnSubmit('Registrar');
      }
      else if(op === 2) {
         setTitle('Editar Producto');
         setBtnSubmit('Actualizar');
         setIds(id);
         setProduct(product);
         setDate(date);
         setTime(time);
         setAmount(amount);
         setPrice(price);
      }

      window.setTimeout(() => {
         document.getElementById('name').focus();
      }, 500)
   }

   const validar = () => {
      let parametros;

      if(product.trim() === '') show_alerta('Escribe el nombre del cliente', 'warning')
      else if(date.trim() === '') show_alerta('Seleccione la fecha', 'warning')
      else {
         if(operation === 1) {
            parametros = {product: product.trim(),date:date.trim(),time: time.trim(),amount: amount.trim(), price: price.trim()};

            const requestInit = {
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(parametros)
            }
      
            fetch(`${url}inventory`, requestInit)
            .then(res => res.text())
            .then(res => {
               
               show_alerta('Producto Registrado', 'success');
   
               if(res == 'success') {
                  getInventory();
                  closeClient();
               }
            })

         } else if(operation === 2) {
            parametros = {idInventory:ids, product:product.trim(),date:date.trim(),time: time.trim(),amount: amount.trim(),price: price.trim()};

            const requestInit = {
               method: 'PUT',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(parametros)
            }
      
            fetch(`${url}inventoryUpdate/${ids}`, requestInit)
            .then(res => res.text())
            .then(res => {
            
               show_alerta('Cliente Actualizado', 'success');
   
               if(res == 'customer updated!') {
                  getInventory();
                  closeClient();
               }
            })
         }         
      }
   }

   const deleteInventory = (id, product) => {
      const MySwal = withReactContent(Swal);

      MySwal.fire({
         title: `Seguro de eliminar el cliente ${product}?`,
         icon: 'question', text: 'No se podra dar marcha a tras',
         showCancelButton: true, confirmButtonText: 'Si, eliminar', cancelButtonText: 'cancelar'
      }).then((result) => {
         if(result.isConfirmed) {
            const requestInit = {
               method: 'DELETE'
            }
      
            fetch(`${url}inventoryDelete/${id}`, requestInit)
            .then(res => res.text())
            .then(res => console.log(res))

            show_alerta('Inventory Eliminado', 'success')
            getInventory();
         } else {
            show_alerta('El Producto NO fue eliminado', 'info');
         }
      });
   }

   return(
      <div className="container">
         <HeaderController />

         <div className="container-table">
            <div className='header'>
               <button name="addRegister" id="addRegister" className="btn-register" onClick={() => openModal(1)}><span><FontAwesomeIcon icon={faCirclePlus} /></span></button>

               <div>
                  <input type="text" name="campo" id="campo" onChange={(e) => setSearch(e.target.value)} />
                  <button id='buscar' onclick={showHint} >Buscar</button>
               </div>
            </div>

            <div className='table'>
               <table>
                  <thead>
                     <tr><th colspan="8">PRODUCTOS</th></tr>
                     <tr>
                        <th>ID</th>
                        <th>PRODUCTO</th>
                        <th>FECHA</th>
                        <th>HORA</th>
                        <th>CANTIDAD</th>
                        <th>PRECIO</th>
                        <th>SUB TOTAL</th>
                        <th>ACCIONES</th>
                     </tr>
                  </thead>
                  <tbody id='listaCiudades'>
                     {
                        inventory.map((reg, i) => (
                           <tr key={reg.idInventory}>
                              <td>{reg.idInventory}</td>
                              <td>{reg.product}</td>
                              <td>{reg.newDate}</td>
                              <td>{reg.time}</td>
                              <td>{reg.amount}</td>
                              <td>{valuePrice[i]}</td>
                              <td>{valueSubTotal[i]}</td>
                              <td>
                                 <button onClick={() => openModal(2, reg.idInventory, reg.product, reg.date, reg.time, reg.amount, reg.price)} className="btn btn-info">Editar</button>
                                 <button onClick={() => deleteInventory(reg.idInventory, reg.product)} className="btn btn-delete">Eliminar</button>
                              </td>
                           </tr>
                        ))
                     }
                  </tbody>
               </table>
            </div>

            <div className='container'>
               <TotalSales totalS={salesTotal} />
               <TotalPaymentWaiter totalPW={paymentWaiter} />
               <TotalBill totalB={billTotal} />
               <Activos 
                  totalS={salesTotal}
                  totalPW={paymentWaiter}
                  totalB={billTotal}
               /> 
            </div>

            {/* REGISTRAR PRODUCTO  */}
            <div className="container-form hide_font">
               <div className="card">
                  <div className="card-header">
                     <span className='title'>{title}</span>
                     <button className='closeClient' onClick={closeClient}>X</button>
                  </div>
                  <div className="card-body">
                        <div className="mb-3">
                           <label for="product" className="form-label">Nombre Producto</label>
                           <input type="text" className="form-control" id="product" name="product" value={product} onChange={(e) => setProduct(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                           <label for="date" className="form-label">Fecha</label>
                           <input type="date" className="form-control" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
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
                        <button onClick={() => validar()} className="btn btn-primary" tabindex="6">{btnSubmit}</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
      
   )
}