import { useState } from 'react'
import { closeClient } from '../../js/RegistrationForm'

const FormNewCustomers = ({formCustomer, setFormCustomer}) => {
   const handleChange = (e) => {
      setFormCustomer({
         ... formCustomer,
         [e.target.name]: e.target.value
      })
   }

   let {name, company, email, cell_phone} = formCustomer

   const handleSubmit = () => {
      if(name == '' || company == '' || email == '' || cell_phone == '') return alert('Todos los campos son requeridos');

      const requestInit = {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(formCustomer)
      }

      fetch('http://localhost:9000/api', requestInit)
      .then(res => res.text())
      .then(res => console.log(res))

      useState({
         name: '',
         company: '',
         email: '',
         cell_phone: ''
      })
   }

   return(
      <div className="container-form hide_font">
         <div className="card">
            <div className="card-header">
               <span className='title'>Nuevo Cliente</span>
               <button className='closeClient' onClick={closeClient}>X</button>
            </div>
            <div className="card-body">
               <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                     <label for="name" className="form-label">Nombre</label>
                     <input onChange={handleChange} type="text" className="form-control" id="name" name="name" value={name} tabindex="1"/>
                  </div>
                  <div className="mb-3">
                     <label for="company" className="form-label">Compañia</label>
                     <input onChange={handleChange} type="text" className="form-control" id="company" name="company" value={company} tabindex="2"/>
                  </div>
                  <div className="mb-3">
                     <label for="email" class="form-label">Correo</label>
                     <input onChange={handleChange} type="email" class="form-control" id="email" name="email" value={email} tabindex="3" />
                  </div>
                  <div className="mb-3">
                     <label for="cell_phone" className="form-label">Telefono</label>
                     <input onChange={handleChange} type="cell_phone" className="form-control" id="cell_phone" name="cell_phone" value={cell_phone} tabindex="4"/>
                  </div>
                  <button type="submit" className="btn btn-primary" tabindex="6">Registrar</button>
               </form>
            </div>
         </div>
      </div>
   )
}

export default FormNewCustomers;