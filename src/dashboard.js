
export function Dashboard(){
 
 return(
    <div className="w-100 bg-light" style={{height:"90vh"}}>
     <div className="container p-5">
      <div className="d-flex justify-content-between mx-auto">
       <div className="row">
          <h2 className="medium-text px-3">My Polls</h2>
           <div className="px-3" style={{display: "flex",alignSelf: "baseline"}}>
                 <span class="notificatio_count font-weight-bold badge badge-success" > 1</span>
                &nbsp; Active 
               </div>
               <div style={{display: "flex",alignSelf: "baseline"}}>
                 <span class="notificatio_count font-weight-bold badge badge-danger" > 1</span>
               &nbsp;  Past 
               </div>
       </div>
       {/* row ends here */}

       <button className="btn p-2 primary-background text-white"><i class="ri-add-line"></i> Create poll</button>
      </div>
      {/* flex-div ends */}

      <div className="d-flex justify-content-between mt-5">
      <div class="d-flex  col-md-5 border bg-white" style={{borderRadius:"9px"}}>
                <input id="search_box" class="form-control border-0" type="text" name="search" placeholder="search" style={{backgroundColor: "#fff"}}/>
                <i class="ri-search-line mt-2" style={{marginLeft:"-25px"}}></i>
            </div>
            <div className="d-flex">
               <select className="form-control">
                <option disabled>Filter polls</option>
               </select>

               <div className="d-flex justify-content-center bg-white ml-1" style={{borderRadius:"9px"}}>
                 <button className="btn bg-white"> <i class="ri-dashboard-line"></i></button>
                  <button className="btn bg-secondary"> <i class="ri-file-list-line"></i></button>
               </div>
            </div>
      </div>
      {/* flex-div ends */}
     </div>
    </div>
 )

}