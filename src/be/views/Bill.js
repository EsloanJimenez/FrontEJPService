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

export const Bill = () => {
   const url = 'http://localhost:9005/api/bill'

   const [bill, setBill] = useState([]);
   const [ids, setIds] = useState('');
   const [description, setDescription] = useState('');
   const [date, setDate] = useState('');
   const [amount, setAmount] = useState('');
   const [price, setPrice] = useState('');
   const [title, setTitle] = useState([]);
   const [btnSubmit, setBtnSubmit] = useState('');
   const [operation, setOperation] = useState(1);

   const [search, setSearch] = useState('');

   useEffect(() => {
      getBill();

      const customer = document.getElementById("Bill");
      customer.style.setProperty("transform", "translateY(0px)")
   }, []);

   const getBill = async () => {
      const res = await axios.get(url);
      setBill(res.data);
   }

   const openModal = (op, id, description, date, amount, price) => {
      const fund_new_client = document.querySelector(".container-form");
      fund_new_client.classList.remove('hide_font');
      
      setIds('');
      setDescription('');
      setDate('');
      setAmount('');
      setPrice('');
      setOperation(op);

      if(op === 1) {
         setTitle('Registrar Description');
         setBtnSubmit('Registrar');
      }
      else if(op === 2) {
         setTitle('Editar Description');
         setBtnSubmit('Actualizar');
         setIds(id);
         setDescription(description);
         setDate(date);
         setAmount(amount);
         setPrice(price);
      }

      window.setTimeout(() => {
         document.getElementById('name').focus();
      }, 500)
   }

   const validar = () => {
      let parametros;

      if(description.trim() === '') show_alerta('Escribe la descripcion del gastop', 'warning')
      else if(date.trim() === '') show_alerta('Seleccione la fecha', 'warning')
      else {
         if(operation === 1) {
            parametros = {description: description.trim(),date:date.trim(), amount: amount.trim(), price: price.trim()};

            const requestInit = {
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(parametros)
            }
      
            fetch(url, requestInit)
            .then(res => res.text())
            .then(res => {
               
               show_alerta('Gasto Registrado', 'success');
   
               if(res == 'success') {
                  getBill();
                  closeClient();
               }
            })

         } else if(operation === 2) {
            parametros = {idBill:ids, description:description.trim(),date:date.trim(), amount: amount,price: price};

            const requestInit = {
               method: 'PUT',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(parametros)
            }
      
            fetch(`${url}Update/${ids}`, requestInit)
            .then(res => res.text())
            .then(res => {
            
               show_alerta('Gasto Actualizado', 'success');
   
               if(res == 'Bill updated!') {
                  getBill();
                  closeClient();
               }
            })
         }         
      }
   }

   const deleteBill = (id, product) => {
      const MySwal = withReactContent(Swal);

      MySwal.fire({
         title: `Seguro de eliminar el producto ${product}?`,
         icon: 'question', text: 'No se podra dar marcha a tras',
         showCancelButton: true, confirmButtonText: 'Si, eliminar', cancelButtonText: 'cancelar'
      }).then((result) => {
         if(result.isConfirmed) {
            const requestInit = {
               method: 'DELETE'
            }
      
            fetch(`${url}Delete/${id}`, requestInit)
            .then(res => res.text())
            .then(res => console.log(res))

            show_alerta('Producto Eliminado', 'success')
            getBill();
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
                     <tr>
                        <th>ID</th>
                        <th>DESCRIPCION</th>
                        <th>FECHA</th>
                        <th>CANTIDAD</th>
                        <th>PRECIO</th>
                        <th>SUB TOTAL</th>
                        <th>ACCIONES</th>
                     </tr>
                  </thead>
                  <tbody id='listaCiudades'>
                     {
                        bill.map((reg) => (
                           <tr key={reg.idBill}>
                              <td>{reg.idBill}</td>
                              <td>{reg.description}</td>
                              <td>{reg.newDate}</td>
                              <td>{reg.amount}</td>
                              <td>{reg.price}</td>
                              <td>{reg.subTo}</td>
                              <td>
                                 <button onClick={() => openModal(2, reg.idBill, reg.description, reg.date, reg.amount, reg.price)} className="btn btn-info">Editar</button>
                                 <button onClick={() => deleteBill(reg.idBill, reg.description)} className="btn btn-delete">Eliminar</button>
                              </td>
                           </tr>
                        ))
                     }
                     <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>TOTAL</td>
                     </tr>
                  </tbody>
               </table>
            </div>

            {/* REGISTRAR CLIENTE  */}
            <div className="container-form hide_font">
               <div className="card">
                  <div className="card-header">
                     <span className='title'>{title}</span>
                     <button className='closeClient' onClick={closeClient}>X</button>
                  </div>
                  <div className="card-body">
                        <div className="mb-3">
                           <label for="description" className="form-label">DESCRIPCION</label>
                           <input type="text" className="form-control" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                           <label for="date" className="form-label">Fecha</label>
                           <input type="date" className="form-control" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
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