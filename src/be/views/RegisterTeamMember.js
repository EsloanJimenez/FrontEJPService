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
import { showHint } from '../../js/search'

export const RegisterTeamMember = () => {
   const url = 'http://localhost:9005/api/teamMember'

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

   const openModal = (op, id, photo, lastName, firstName, idCard, cellPhone, sex, cluster, bankName, bankAccountType, accountNumber, status) => {
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
      let parametros;

      if (lastName.trim() === '') show_alerta('Escribe el nombre del miembro de equipo', 'warning')
      else if (firstName.trim() === '') show_alerta('Escribe el apellido del miembro de equipo', 'warning')
      else if (idCard.trim() === '') show_alerta('Escribe el numero de cedula del miembro de equipo', 'warning')
      else if (cellPhone.trim() === '') show_alerta('Escribe el numero de telefono del Miembro De Equipo', 'warning')
      else {
         if (operation === 1) {
            parametros = { photo: photo.trim(), lastName: lastName, firstName: firstName, idCard: idCard, sex: sex, cellPhone: cellPhone, cluster: cluster, bankName: bankName, bankAccountType: bankAccountType, accountNumber: accountNumber, status: status };

            const requestInit = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(parametros)
            }

            fetch(`${url}`, requestInit)
               .then(res => res.text())
               .then(res => {

                  show_alerta('Miembro De Equipo Registrado', 'success');

                  if (res == 'success') {
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
            parametros = { idTeamMember: ids, photo: photo.trim(), lastName: lastName.trim(), idCard: idCard.trim(), sex: sex.trim(), cellPhone: cellPhone.trim(), cluster: cluster.trim(), bankName: bankName.trim(), bankAccountType: bankAccountType.trim(), accountNumber: accountNumber.trim(), status: status.trim() };

            const requestInit = {
               method: 'PUT',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(parametros)
            }

            fetch(`${url}Update/${ids}`, requestInit)
               .then(res => res.text())
               .then(res => {

                  show_alerta('Miembro De Equipo Actualizado', 'success');

                  if (res == 'success') {
                     document.querySelector('#photo').value = null;

                     setPhoto(null);

                     closeClient();
                     getRegisterTeamMember();
                  }
               })
         }
      }
   }

   const deleteCustomer = (id, lastName) => {
      const MySwal = withReactContent(Swal);

      MySwal.fire({
         title: `Seguro de eliminar el Miembro de equipo ${lastName}?`,
         icon: 'question', text: 'No se podra dar marcha a tras',
         showCancelButton: true, confirmButtonText: 'Si, eliminar', cancelButtonText: 'cancelar'
      }).then((result) => {
         if (result.isConfirmed) {
            const requestInit = {
               method: 'DELETE'
            }

            fetch(`${url}Delete/${id}`, requestInit)
               .then(res => res.text())
               .then(res => console.log(res))

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

               <div>
                  <input type="text" name="campo" id="campo" onChange={(e) => setSearch(e.target.value)} />
                  <button id='buscar' onClick={showHint} >Buscar</button>
               </div>
            </div>

            {/* <span style="color: brown" id="txtInformacion"></span> */}

            <div className='table'>
               <table>
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>FOTO</th>
                        <th>NOMBRE</th>
                        <th>APELLIDO</th>
                        <th>CEDULA</th>
                        <th>CELULAR</th>
                        <th>SEXO</th>
                        <th>GRUPO</th>
                        <th>NOMBRE BANCO</th>
                        <th>TIPO BANCO</th>
                        <th>NUMERO DE CUENTA</th>
                        <th>STATUS</th>
                        <th>ACCIONES</th>
                     </tr>
                  </thead>
                  <tbody id='teamMember'>
                     {
                        teamMember.map((tm, i) => (
                           <tr key={i}>
                              <td>{tm.idTeamMember}</td>
                              <td>{<img src={`http://localhost:9005/${tm.photo}`} alt="imagen rota" />}</td>
                              <td>{tm.lastName}</td>
                              <td>{tm.firstName}</td>
                              <td>{tm.idCard}</td>
                              <td><FontAwesomeIcon icon={faPhone} /><a target='_blank' href={`https://api.whatsapp.com/send?phone=1${tm.cellPhone}`}>{tm.cellPhone}</a></td>
                              <td>{tm.sex}</td>
                              <td>{tm.cluster}</td>
                              <td>{tm.bankName}</td>
                              <td>{tm.bankAccountType}</td>
                              <td>{tm.accountNumber}</td>
                              <td>{tm.status}</td>
                              <td>
                                 <button onClick={() => openModal(2, tm.idTeamMember, tm.photo, tm.lastName, tm.firstName, tm.idCard, tm.sex, tm.cellPhone, tm.cluster, tm.bankName, tm.bankAccountType, tm.accountNumber, tm.status)} className="btn btn-info">Editar</button>
                                 <button onClick={() => deleteCustomer(tm.idTeamMember, tm.lastName)} className="btn btn-delete">Eliminar</button>
                              </td>
                           </tr>
                        ))
                     }
                  </tbody>
               </table>
            </div>

            {/* REGISTRAR MIEMBRO DE EQUIPO  */}
            <div className="container-form hide_font">
               <div className="card">
                  <div className="card-header">
                     <span className='title'>{title}</span>
                     <button className='closeClient' onClick={closeClient}>X</button>
                  </div>
                  <div className="card-body">
                     <form action="http://localhost:9005/api/teamMember" method="post" enctype="multipart/form-data">
                        <div className="mb-3">
                           <label for="photo" className="form-label">Foto</label>
                           <input type="file" className="form-control" id="photo" name="photo" onChange={(e) => setPhoto(e.target.files[0].name)} />
                        </div>
                        <div className="mb-3">
                           <label for="lastName" className="form-label">Nombre</label>
                           <input type="text" className="form-control" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                           <label for="firstName" className="form-label">Apellido</label>
                           <input type="text" className="form-control" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                           <label for="idCard" className="form-label">Cedula</label>
                           <input type="text" className="form-control" id="idCard" name="idCard" value={idCard} onChange={(e) => setIdCard(e.target.value)} />
                        </div>
                        <div className="mb-3">
                           <label for="cellPhone" className="form-label">Celular</label>
                           <input type="number" className="form-control" id="cellPhone" name="cellPhone" value={cellPhone} onChange={(e) => setCellPhone(e.target.value)} />
                        </div>
                        <div className="mb-3">
                           <label for="sex" className="form-label">Sexo</label>
                           <select className="form-control" id='sex' name='sex' onChange={(e) => setSex(e.target.value)}>
                              <option value='null'>Seleccione el Sexo</option>
                              <option value='Masculino'>Masculino</option>
                              <option value='Femenino'>Femenino</option>
                           </select>
                        </div>
                        <div className="mb-3">
                           <label for="cluster" className="form-label">Grupo</label>
                           <select className="form-control" id='cluster' name='cluster' onChange={(e) => setCluster(e.target.value)}>
                              <option value="null">Seleccione El Grupo</option>
                              <option value="Grupo A" >Grupo A</option>
                              <option value="Grupo B">Grupo B</option>
                              <option value="Grupo C">Grupo C</option>
                              <option value="Grupo D">Grupo D</option>
                              <option value="Arroye">Arroye</option>
                              <option value="Cafeteria">Cafeteria</option>
                           </select>
                        </div>
                        <div className="mb-3">
                           <label for="bankName" className="form-label">Nombre Banco</label>
                           <select className="form-control" id='bankName' name='bankName' onChange={(e) => setBankName(e.target.value)}>
                              <option value="null">Seleccione El Nombre Del Banco</option>
                              <option value="No Tiene">No Tiene</option>
                              <option value="BHD Leon">BHD Leon</option>
                              <option value="Billet">Billet</option>
                              <option value="Banreservas">Banreservas</option>
                              <option value="Popular">Popular</option>
                              <option value="Asociacion Popular">Asociacion Popular</option>
                              <option value="Promerica">Promerica</option>
                           </select>
                        </div>
                        <div className="mb-3">
                           <label for="bankAccountType" className="form-label">Tipo De Cuenta</label>
                           <select className="form-control" id='bankAccountType' name='bankAccountType' onChange={(e) => setBankAccountType(e.target.value)}>
                              <option value="null">Seleccione El Tipo De Cuenta</option>
                              <option value="No Tiene">No Tiene</option>
                              <option value="Ahorro">Ahorro</option>
                              <option value="Corriente">Corriente</option>
                           </select>
                        </div>
                        <div className="mb-3">
                           <label for="accountNumber" className="form-label">Numero De Cuenta</label>
                           <input type="number" className="form-control" id="accountNumber" name="accountNumber" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                        </div>
                        <div className="mb-3">
                           <label for="status" className="form-label">Stado</label>
                           <select className="form-control" id='status' name='status' onChange={(e) => setStatus(e.target.value)}>
                              <option value='null'>Seleccione El Stado</option>
                              <option value='Activo'>Activo</option>
                              <option value='Inactivo'>Inactivo</option>
                           </select>
                        </div>
                        <button onClick={() => validate()} className="btn btn-primary">{btnSubmit}</button>

                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>

   )
}