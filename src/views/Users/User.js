import React, {useState,useEffect} from 'react'
import axios from "axios";
import Gallery from 'react-grid-gallery';
import apiFacade from "../../auth/apiFacade";
import PanelHeader from "../../components/PanelHeader/PanelHeader";
import {
        Row,
        Col,
        Button,
        Card,
        CardBody,
        CardHeader,
        CardTitle
      } from "reactstrap";


function User(props){

    const [isSelected, setIsSelected] = useState(false)
    const [custname, setCustname] = useState('')
    const [tester, setTester] = useState('')
    const [test, setTest] = useState(true)
    const [images, setImages] = useState("")
    const [loadedimages, setLoadedimages] = useState([])
    const [original, setOriginal] = useState("")

    const [feedback, setFeedback] = useState('')
    const [name, setName] = useState('Tony')
    const [email, setEmail] = useState('doganmiketuran@gmail.com')
  
    useEffect(() => {
      
        apiFacade.getData(
          `temppass/get/${props.match.params.id}`
          
          
        ).then(response => setLoadedimages(response.map((s, index )=> ({
                src: response[index].imageLink,
                originalFileName: response[index].originalFileName,
                custName: response[index].custName,
                custEmail: response[index].custEmail,
                tempPasswordId: response[index].tempPasswordId,
                thumbnail: response[index].imageLink,
                
                
                
        })))).catch(err => console.log("error!"));
        
        console.log(loadedimages)
       
    }, []);
console.log(loadedimages)
console.log
    

   
    const onSelectImage = (index, image) => {
         console.log(loadedimages[0].custName)   
      var images = loadedimages.slice();
      var img = images[index];
      if(!original == ""){
      setOriginal(original + ", " +img.originalFileName)
      }
      else{
          setOriginal(img.originalFileName)
      }
      // do something with image here   
      
      if(img.hasOwnProperty("isSelected")){
      setImages(images);
      img.isSelected = !img.isSelected;
      }
  else{
      img.isSelected = true;
      setImages(images)
  }
      
      
  }
  
 const sendFeedback = (templateId, variables) => {
	window.emailjs.send(
  	'gmail', templateId,
  	variables
  	).then(res => {
    	console.log('Email successfully sent!')
  	})
  	// Handle errors here however you like, or use a React error boundary
  	.catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
  }

   const submitHandler = async e => {

    e.preventDefault();
    const templateId = 'template_id';

	sendFeedback("template_h6b3jqo", {message: original, from_name: loadedimages[0].custName, cust_mail: loadedimages[0].custEmail, reply_to: email})
    console.log(original)
    setLoadedimages('')
    
   }


    return tester == '' ? (
     
        <div className="App">
                <PanelHeader size="sm" />
          <div>
           <div style={{
                    
                   display: "block",
                   minHeight: "1px",
                   width: "100%",
                   border: "1px solid #ddd",
                   overflow: "auto"}}>
                            
                <Gallery
            images={loadedimages}
            onSelectImage={onSelectImage}
            margin={2}
            rowHeight={180}
            
          
                />
                </div>
                <div style={
                        {display: "flex",
                         flexDirection: "flex-end",
                         alignItems: "flex-end",
                         position: "right",
                         justifyContent: "flex-end",
                         marginRight: "1%",
                         
                        
                        }
                        }>
             
                <Button onClick={submitHandler} style={{backgroundColor: "#4CAF50", fontSize: "15px"}}>Send</Button>
                </div>
                </div>
               
        </div>
      
        
    ) : ( <div>Could not find code</div>)
       
    

}
export default User