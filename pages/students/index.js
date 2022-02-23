
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BsPlusCircleDotted, BsDashCircleDotted } from 'react-icons/bs'

const students = ({ data }) => {
    const searchRef = useRef(null)
    const [students, setStudents] = useState([])
    const [query, setQuery] = useState({name:'', tag:''})
    
    
    const search_handle_name = (e) => {
        const name = e.target.value;
        setQuery({...query, name})
    }

    const search_handle_tag = (e) => {
        const tag = e.target.value;
        setQuery({...query, tag})
    }

    const addTags = (e, id) => {      
        const {value} = e.target;
        
        if (e.key === 'Enter') {            
            let temp_students = students.map(x => (x.id === id ? { ...x, tags: [...x.tags, value] } : x));
            setStudents(temp_students)    
            e.target.value = '' 
        }
    }

    const togglePanel = (e,id, flag) =>{
        e.preventDefault();
        let temp_students = students.map(x => (x.id === id ? { ...x, open: flag } : x));
        setStudents(temp_students)      
    }

    useEffect(() => {
        setStudents(() => data.filter(i => i.firstName.toLowerCase().includes(query.name) || i.lastName.toLowerCase().includes(query.name) || i.tags.includes(query.tag)))
    },[query]);

    return <div>
        <div className="bg-gray-100 w-1/2 rounded px-6 m-auto">
            <div className="border-l-4 border-pink-400 -ml-6 p-3 flex items-center justify-between my-4">                
                <input ref={searchRef} type="text" className="w-[300px] p-1" placeholder='Search by name' onChange={search_handle_name} />
            </div>
            <div className="border-l-4 border-green-400 -ml-6 p-3 flex items-center justify-between my-4">                
                <input ref={searchRef} type="text" className="w-[300px] p-1" placeholder='Search by tag' onChange={search_handle_tag} />
            </div>
            <hr className="-mx-6" />
            <div className="accordion accordion-flush " id="accordionFlushExample">
            {
                students.map((student, index) => {
                    return (
                        
                            <div key={student.id} className="accordion-item border-t-0 border-l-0 border-r-0 rounded-none bg-white border border-gray-200 my-4 p-4">
                               
                                <div className="accordion-collapse border-0 collapse show" >
                                    <div className=" flex items-top justify-between my-4" >
                                        <div className="w-32 ">
                                            <img className=" rounded-full w-24  m-2 mt-0 shadow-lg" src={student.pic} />
                                        </div>
                                        <div className="flex-1 pl-2">
                                            <div className="text-gray-700 text-xl font-bold  py-2 flex justify-between">
                                                <span>
                                                    {student.firstName}&nbsp;&nbsp;&nbsp;{student.lastName}
                                                </span>
                                                <span> 
                                                    {
                                                        student.open == false 
                                                            ? <BsPlusCircleDotted className='text-3xl hover:cursor-pointer' onClick={(e) => togglePanel(e,student.id, true)} />
                                                            : <BsDashCircleDotted className='text-3xl hover:cursor-pointer' onClick={(e) => togglePanel(e,student.id, false)} />                                                        
                                                    }
                                                </span>
                                            </div>
                                            <div className="text-gray-600 font-thin">
                                                <span className="text-gray-500">Email : </span>
                                                <span className="text-black font-semibold">{student.email}</span>
                                            </div>
                                            <div className="text-gray-600 font-thin">
                                                <span className="text-gray-500">Company : </span>
                                                <span className="text-black font-semibold">{student.company}</span>
                                            </div>
                                            <div className="text-gray-600 font-thin">
                                                <span className="text-gray-500">Skill : </span>
                                                <span className="text-black font-semibold">{student.skill}</span>
                                            </div>
                                            <div className="text-gray-600 font-thin">
                                                <span className="text-gray-500">Average : </span>
                                                <span className="text-black font-semibold">
                                                    {
                                                        student.grades &&
                                                        student.grades.length &&
                                                        (student.grades.map(function (i) {
                                                            return /^\d+$/.test(i) ? parseInt(i) : 0;
                                                        }).reduce((a, b) => a + b, 0)) / (student.grades.length)
                                                    }
                                                    <span className='mx-1 text-gray-600'>%</span>
                                                </span>
                                            </div>
                                            student.open: {student.open == true ? 'true' : 'false' }
                                            <div className={` transition duration-1000 ease-in-out  
                                                              ${student.open == true 
                                                                ? 'h-auto opacity-100 ' 
                                                                : 'h-0 overflow-hidden opacity-0   '
                                                                }
                                                           `}>                                                
                                                {student.grades.map( (grade, index) => {
                                                    return(
                                                        <div className='pl-5' key={index} >
                                                            <span className='text-sm text-gray-500'>test {index + 1} : </span>
                                                            <span className='text-sm text-black font-semibold'>{grade}</span>
                                                        </div>                                                                                                              
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className=" flex flex-row mt-2">                                                
                                                {student.tags.map( (tag, index) => {
                                                    return(
                                                        <div className='p-2 mr-2 bg-gray-300' key={index} >
                                                            {tag}
                                                        </div>                                                                                                              
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className='text-pink-600 font-thin py-3  '>
                                                <input type="text"  placeholder='Enter Tag'  onKeyDown={ (e) => addTags(e, student.id)} />
                                            </div>
                                        </div>                                       
                                    </div>

                                </div>
                            </div>
                        

                    )
                })
            }
            </div>
        </div>
    </div>;
};

export async function getServerSideProps(context) {
    const res = await axios.get(`http://localhost:3000/api/students`);

    const data = res.data.length > 0 && res.data.map(obj => ({ ...obj, open: false, tags:[] }))  ;

    return {
        props: { data },
    }
}

export default students;
