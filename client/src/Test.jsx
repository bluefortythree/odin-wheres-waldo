import {useState, useEffect} from 'react'

function GetData() {
    const [data, setData] = useState({})

    useEffect(() => {
        fetch("http://localhost:3000/home")
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err))
    }, [])

    return (
        <>
            <div>{data.name}</div>
            <div>{data.age}</div>
        </>
    )
}

export default GetData