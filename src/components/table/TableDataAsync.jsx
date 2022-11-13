import React, { useEffect, useState } from 'react'

export default function TableDataAsync({_id,getFunction,property}) {
    
    const [data, setData] = useState([])

    useEffect(() => {
        getFunction({materialId:_id}).then((res)=> {
            setData(res.data)
            console.log(res)
        })
    },[])

   return (
        <>{
            (data.length > 0) && 
            <div> {data[0][property]}
            </div>
        }</>
  )
}
