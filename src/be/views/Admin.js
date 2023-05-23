import { useState, useEffect } from "react"
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
import '../../css/animaciones.css'
import { ViewAdmin } from "../components/ViewAdmin"
import {Searcher} from "../components/Searcher"
import { RegisterAdmin } from "../components/RegisterAdmin"

export const Admin = () => {
   const url = 'http://localhost:9005/api/admin'

   const [admins, setAdmins] = useState([]);

   const [ids, setIds] = useState('');
   const [photo, setPhoto] = useState(null);
   const [userName, setUserName] = useState('');
   const [password, setPassword] = useState('');
   const [roll, setRoll] = useState('');
   const [title, setTitle] = useState([]);
   const [btnSubmit, setBtnSubmit] = useState('');
   const [operation, setOperation] = useState(1);

   const [search, setSearch] = useState();

   useEffect(() => {
      getAdmins();

      const admin = document.getElementById("RegistrarAdmin");
      admin.style.setProperty("transform", "translateY(0px)")
   }, []);

   const getAdmins = async () => {
      const res = await axios(url);
      setAdmins(res.data);
   }

   const openModal = (op, id, photo, userName, password, roll) => {
      const fund_new_client = document.querySelector(".container-form");
      fund_new_client.classList.remove('hide_font');

      setTimeout(() => {
         const fadeUp = document.querySelector('.card');
         fadeUp.classList.add('fade-Up');
      }, 100);

      setIds('');
      setPhoto(null);
      setUserName('');
      setPassword('');
      setRoll('');
      setOperation(op);

      if (op === 1) {
         setTitle('Registrar Administrador');
         setBtnSubmit('Registrar');
      }
      else if (op === 2) {
         setTitle('Editar Administrador');
         setBtnSubmit('Actualizar');
         setIds(id);
         setPhoto(photo);
         setUserName(userName);
         setPassword(password);
         setRoll(roll);
      }
   }

   const validate = async () => {
      let parameters;

      const bcryptjs = require('bcryptjs');

      const verifyPassword = document.querySelector('#verifyPassword').value;
      let passwordHash = await bcryptjs.hash(password, 8);

      let compare = bcryptjs.compareSync(verifyPassword, passwordHash);

      if (userName.trim() === '') show_alerta('Escribe el nombre de usuario del administrador', 'warning')
      else if (password.trim() === '') show_alerta('Escribe la contraseña del administrador', 'warning')
      else if (roll.trim() === '') show_alerta('Selecione el roll del adminsitrador', 'warning')
      else if (verifyPassword.trim() === '') show_alerta('Escribe la verificacion de la contraseña del administrador', 'warning')
      else {
         if (compare) {
            if (operation === 1) {
               parameters = { photo: photo.trim(), userName: userName.trim(), password: passwordHash.trim(), roll: roll.trim() };

               const requestInit = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(parameters)
               }

               fetch(url, requestInit)
                  .then(res => res.text())
                  .then(res => {

                     show_alerta('Administrador Registrado', 'success');

                     if (res === 'success') {
                        document.querySelector('#photo').value = null;

                        setPhoto(null);

                        closeClient();
                        getAdmins();
                     }
                  })

            } else if (operation === 2) {
               parameters = { idAdmin: ids, photo: photo.trim(), userName: userName.trim(), password: passwordHash.trim(), roll: roll.trim() };

               const requestInit = {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(parameters)
               }

               fetch('http://localhost:9005/api/updateAdmin/' + ids, requestInit)
                  .then(res => res.text())
                  .then(res => {

                     show_alerta('Administrador Actualizado', 'success');
                     if (res === 'admin updated!') {
                        document.querySelector('#photo').value = null;

                        setPhoto(null);

                        closeClient();
                        getAdmins();
                     }
                  })
            }
         } else {
            show_alerta('Los campos de la contraseña no son iguales', 'warning');
         }
      }
   }

   const deleteAdmin = (id, name) => {
      const MySwal = withReactContent(Swal);

      MySwal.fire({
         title: `Seguro de eliminar el administrador ${name}?`,
         icon: 'question', text: 'No se podra dar marcha a tras',
         showCancelButton: true, confirmButtonText: 'Si, eliminar', cancelButtonText: 'cancelar'
      }).then((result) => {
         if (result.isConfirmed) {
            const requestInit = {
               method: 'DELETE'
            }

            fetch('http://localhost:9005/api/deleteAdmin/' + id, requestInit)
               .then(res => res.text())
               .then(res => console.log(res))

            show_alerta('Administrador Eliminado', 'success')
            getAdmins();
         } else {
            show_alerta('El Administrador NO fue eliminado', 'info');
         }
      });
   }

   return (
      <div className="container">
         <HeaderController />

         <div className="container-table">
            <div className='header'>
               <button name="newClient" id="addRegister" className="btn-primary" onClick={() => openModal(1)}><span><FontAwesomeIcon icon={faCirclePlus} /></span></button>
            
               <Searcher
                  holder="Buscar Por Nombre"
                  setSearch={setSearch}
               />
            </div>

            <ViewAdmin
               search={search}
               admins={admins}
               openModal={openModal}
               deleteAdmin={deleteAdmin}
            />

            <RegisterAdmin
               title={title}
               closeClient={closeClient}
               setPhoto={setPhoto}
               userName={userName}
               setUserName={setUserName}
               password={password}
               setPassword={setPassword}
               roll={roll}
               setRoll={setRoll}
               validate={validate}
               btnSubmit={btnSubmit}
            />
            
         </div>
      </div>
   )
}