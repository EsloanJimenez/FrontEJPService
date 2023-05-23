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
import { ViewBillTable } from '../components/ViewBillTable'
import { Searcher } from '../components/Searcher'
import { RegisterBill } from '../components/RegisterBill'

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

   const validate = () => {
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

               <Searcher
                  holder='Buscar Por Descripcion'
                  setSearch={setSearch}
               />
            </div>

            <ViewBillTable
               search={search}
               bill={bill}
               openModal={openModal}
               deleteBill={deleteBill}
            />

            <RegisterBill
               title={title}
               closeClient={closeClient}
               description={description}
               setDescription={setDescription}
               setDate={setDate}
               amount={amount}
               setAmount={setAmount}
               price={price}
               setPrice={setPrice}
               validate={validate}
               btnSubmit={btnSubmit}
            />
         </div>
      </div>
      
   )
}