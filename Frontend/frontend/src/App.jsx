import {useRef} from 'react'
import axios from "axios"

const App = () => {

  const inputRef = useRef(null)

  const submitHandler = async () => {
    try {
      console.log(inputRef.current.files[0]);
      const file = inputRef.current.files[0]
      const formData = new FormData()
      formData.append("image", file)

      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )

      console.log("response", response);

    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <div>
      <input type="file" ref={inputRef} />
      <button onClick={submitHandler}>Submit</button>
    </div>
  )
}

export default App
