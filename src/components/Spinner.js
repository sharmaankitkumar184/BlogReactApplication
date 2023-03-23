import React from 'react'
import loading from './BlogsImages/Loading-bar.gif'

const Spinner = (props)=> {
        return (
            <div className="text-center" >
                <img className="my-3" src={loading} alt="loading" style={{textAlign:'center'}}/>
            </div>
        )
}

export default Spinner