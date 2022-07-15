import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

const Item = () => {

  let { itemId, itemImage } = useParams();

  const [description, setDescription] = useState("");

  useEffect(() => {
    let data;

    axios.get(`http://localhost:8000/eshop/items/${itemId}`)
    .then(res => {
        data = res.data.description;
        setDescription(data);
    })
    .catch(err => {})
  }, []);

  return (

    <div className ="container-fluid">
        <div className ="row">
            <div className ="col-5 mt-3 pt-3">
                <img src= {`/images/${itemImage}`} width="200" height="200" alt="imgerr"></img>
            </div>

            <div className ="col-7 mt-3 pt-3">
                <h2 className="float-start">{description}</h2>
            </div>
        </div>
    </div>
  );
};

export default Item;
