import React from 'react'

const BoundInput = (props:any) => {
    const {value, onChange, onSubmit, title, name, type} = props;
    return (
        <React.Fragment>
            <div className="flex justify-start items-center">
                <label className='mr-2' htmlFor={name}>{title}: </label>
                <input className='bg-gray-100 focus:border-none border-none rounded-sm py-2 px-2' 
                type={type ?? 'text'} 
                name={name}
                value={value}
                onChange={onChange}
                onSubmit={onSubmit}
                ></input>
            </div>
        </React.Fragment>
    );
}

export default BoundInput;
