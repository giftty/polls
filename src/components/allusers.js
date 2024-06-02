
export function Allusers(){
 return(
   <div className="container m-4 pt-3" style={{height:'90vh'}}>
   <div className="d-flex justify-content-between mt-2">
      <div class="d-flex  col-md-5 border bg-white" style={{borderRadius:"9px"}}>
                <input id="search_box" class="form-control border-0" type="text" name="search" placeholder="search" style={{backgroundColor: "#fff"}}/>
                <i class="ri-search-line mt-2" style={{marginLeft:"-25px"}}></i>
            </div>
            <div className="d-flex">
              Filter&nbsp;: <select className="ml-2 form-control">
                <option disabled>Filter users</option>
               </select>

            </div>
      </div>
    <table className="table mt-5">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
   </div>
 )
}