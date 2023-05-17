import { useEffect } from 'react'

const Main = () => {
    const fetchData = async () => {
        try {
            const response = await fetch('/api/v1')
            const data = await response.json()
            //console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchData()
    }, [])
    
    return <h1>Main Page</h1>
}

export default Main