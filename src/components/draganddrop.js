
import React, { useEffect, useState } from "react";
const DragNdrop = ({
  onFilesSelected,
  width,
  height
}) => {
  const [files, setFiles] = useState([]);

  const toBase64 = (file,ele) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = () =>{
    console.log(file.type); 
    if(Math.round(file.size/1024) > 4096){
     alert('file should be less or equal to 4mb.')
     return 
    }
   if(file.type.indexOf('image')!= -1){
     ele.style.backgroundImage="url("+reader.result+")"
   }else{
     var videoEl = document.createElement('video')
     videoEl.src = reader.result
     videoEl.controls=true 
     videoEl.autoPlay=true 
     videoEl.muted=true 
     videoEl.style.width='115%'
     videoEl.style.position= 'relative'
     videoEl.style.marginTop='-100px'
     videoEl.style.marginLeft= '-27.6px'
     ele.appendChild(videoEl)
   } 
    setFiles([reader.result])
    };
    ele.style.height = "300px"
    // reader.onerror = reject;
};

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
     toBase64(selectedFiles[0], document.querySelector(".file-container"))
    }
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
     setFiles((prevFiles) => [...prevFiles, ...newFiles]);
     toBase64(droppedFiles[0], document.querySelector(".file-container"))
    }
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    onFilesSelected(files);
  }, [files, onFilesSelected]);

  return (
    <section className="drag-drop" >
      <div
        onClick={()=>{document.querySelector(".browse-btn").click()}}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <>
        <div  className = "file-container p-4" style={{overflow:'hidden'}}>
        <div  >
        <div >
        <svg  width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" class="f-white"><path _ngcontent-ng-c1379795305="" fill-rule="evenodd" clip-rule="evenodd" d="M24 3H8C5.23858 3 3 5.23858 3 8V22.4999V22.5001V24C3 26.7614 5.23858 29 8 29H21.9983H22.0019H24C26.7614 29 29 26.7614 29 24V8C29 5.23858 26.7614 3 24 3ZM22.4267 27H24C24.9814 27 25.8527 26.5288 26.4001 25.8002L26.3871 25.7903L26.2929 25.7071L20.953 20.368L18.2985 22.6922L22.4267 27ZM21.7071 18.2929L27 23.5858V8C27 6.34315 25.6569 5 24 5H8C6.34315 5 5 6.34315 5 8V20.0858L9.79289 15.2929C10.1588 14.927 10.7364 14.9047 11.1281 15.2218L11.222 15.3081L16.9134 21.247L20.3415 18.2474C20.7047 17.9296 21.2367 17.9199 21.6096 18.2072L21.7071 18.2929ZM5 22.9142V24C5 25.6569 6.34315 27 8 27H19.6567L10.485 17.429L5 22.9142ZM20 9C18.3431 9 17 10.3431 17 12C17 13.6569 18.3431 15 20 15C21.6569 15 23 13.6569 23 12C23 10.3431 21.6569 9 20 9ZM20 11C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13C19.4477 13 19 12.5523 19 12C19 11.4477 19.4477 11 20 11Z"></path></svg>
        <svg  width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="f-white"><path _ngcontent-ng-c1379795305="" fill-rule="evenodd" clip-rule="evenodd" d="M14.8646 2H5.38542C3.5157 2 2 3.5157 2 5.38542V14.8646C2 16.7343 3.5157 18.25 5.38542 18.25H14.8646C16.7343 18.25 18.25 16.7343 18.25 14.8646V5.38542C18.25 3.5157 16.7343 2 14.8646 2ZM5.38542 3.35417H14.8646C15.9864 3.35417 16.8958 4.26359 16.8958 5.38542V14.8646C16.8958 15.9864 15.9864 16.8958 14.8646 16.8958H5.38542C4.26359 16.8958 3.35417 15.9864 3.35417 14.8646V5.38542C3.35417 4.26359 4.26359 3.35417 5.38542 3.35417ZM8.18 9.4697H9.34155C9.19372 8.38694 8.25128 7.625 7.02901 7.625C5.60083 7.625 4.5 8.66766 4.5 10.4428C4.5 12.1753 5.52956 13.25 7.05277 13.25C8.41759 13.25 9.39171 12.3758 9.39171 10.9348V10.245H7.12933V11.1166H8.29088C8.27504 11.7956 7.81834 12.2261 7.05805 12.2261C6.20009 12.2261 5.65891 11.5764 5.65891 10.4322C5.65891 9.29325 6.22121 8.64894 7.04749 8.64894C7.63618 8.64894 8.03481 8.95639 8.18 9.4697ZM11.3116 7.69986H10.1686V13.1751H11.3116V7.69986ZM13.3134 13.1751H12.1703V7.69986H15.75V8.65429H13.3134V9.95895H15.5124V10.9134H13.3134V13.1751Z"></path></svg>
        <svg  width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="f-white"><path _ngcontent-ng-c1379795305="" fill-rule="evenodd" clip-rule="evenodd" d="M15.625 8.75C15.3356 5.9125 12.9113 3.75 10 3.75C7.51125 3.75 5.42875 5.2625 4.6875 7.5C2.73687 7.94375 1.25 9.79375 1.25 11.875C1.25 14.2937 3.20875 16.25 5.625 16.25H15C17.5 16.25 18.75 14.3562 18.75 12.5C18.75 10.6312 17.4131 9.03125 15.625 8.75ZM5.87408 7.8931C6.45137 6.15053 8.06812 5 10 5C12.271 5 14.1573 6.6784 14.3815 8.87682C14.439 9.44158 14.87 9.89661 15.4308 9.98482L15.5513 10.0071C16.6665 10.2438 17.5 11.2851 17.5 12.5C17.5 13.9387 16.5598 15 15 15H5.625L5.48937 14.9971C3.82551 14.9262 2.5 13.557 2.5 11.875C2.5 10.3899 3.57105 9.03592 4.96478 8.71886C5.39154 8.62177 5.73645 8.30856 5.87408 7.8931ZM9.55806 7.37056C9.78336 7.14526 10.1379 7.12792 10.3831 7.31857L10.4419 7.37056L12.6294 9.55806C12.8735 9.80214 12.8735 10.1979 12.6294 10.4419C12.4041 10.6672 12.0496 10.6846 11.8044 10.4939L11.7456 10.4419L10.625 9.3217V13.125C10.625 13.4702 10.3452 13.75 10 13.75C9.67948 13.75 9.41531 13.5087 9.3792 13.1979L9.375 13.125V9.3217L8.25444 10.4419C8.02914 10.6672 7.67462 10.6846 7.42944 10.4939L7.37056 10.4419C7.14526 10.2166 7.12792 9.86212 7.31857 9.61694L7.37056 9.55806L9.55806 7.37056Z"></path></svg>
        </div><div  class="small pr-4 mt-2">Select an image from your file or drag and drop image to the box.
        </div></div></div>
          <input
            type="file"
            hidden
            id="browse"
            onChange={handleFileChange}
            accept=".png,.jpg,.gif,.jpge,.mp4,.avi"
            // multiple
          />
          <label htmlFor="browse" className="browse-btn">
            Browse files
          </label>
        </>

        {files.length > 0 && (
          <div className="file-list">
            <div className="file-list__container">
              {files.map((file, index) => (
                <div className="file-item" key={index}>
                  <div className="file-info">
                    <p>{file.name}</p>
                    {/* <p>{file.type}</p> */}
                  </div>
                  <div className="file-actions">
                    <div onClick={() => handleRemoveFile(index)} ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {files.length > 0 && (
          <div className="success-file">
            <p>{files.length} file(s) selected</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DragNdrop;
