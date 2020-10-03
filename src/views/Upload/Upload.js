import React, {useState, useCallback} from 'react'
import axios from "axios";
import PanelHeader from "../../components/PanelHeader/PanelHeader";

function Upload(){
    const [tal, setTal] = useState('')
    const [files, setFiles] = useState('')
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState('true')
    const [custname, setCustname] = useState('')
    const [custemail, setCustemail] = useState('')
    const [tempcode, setTempcode] = useState('')
    
    const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken") + ""}`
        }
      };

   const submitHandler = async e => {
    e.preventDefault();
    const data = new FormData()
   
    const temp_passres = await axios.post(
        "https://localhost:5001/api/temppass",
        {
          custname: custname,
          custemail: custemail
          
        },
        config
      ); 
      console.log(temp_passres.data.id)

      setTempcode(temp_passres.data.tempPassword)
      
        for (var i=0; i < files.length; i++) {
            data.append('file', files[i])
            data.append('upload_preset', 'dmtdmtdmt')
           
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dqacelyhg/image/upload',
            {method: 'POST',
        body: data}
        )
      
       
        let file = await res.json();
        console.log(file)
            console.log(file.secure_url)
        setImage(file.secure_url)
        await axios.post(
            "https://localhost:5001/api/imagetemppass",
            {
            imagelink: file.secure_url,
            originalfilename: file.original_filename +"."+ file.format,
            temppasswordid: temp_passres.data.id,
                
              
            },
            config
            
          );    

        }
       
       console.log(tal)
       
        setLoading(false)
    
    
   }
console.log(tal)
    const uploadImage = async e => {
        setLoading(true)
        setFiles(e.target.files)
        
       
        
        
        
        console.log(files, 2222)
        
        
    }

    return(
        <div className="App">
             <PanelHeader size="sm" />
            <h1>Upload image</h1>
            <input type="file" name="file" multiple="multiple" onChange={uploadImage} />
            <input type="text" value={custname} placeholder="Customer Name" onChange={e => setCustname(e.target.value)} />
            <input type="text" value={custemail} placeholder="Customer E-mail" onChange={e => setCustemail(e.target.value)} />
            <input style={{width:"300px"}} type="text" value={tempcode} readOnly />
            <button onClick={submitHandler}>Upload</button>
            {loading ? (
                <h3></h3>
            ):(
                <h3>Loaded</h3>
            )}
        </div>
    )
}
export default Upload