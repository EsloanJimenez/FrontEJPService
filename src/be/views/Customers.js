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

export const Customers = () => {
   const url = 'http://localhost:9005/api/customers'

   const [customers, setCustomers] = useState([]);
   const [ids, setIds] = useState('');
   const [name, setName] = useState('');
   const [company, setCompany] = useState('');
   const [email, setEmail] = useState('');
   const [cellPhone, setCellPhone] = useState('');
   const [title, setTitle] = useState([]);
   const [btnSubmit, setBtnSubmit] = useState('');
   const [operation, setOperation] = useState(1);

   const [search, setSearch] = useState('');

   useEffect(() => {
      getCustomers();

      const customer = document.getElementById("Customers");
      customer.style.setProperty("transform", "translateY(0px)")
   }, []);

   const getCustomers = async () => {
      const res = await axios.get(url);
      setCustomers(res.data);
   }

   const openModal = (op, id, name, company, email, cellPhone) => {
      const fund_new_client = document.querySelector(".container-form");
      fund_new_client.classList.remove('hide_font');
      
      setIds('');
      setName('');
      setCompany('');
      setEmail('');
      setCellPhone('');
      setOperation(op);

      if(op === 1) {
         setTitle('Registrar Cliente');
         setBtnSubmit('Registrar');
      }
      else if(op === 2) {
         setTitle('Editar Cliente');
         setBtnSubmit('Actualizar');
         setIds(id);
         setName(name);
         setCompany(company);
         setEmail(email);
         setCellPhone(cellPhone);
      }

      window.setTimeout(() => {
         document.getElementById('name').focus();
      }, 500)
   }

   const validar = () => {
      let parametros;

      if(name.trim() === '') show_alerta('Escribe el nombre del cliente', 'warning')
      else if(cellPhone.trim() === '') show_alerta('Escribe el numero de telefono del cliente', 'warning')
      else {
         if(operation === 1) {
            parametros = {name: name.trim(),company:company.trim(),email: email.trim(),cellPhone: cellPhone.trim()};

            const requestInit = {
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(parametros)
            }
      
            fetch(url, requestInit)
            .then(res => res.text())
            .then(res => {
               
               show_alerta('Cliente Registrado', 'success');
   
               if(res == 'success') {
                  getCustomers();
                  closeClient();
               }
            })

         } else if(operation === 2) {
            parametros = {id_customers:ids, name:name.trim(),company:company.trim(),email: email.trim(),cellPhone: cellPhone.trim()};

            const requestInit = {
               method: 'PUT',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(parametros)
            }
      
            fetch(`${url}Update/${ids}`, requestInit)
            .then(res => res.text())
            .then(res => {
               let msj = 'Cliente Actualizado';
            
               show_alerta(msj, 'success');
   
               if(res == 'customer updated!') {
                  closeClient();
                  getCustomers();
               }
            })
         }         
      }
   }

   const deleteCustomer = (id, name) => {
      const MySwal = withReactContent(Swal);

      MySwal.fire({
         title: `Seguro de eliminar el cliente ${name}?`,
         icon: 'question', text: 'No se podra dar marcha a tras',
         showCancelButton: true, confirmButtonText: 'Si, eliminar', cancelButtonText: 'cancelar'
      }).then((result) => {
         if(result.isConfirmed) {
            const requestInit = {
               method: 'DELETE'
            }
      
            fetch('http://localhost:9005/api/' + id, requestInit)
            .then(res => res.text())
            .then(res => console.log(res))

            show_alerta('Cliente Eliminado', 'success')
            getCustomers();
         } else {
            show_alerta('El Cliente NO fue eliminado', 'info');
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

            {/* <span style="color: brown" id="txtInformacion"></span> */}

            <div className='table'>
               <table>
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>COMPAÑIA</th>
                        <th>CORREO</th>
                        <th>TELEFONO</th>
                        <th>ACCIONES</th>
                     </tr>
                  </thead>
                  <tbody id='listaCiudades'>
                     {
                        customers.map((cus) => (
                           <tr key={cus.idCustomers}>
                              <td>{cus.idCustomers}</td>
                              <td>{cus.name}</td>
                              <td>{cus.company}</td>
                              <td>{cus.email}</td>
                              <td>{cus.cellPhone}</td>
                              <td>
                                 <button onClick={() => openModal(2, cus.idCustomers, cus.name, cus.company, cus.email, cus.cellPhone)} className="btn btn-info">Editar</button>
                                 <button onClick={() => deleteCustomer(cus.idCustomers, cus.name)} className="btn btn-delete">Eliminar</button>
                              </td>
                           </tr>
                        ))
                     }
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
                           <label for="name" className="form-label">Nombre</label>
                           <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} tabindex="1"/>
                        </div>
                        <div className="mb-3">
                           <label for="company" className="form-label">Compañia</label>
                           <input type="text" className="form-control" id="company" name="company" value={company} onChange={(e) => setCompany(e.target.value)} tabindex="2"/>
                        </div>
                        <div className="mb-3">
                           <label for="email" class="form-label">Correo</label>
                           <input type="email" class="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} tabindex="3" />
                        </div>
                        <div className="mb-3">
                           <label for="cellPhone" className="form-label">Telefono</label>
                           <input type="tel" className="form-control" id="cellPhone" name="cellPhone" value={cellPhone} onChange={(e) => setCellPhone(e.target.value)} tabindex="4"/>
                        </div>
                        <button onClick={() => validar()} className="btn btn-primary" tabindex="6">{btnSubmit}</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
      
   )

   /*
   const [formCustomer, setFormCustomer] = useState({
      name: '',
      company: '',
      email: '',
      cell_phone: ''
   })

   const [customers, setCustomers] = useState([])

   const [listUpdated, setListUpdated] = useState(false)

   useEffect(() => {
      const getCustomers = () => {
         fetch('http://localhost:9000/api')
         .then(res => res.json())
         .then(res => setCustomers(res))
      }

      getCustomers();
      setListUpdated(false)

      const customer = document.getElementById("Clientes");
      customer.style.setProperty("transform", "translateY(0px)")
   }, [listUpdated])
   
   return(
      <div className="container">
         <HeaderController />

         <div className="container-table">
            <button name="newClient" id="newClient" className="btn-register" onClick={newClient}><span><FontAwesomeIcon icon={faCirclePlus} /></span></button>

            <CustomerTable formCustomer={formCustomer} customers={customers } setListUpdated={setListUpdated} />

            <FormNewCustomers formCustomer={formCustomer} setFormCustomer={setFormCustomer} />
         </div>
      </div>
      
   )
   */
}