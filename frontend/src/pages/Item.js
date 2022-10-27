import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";

const Item = () => {

  let { itemId, itemImage } = useParams();

  const [description, setDescription] = useState("");

  const { user } = useContext(AuthContext);

  const { addToCart } = useContext(CartContext);

  const [comments, setComments] = useState([]);

  const currentUser = user==null ? 'Anonymous' : user.username;

  const [newComment, setNewComment] = useState(
    "Write a comment"
  );

  const [changed, setChanged] = useState(false);

  useEffect(() => {
    let data;

    axios.get(`http://localhost:8000/eshop/items/${itemId}/`)
    .then(res => {
        data = res.data.description;
        setDescription(data);
    })
    .catch(err => {})
  }, []);


  useEffect(() => {
    let data;

    axios.get(`http://localhost:8000/eshop/comments/list/${itemId}/`)
    .then(res => {
      data = res.data
      setComments(data);
    })
    .catch(err => {})
  }, [changed]);



  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  const postComment = (event) => {

    event.preventDefault();
    axios.post(`http://localhost:8000/eshop/comments/create`, {
      item : itemId,
      text : newComment,
      user : currentUser
    })
    .then(res => {
        setChanged(!changed);
        console.log(res);
    })
    .catch(err => {})


  };

  return (

    <div className ="container-fluid">
        <div className ="row">
            <div className ="col-5 mt-3 pt-3">
                <img src= {`/images/${itemImage}`} width="200" height="200" alt="imgerr"></img>
            </div>
            <div className ="col-7 mt-3 pt-3">
                <div className ="row">
                  <h2 >{description}</h2>
                </div>
                <div className ="row">
                  <button type="button" className="btn btn-primary mx-auto" onClick={() => addToCart(itemId, description, itemImage)} style={{height: '50px', width : '150px'}}>Add to cart</button>
                </div>
            </div>
        </div>
        <div className ="row">
            <div>
              <form onSubmit={postComment}>
                <textarea value={newComment} onChange={handleChange} cols="50" rows = "3"/>
                <input type="submit" value="Submit"/>
              </form>
            </div>

            <div>
              {comments.map((comment) => (
                <div className ="row bg-light mt-3 pt-3">
                  <p>{comment.text}</p>
                  <p>{comment.user} at {comment.date_created}</p>
                </div>
              ) )}
            </div>
        </div>
    </div>
  );
};

export default Item;
