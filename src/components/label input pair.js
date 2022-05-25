let LabelInput = (props) => {

    let { type, name, value, handleChange,div_class, placeholder,
        input_class, labelFor, labelText, label_class } = props

    return (
        <div className={div_class}>
            <label htmlFor={labelFor} className={label_class}>
                {labelText}
            </label>
            <input type={type} name={name} placeholder={placeholder}
            value={value} onChange={handleChange} id={labelFor}
            className={input_class}
            />
        </div>
    )
}


export default LabelInput