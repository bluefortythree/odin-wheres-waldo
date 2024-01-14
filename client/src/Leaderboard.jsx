import { useState, useEffect } from 'react'
import Navbar from './components/navbar'

function Leaderboard() {
    const [data, setData] = useState([])
    const [ready, setReady] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/leaderboard")
            const result = await response.json()
            setData(result)
            setReady(true)
        } catch (error) {
            console.log(error)
        }
    }
    
    const names = data.map((score) => {
        return (
            <div>{score[0]}: {score[1]}</div>
        )
    })

    return (
        <>
            <Navbar />
            {ready && <div>{names}</div>}
        </>
    )
}

export default Leaderboard