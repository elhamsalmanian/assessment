
import getConfig  from 'next/config';
import axios from 'axios';

export default async function handler(req, res) {
    
    if (req.method === 'POST') {                
        return res.status(200).json({});
    } 
    else if (req.method === 'GET') {
                   
        let students = await axios.get(`https://api.hatchways.io/assessment/students` )
        .then( res => {   
            const data = res.data;
            return ([...data.students]) 
        })       
        .catch( (error) => {            
            console.log(error);
            return ([])   
        }); 
        
        
        return res.status(200).json(students);
    }
    
   
    
}