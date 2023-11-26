import React from 'react'
import classes from './create.module.css'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { config } from '../../Constants';
const URL = config.api;



const Create = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState("")
  const [review, setReview] = useState("")
  const navigate = useNavigate()
  // we get the auth slice from the entire state, which(auth slice) 
  // is the userInfo and the token
  const { token } = useSelector((state) => state.auth)


  // type="file", e.target.files[0]
  const onChangeFile = (e) => {
    setImage(e.target.files[0])
  }

  const handleCloseImg = () => {
    setImage('')
  }


  const options = [
    "burger",
    "tikichat",
    "pizza",
    "pasta",
    "chowmin",
    "momos",
    "roll",
    "fries",
    "petis",
  ];

  const onOptionChangeHandler = (event) => {
    setCategory(event.target.value);
    console.log(
      "User Selected Value - ",
      event.target.value
    );
  };



  const handleCreateProduct = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      let filename = null

      if (image) {
        filename = Date.now() + image.name
        formData.append("filename", filename)
        formData.append("image", image)

        
        // await fetch(`http://localhost:5000/upload/image`, {
        await fetch(`${URL}/upload/image`, {
        // await fetch(`/upload/image`, {
          headers: {
            "Authorization": `Bearer ${token}`
          },
          method: "POST",
          body: formData
        })
      }

      // uploading product 
      // const res = await fetch(`http://localhost:5000/product`, {
      const res = await fetch(`${URL}/product`, {
      // const res = await fetch(`/product`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify({
          title,
          desc,
          category,
          img: filename,
          price,
          review
        })
      })

      const food = await res.json()
      console.log(food)

      // navigate(`/food/${food._id}`)
      navigate(`/foods/${food.category}`)

    } catch (error) {
      console.error(error.message)
    }
  }

  



  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {/* <h2 className={classes.title}>Create Food </h2><h4>Admin Only</h4> */}
        <h2 align="up">Create Food</h2>
        <h6 align="down">Admin Only</h6>
        <form onSubmit={handleCreateProduct} encType="multipart/form-data">
          <div className={classes.inputWrapper}>
            <label>Title: </label>
            <input type="text"
              placeholder='Title...'
              className={classes.input}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={classes.inputWrapper}>
            <label>Description: </label>
            <input type="text"
              placeholder='Description...'
              className={classes.input}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className={classes.inputWrapper}>
            {/* <label>Category: </label>
            <input type="text"
              placeholder='Category...'
              className={classes.input}
              onChange={(e) => setCategory(e.target.value)}
            /> */}

            <label for="Category">Category:</label>
            <select name="Category" className={classes.input} onChange={onOptionChangeHandler}>
                <option>Please choose fast food</option>
                {options.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
            </select>

          </div>
          <div className={classes.inputWrapperImage}>
            <label htmlFor="image" className={classes.labelFileInput}>Image: <span>Upload here</span></label>
            <input type="file"
              id="image"
              placeholder='Image...'
              className={classes.input}
              onChange={onChangeFile}
              style={{ display: 'none' }}
            />
            {image && <p className={classes.imageName}>{image.name} <AiOutlineCloseCircle onClick={handleCloseImg} className={classes.closeIcon} /></p>}
          </div>
          <div className={classes.inputWrapper}>
            <label>Price: </label>
            <input type="number"
              step={0.01}
              placeholder='Price...'
              className={classes.input}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className={classes.inputWrapper}>
            <label>Review: </label>
            <input type="number"
              step={0.1}
              min={1}
              max={5}
              placeholder='Review...'
              className={classes.input}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
          <div className={classes.buttonWrapper}>
            <button type="submit" className={classes.submitBtn}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Create