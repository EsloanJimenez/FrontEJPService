export const Searcher = ({holder, setSearch}) => {
   return (
      <div>
         <input type="text" name="campo" id="campo" onChange={(e) => setSearch(e.target.value)} placeholder={holder} />
      </div>
   )
}