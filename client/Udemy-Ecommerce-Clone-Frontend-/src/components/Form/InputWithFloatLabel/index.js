import { useEffect, useRef } from "react"


const InputWithFloatLabel = ({ label, onChange, value = "" }) => {
    const labelRef = useRef()
    const inputRef = useRef()

    const handleFocusInput = () => {
        labelRef.current.style.top = "25%"
        labelRef.current.style.fontSize = "12px"
    }

    const handleFocusOut = () => {
        if (!value) {
            labelRef.current.style.top = "50%"
            labelRef.current.style.fontSize = "15px"
        }
    }

    useEffect(() => {
        if (value) {
            labelRef.current.style.top = "25%"
            labelRef.current.style.fontSize = "12px"
        }
    }, [])
    return (
        <div className="input-with-float-label">
            <label ref={labelRef}>
                {label}
            </label>
            <div className="input-with-float-label-border">
                <input ref={inputRef} onBlur={handleFocusOut} onFocus={handleFocusInput} onChange={onChange} value={value} />
            </div>
        </div>
    )
}

export default InputWithFloatLabel