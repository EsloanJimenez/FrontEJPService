import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faPhone } from "@fortawesome/free-solid-svg-icons"

import { HeaderController } from "../components/HeaderController"
import { closeClient } from '../../js/RegistrationForm'
import { show_alerta } from '../../js/Function'

import '../../css/register.css'
import '../../css/buttons.css'

import { ViewTeamMemberTable } from '../components/ViewTeamMemberTable'
import { Searcher } from '../components/Searcher'
import { RegisterTeamMemberForm } from '../components/RegisterTeamMemberForm'

export const RegisterTeamMember = () => {
   const url = 'https://apiejpservice.onrender.com/api/teamMember'

   const [teamMember, setTeamMember] = useState([]);
   const [ids, setIds] = useState('');
   const [photo, setPhoto] = useState(null);
   const [lastName, setLastName] = useState();
   const [firstName, setFirstName] = useState();
   const [idCard, setIdCard] = useState();
   const [cellPhone, setCellPhone] = useState();
   const [sex, setSex] = useState();
   const [cluster, setCluster] = useState();
   const [bankName, setBankName] = useState();
   const [bankAccountType, setBankAccountType] = useState();
   const [accountNumber, setAccountNumber] = useState();
   const [status, setStatus] = useState();
   const [title, setTitle] = useState([]);
   const [btnSubmit, setBtnSubmit] = useState('');
   const [operation, setOperation] = useState(1);

   const [search, setSearch] = useState('');

   useEffect(() => {
      getRegisterTeamMember();

      const teamMember = document.getElementById("TeamMember");
      teamMember.style.setProperty("transform", "translateY(0px)")
   }, []);

   const getRegisterTeamMember = async () => {
      const res = await axios.get(url);
      setTeamMember(res.data);
   }

   const openModal = (op, id, photo, lastName, firstName, idCard, sex, cellPhone, cluster, bankName, bankAccountType, accountNumber, status) => {
      const fund_new_client = document.querySelector(".container-form");
      fund_new_client.classList.remove('hide_font');

      setIds('');
      setPhoto(null);
      setLastName('');
      setFirstName('');
      setIdCard();
      setCellPhone();
      setSex();
      setCluster();
      setBankName();
      setBankAccountType();
      setAccountNumber();
      setStatus();
      setOperation(op);

      if (op === 1) {
         setTitle('Registrar Miembro De Equipo');
         setBtnSubmit('Registrar');
      }
      else if (op === 2) {
         setTitle('Editar Miembro De Equipo');
         setBtnSubmit('Actualizar');
         setIds(id);
         setPhoto(photo);
         setLastName(lastName);
         setFirstName(firstName);
         setIdCard(idCard);
         setCellPhone(cellPhone);
         setSex(sex);
         setCluster(cluster);
         setBankName(bankName)
         setBankAccountType(bankAccountType);
         setAccountNumber(accountNumber);
         setStatus(status);
      }

      window.setTimeout(() => {
         document.getElementById('name').focus();
      }, 500)
   }

   const validate = () => {
      if (lastName.trim() === '') show_alerta('Escribe el nombre del miembro de equipo', 'warning')
      else if (firstName.trim() === '') show_alerta('Escribe el apellido del miembro de equipo', 'warning')
      else if (idCard.trim() === '') show_alerta('Escribe el numero de cedula del miembro de equipo', 'warning')
      else if (cellPhone.trim() === '') show_alerta('Escribe el numero de telefono del Miembro De Equipo', 'warning')
      else {
         if (operation === 1) {
            axios.post(`${url}`, {
               photo: photo.trim(), 
               lastName: lastName, 
               firstName: firstName, 
               idCard: idCard, 
               sex: sex, 
               cellPhone: cellPhone,
               cluster: cluster, 
               bankName: bankName, 
               bankAccountType: bankAccountType,
               accountNumber: accountNumber,
               status: status
            }).then(res => {

               show_alerta('Miembro De Equipo Registrado', 'success');

               if (res.data === 'success') {
                  document.querySelector('#photo').value = null;

                  setPhoto(null);
                  setLastName('');
                  setFirstName('');
                  setIdCard('');
                  setCellPhone('');
                  setAccountNumber('');

                  getRegisterTeamMember();
                  closeClient();
               }
            })

         } else if (operation === 2) {
            axios.put(`${url}`, {
               idTeamMember: ids, 
               photo: photo.trim(), 
               lastName: lastName.trim(), 
               idCard: idCard.trim(), 
               sex: sex.trim(), 
               cellPhone: cellPhone.trim(), 
               cluster: cluster.trim(), 
               bankName: bankName.trim(), 
               bankAccountType: bankAccountType.trim(), 
               accountNumber: accountNumber.trim(), 
               status: status.trim()
            }).then(res => {

               show_alerta('Miembro De Equipo Actualizado', 'success');

               if (res.data === 'success') {
                  document.querySelector('#photo').value = null;

                  setPhoto(null);

                  closeClient();
                  getRegisterTeamMember();
               }
            })
         }
      }
   }

   const deleteTeamMember = (id, lastName) => {
      const MySwal = withReactContent(Swal);

      MySwal.fire({
         title: `Seguro de eliminar el Miembro de equipo ${lastName}?`,
         icon: 'question', text: 'No se podra dar marcha a tras',
         showCancelButton: true, confirmButtonText: 'Si, eliminar', cancelButtonText: 'cancelar'
      }).then((result) => {
         if (result.isConfirmed) {
            axios.detele(`${url}Delete/${id}`);

            show_alerta('Miembro De Equipo Eliminado', 'success')
            getRegisterTeamMember();
         } else {
            show_alerta('El Miembro De Equipo NO fue eliminado', 'info');
         }
      });
   }

   return (
      <div className="container">
         <HeaderController />

         <div className="container-table">
            <div className='header'>
               <button name="addRegister" id="addRegister" className="btn-primary" onClick={() => openModal(1)}><span><FontAwesomeIcon icon={faCirclePlus} /></span></button>

               <Searcher
                  holder='Buscar Por Nombre'
                  setSearch={setSearch}
               />
            </div>

            <ViewTeamMemberTable
               search={search}
               teamMember={teamMember}
               openModal={openModal}
               deleteTeamMember={deleteTeamMember}
               FontAwesomeIcon={FontAwesomeIcon}
               faPhone={faPhone}
            />

            <RegisterTeamMemberForm
               title={title}
               closeClient={closeClient}
               setPhoto={setPhoto}
               lastName={lastName}
               setLastName={setLastName}
               firstName={firstName}
               setFirstName={setFirstName}
               idCard={idCard}
               setIdCard={setIdCard}
               cellPhone={cellPhone}
               setCellPhone={setCellPhone}
               sex={sex}
               setSex={setSex}
               cluster={cluster}
               setCluster={setCluster}
               bankName={bankName}
               setBankName={setBankName}
               bankAccountType={bankAccountType}
               setBankAccountType={setBankAccountType}
               accountNumber={accountNumber}
               setAccountNumber={setAccountNumber}
               status={status}
               setStatus={setStatus}
               validate={validate}
               btnSubmit={btnSubmit}
            />
            
         </div>
      </div>

   )
}