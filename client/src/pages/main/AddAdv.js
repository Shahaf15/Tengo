import { FormRow, Alert, FormRowSelect } from '../../components'
import { useAppContext } from "../../context/appContext"
import Wrapper from "../../assets/wrappers/DashboardFormPage"

const AddAdv = () => {
  const { isEditing, showAlert, displayAlert, title, foodType, advLocation, foodTypeOptions, status, statusOptions, details, handleChange, clearValues, isLoading, createAdv, editAdv } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title || !foodType || !advLocation) {
      displayAlert()
      return
    }
    if(isEditing){
      editAdv()
      return
    }
    createAdv()
  }

  const handleAdvInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit food advertise' : 'add food advertise'}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* title */}
          <FormRow type="text" name="title" value={title} handleChange={handleAdvInput} />
          {/* foodType */}
          <FormRowSelect name="foodType" labelText="Food Type" value={foodType} handleChange={handleAdvInput} list={foodTypeOptions} />
          {/* details */}
          <FormRow type="text" name="details" value={details} handleChange={handleAdvInput} />
          {/* location */}
          <FormRow type="text" labelText="Advertise Location" name="advLocation" value={advLocation} handleChange={handleAdvInput} />
          {/* adv status */}
          <FormRowSelect name="status" value={status} handleChange={handleAdvInput} list={statusOptions} />
          {/* btn-coontainer */}
          <div className="btn-container">
            <button type='submit' className='btn btn-block submit-btn' onClick={handleSubmit} disabled={isLoading}>
              submit
            </button>
            <button className='btn btn-block clear-btn' onClick={(e)=>{
              e.preventDefault()
              clearValues()
            }}>
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddAdv