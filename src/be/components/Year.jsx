import '../../css/Year.css'

export const Year = ({title}) => {
   return(
      <article>
         <Link to={`/be/views/sales${title}`} title={`Sales ${title}`}>
            <span>{title}</span>
         </Link>
      </article>
   )
}