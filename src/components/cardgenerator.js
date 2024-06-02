
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Papa from "papaparse";
import { useState } from "react";
function Cardcac({Description,FR_Code,Naira_price,Selling_Price}){
  return(
   <div className="col-4 mb-2">
      <div className=" d-flex" style={{height:"180px",width:"300px",marginBottom:'2px'}}>
     <img className="mt-4" src="images/Asset_4.png" style={{width:"auto",height:"70%"}}/>
       <div className="d-flex flex-column" style={{transform:'rotate(-90deg)'}}>
          <div className="text-center mt-3" style={{height:'40px'}}><span  className="barcodetext">{FR_Code}</span></div>
      <div className="text-center"><span style={{height:'20px',fontSize:'20px',fontWeight:'bolder'}}>{FR_Code} </span></div>
      <span className="pl-4" style={{height:'40px',fontSize:'9px',fontWeight:'bolder',padding:'4px',Overflow:'hidden'}}> {Description} </span>
       <div className="text-center"><span style={{height:'30px',fontSize:'14px',fontWeight:'bolder'}}>{Selling_Price??0.0} ESPEES</span></div>
       <div className="text-center"><span style={{height:'30px',fontSize:'14px',fontWeight:'bolder'}}>&#8358; {Naira_price}</span></div>
       </div>
      </div>
   </div>
  )
}
export function CardGenerator(){

    const [csvdata, setData] = useState([]); 
    const allowedExtensions = ["csv"];
    const [error, setError] = useState("");
    const [start,setstart]= useState(null)
    const [end,setend] = useState(null)
    const [file, setFile] = useState("");
     const handleFileChange = (e) => {
        setError("");
        if (e.target.files.length) {
            const inputFile = e.target.files[0];
            const fileExtension =
                inputFile?.name.split(".")[1];
                console.log(fileExtension)
            if (
                !allowedExtensions.includes(fileExtension)
            ) {
                setError("Please input a csv file");
                return;
            } 
            // If input type is correct set the state
            setFile(inputFile);
            handleParse(inputFile)
        }
    };
    const handleParse = (file) => { 
         console.log(file)
        if (!file) return alert("Enter a valid file");
        const reader = new FileReader();
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, {
                header: true,
            });
            const parsedData = csv?.data;
            console.log(parsedData)
            setData(parsedData)
            // const rows = Object.keys(parsedData[0]);
            // const columns = Object.values(parsedData[0]);
            // const res = rows.reduce((acc, e, i) => {
            //     return [...acc, [[e], columns[i]]];
            // }, []);
           // console.log(res);
           // setData(res);
        };
        reader.readAsText(file);
    };
function printDocument() {
  
    // const input = document.getElementById('divToPrint');
    // html2canvas(input,{
    //  width:1000,
    //  height:1000,
    //  windowWidth:900
    // })
    //   .then((canvas) => {
    //     const imgData = canvas.toDataURL('image/png');
    //     const pdf = new jsPDF();
    //     pdf.addImage(imgData, 'JPEG', 0, 0);
    //     // pdf.output('dataurlnewwindow');
    //     pdf.save("frcards.pdf");
    //   })
    ;
  }
 
  return(
    <>
     {/* <button onClick={printDocument} className="btn p-3">print</button> */}
    <div>
     <label htmlFor="csvInput" style={{ display: "block" }} >Enter CSV File</label> 
     <input onChange={handleFileChange} id="csvInput" name="file" type="File"/>
     <input placeholder="enter start" id="start" className="col-1" onChange={(event)=>{setstart(event.target.value)}}/>
     <input placeholder="enter end" id="end" className="col-1 mx-1" onChange={(event)=>{setend(event.target.value)}}/>
      <input type="button" className="btn btn-primary" value="hide buttons" onClick={(event)=>{document.querySelector('input').style.display='none';document.querySelector('label').style.display='none';event.target.parentElement.style.display='none'}}/>
    </div>
     
     <div className="text-center mt-2" style={{width:"1087px"}}>
      <div id="divToPrint" className="row p-0 m-0 align-self-center" style={{height:'100vh',overflow:'scroll'}}>
        {
        start != null || end !=null?
      csvdata.slice(start,end).map((e,i)=>{
        var randnum= Math.floor(200 + Math.random() * 90);
        return <Cardcac key={i} {...e}></Cardcac>
       })
       :
        csvdata.map((e,i)=>{
        var randnum= Math.floor(200 + Math.random() * 90);
        return <Cardcac key={i} {...e}></Cardcac>
       })
     }
    </div>
     </div>
    </>
     
   
  )
}

