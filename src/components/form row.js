let FormRow = ({type, name, placeholder, value, handleChange, input_class, div_class}) => {
    return (
        <div className={div_class}>
            <input type={type} name={name} placeholder={placeholder}
            value={value} onChange={handleChange}
            className={input_class} />
        </div>
    )
}


export default FormRow