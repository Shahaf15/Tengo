
const FormRowSelect = ({labelText, name, value, handleChange, list}) => {
  return (
    <div className="form-row">
            <label htmlFor={name} className='form-label'>
              {labelText || name}
            </label>
            <select 
                name={name} 
                value={value} 
                onChange={handleChange} 
                className='form-select'>

              {list.map((itemValue, index) =>{//only for string
                return(
                  <option key={index} value={itemValue}>
                    {itemValue}
                  </option>
                )
              })}
            </select>
          </div>
  )
}

export default FormRowSelect