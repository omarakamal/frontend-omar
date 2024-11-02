import {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateBookPage() {

    const [title,setTitle] = useState('')
    const [author,setAuthor] = useState(null)
    const [genre,setGenre] = useState('')
    const [pageNumbers,setPageNumbers] = useState(0)

    const [allAuthors,setAllAuthors] = useState([])
    const [allGenres,setAllGenres] = useState([])

    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/books`,{title,author,genre,pageNumbers})
        .then((createdBook)=>{
            console.log(createdBook)
            navigate('/books')
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/authors`)
        .then((fetchedAuthors)=>{
            setAllAuthors(fetchedAuthors.data)
        })

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/genres`)
        .then((fetchedGenres)=>{
            setAllGenres(fetchedGenres.data)
        })
    },[])
  return (
    <div>
      
      <form onSubmit={handleSubmit}>

        <label>
            Title:
            <input type="text" onChange={(e)=>{setTitle(e.target.value)}} />
        </label>

        <label>
            Author:
            <select onChange={(e)=>{setAuthor(e.target.value)}}>
            <option value={null}>Select Author</option>

                {allAuthors.map((author)=>{
                    return(
                        <option key={`${author._id}`} value={`${author._id}`}>{author.name}</option>

                    )
                })}
          

            </select>
        </label>

        <label>
            Genre:
            <select onChange={(e)=>{setGenre(e.target.value)}}>
            <option value={null}>Select Genre</option>

                {allGenres.map((genre)=>{
                    return(
                        <option key={`${genre._id}`} value={`${genre._id}`}>{genre.name}</option>

                    )
                })}
          

            </select>
        </label>
        <label>
            Number Of Pages:
            <input type="number" onChange={(e)=>{setPageNumbers(e.target.value)}} />
        </label>
        
        <button>Create Book</button>
      </form>
    </div>
  )
}

export default CreateBookPage
