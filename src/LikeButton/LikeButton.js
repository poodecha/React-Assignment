import React, { useState } from 'react'

export default function LikeButton() {
    const [count, setCount] = useState(0)
    function onLikeNote (){
        setCount(count+1);
    }
    return (
        <div>
           <button  className="btn-like" onClick={onLikeNote} >
          <i className="pi-like"></i>Click on Like : {count}
          </button>
        </div>
    )
}