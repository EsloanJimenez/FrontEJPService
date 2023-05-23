export const ViewTeamMemberTable = ({ search, teamMember, openModal, deleteTeamMember, FontAwesomeIcon, faPhone }) => {
   const result = teamMember.filter(value => value.lastName.toLowerCase().includes(search)).map((reg, i) =>
      <tr key={i}>
         <td>{reg.idTeamMember}</td>
         <td>{<img src={`http://localhost:9005/${reg.photo}`} alt="imagen rota" />}</td>
         <td>{reg.lastName}</td>
         <td>{reg.firstName}</td>
         <td>{reg.idCard}</td>
         <td><FontAwesomeIcon icon={faPhone} /><a target='_blank' href={`https://api.whatsapp.com/send?phone=1${reg.cellPhone}`}>{reg.cellPhone}</a></td>
         <td>{reg.sex}</td>
         <td>{reg.cluster}</td>
         <td>{reg.bankName}</td>
         <td>{reg.bankAccountType}</td>
         <td>{reg.accountNumber}</td>
         <td>{reg.status}</td>
         <td>
            <button onClick={() => openModal(2, reg.idTeamMember, reg.photo, reg.lastName, reg.firstName, reg.idCard, reg.sex, reg.cellPhone, reg.cluster, reg.bankName, reg.bankAccountType, reg.accountNumber, reg.status)} className="btn btn-info">Editar</button>
            <button onClick={() => deleteTeamMember(reg.idTeamMember, reg.lastName)} className="btn btn-delete">Eliminar</button>
         </td>
      </tr>
   )

   return (
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
                  result
               }
            </tbody>
         </table>
      </div>
   )
}