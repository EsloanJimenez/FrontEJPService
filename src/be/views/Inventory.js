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

import { TotalSales } from '../components/TotalSales'
import { TotalSales2024 } from '../components/TotalSales2024'
import { TotalBill } from '../components/TotalBill'
import { TotalPaymentWaiter } from '../components/TotalPaymentWaiter'
import { Activos } from '../components/Activos'
import { ViewProductTable } from '../components/ViewProductTable'
import { Searcher } from '../components/Searcher'
import { RegisterProduct } from '../components/RegisterProduct'

export const Inventory = () => {
   const url = 'https://apiejpservice.onrender.com/api/'
   
   const [salesTotal, setSalesTotal] = useState([]);
   const [salesTotal2024, setSalesTotal2024] = useState([]);
   const [paymentWaiter, setPaymentWaiter] = useState([]);
   const [paymentWaiter2024, setPaymentWaiter2024] = useState([]);
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

      const st2024 = await axios(`${url}salesTotal2024`);
      setSalesTotal2024(st2024.data);

      const pw = await axios(`${url}payWaiter`);
      setPaymentWaiter(pw.data);

      const pw2024 = await axios(`${url}payWaiter2024`);
      setPaymentWaiter2024(pw2024.data);
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

   const validate = () => {
      if(product.trim() === '') show_alerta('Escribe el nombre del cliente', 'warning')
      else if(date.trim() === '') show_alerta('Seleccione la fecha', 'warning')
      else {
         if(operation === 1) {
            axios.post(`${url}inventory`, {
               product: product.trim(),
               date:date.trim(),
               time: time.trim(),
               amount: amount.trim(), 
               price: price.trim()
            }).then(res => {
               
               show_alerta('Producto Registrado', 'success');
   
               if(res.data === 'success') {
                  getInventory();
                  closeClient();
               }
            })

         } else if(operation === 2) {
            axios.put(`${url}inventoryUpdate/${ids}`, {
               idInventory:ids, 
               product:product.trim(),
               date:date.trim(),
               time: time.trim(),
               amount: amount.trim(),
               price: price.trim()
            }).then(res => {
            
               show_alerta('Cliente Actualizado', 'success');
   
               if(res.data === 'customer updated!') {
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
            axios.delete(`${url}inventoryDelete/${id}`);

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

               <Searcher
                  holder='Buscar Por Producto'
                  setSearch={setSearch}
               />
            </div>

            <div className='container accounting'>
               <TotalSales totalS={salesTotal} />
               <TotalPaymentWaiter totalPW={paymentWaiter} />
               <TotalBill totalB={billTotal} />
               <Activos 
                  totalS={salesTotal}
                  totalPW={paymentWaiter}
                  totalB={billTotal}
               /> 

               
               <TotalSales2024 totalS2024={salesTotal2024} />
               <TotalPaymentWaiter totalPW={paymentWaiter2024} />
               <TotalBill totalB={billTotal} />
               <Activos 
                  totalS={salesTotal2024}
                  totalPW={paymentWaiter}
                  totalB={billTotal}
               /> 
            </div>

            <ViewProductTable
               search={search}
               inventory={inventory}
               openModal={openModal}
               deleteInventory={deleteInventory}
               valuePrice={valuePrice}
               valueSubTotal={valueSubTotal}
            />

            {/* REGISTRAR PRODUCTO  */}
            <RegisterProduct
               title={title}
               closeClient={closeClient}
               product={product}
               setProduct={setProduct}
               setDate={setDate}
               time={time}
               setTime={setTime}
               amount={amount}
               price={price}
               setPrice={setPrice}
               validate={validate}
               btnSubmit={btnSubmit}
            />
         </div>
      </div>
      
   )
}