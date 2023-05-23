import { useState, useEffect, useRef } from 'react'
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
import { showHint } from '../../js/search'
import { Searcher } from '../components/Searcher'
import { ViewCustomerTable } from '../components/ViewCustomerTable'
import { RegisterCustomer } from '../components/RegisterCustomer'

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

      if (op === 1) {
         setTitle('Registrar Cliente');
         setBtnSubmit('Registrar');
      }
      else if (op === 2) {
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

   const validate = () => {
      let parametros;

      if (name.trim() === '') show_alerta('Escribe el nombre del cliente', 'warning')
      else if (cellPhone.trim() === '') show_alerta('Escribe el numero de telefono del cliente', 'warning')
      else {
         if (operation === 1) {
            parametros = { name: name.trim(), company: company.trim(), email: email.trim(), cellPhone: cellPhone.trim() };

            const requestInit = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(parametros)
            }

            fetch(url, requestInit)
               .then(res => res.text())
               .then(res => {

                  show_alerta('Cliente Registrado', 'success');

                  if (res == 'success') {
                     getCustomers();
                     closeClient();
                  }
               })

         } else if (operation === 2) {
            parametros = { id_customers: ids, name: name.trim(), company: company.trim(), email: email.trim(), cellPhone: cellPhone.trim() };

            const requestInit = {
               method: 'PUT',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(parametros)
            }

            fetch(`${url}Update/${ids}`, requestInit)
               .then(res => res.text())
               .then(res => {
                  let msj = 'Cliente Actualizado';

                  show_alerta(msj, 'success');

                  if (res == 'customer updated!') {
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
         if (result.isConfirmed) {
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

   return (
      <div className="container">
         <HeaderController />

         <div className="container-table">
            <div className='header'>
               <button name="addRegister" id="addRegister" className="btn-register" onClick={() => openModal(1)}><span><FontAwesomeIcon icon={faCirclePlus} /></span></button>

               <Searcher
                  holder='Buscar Por Nombre'
                  setSearch={setSearch}
               />
            </div>

            <ViewCustomerTable
               search={search}
               customers={customers}
               openModal={openModal}
               deleteCustomer={deleteCustomer}
            />

            {/* REGISTRAR CLIENTE  */}
            <RegisterCustomer
               title={title}
               closeClient={closeClient}
               name={name}
               setName={setName}
               company={company}
               setCompany={setCompany}
               email={email}
               setEmail={setEmail}
               cellPhone={cellPhone}
               setCellPhone={setCellPhone}
               validate={validate}
               btnSubmit={btnSubmit}
            />
         </div>
      </div>

   )
}