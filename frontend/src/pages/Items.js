import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { useParams } from "react-router-dom";

const Items = () => {

    let { searched } = useParams();

    const [state, setState] = useState({
        images : [],
        currentPage : 1,
        count : 0,
        brand : ""
    });

    const search = useRef("");

    if ( searched !== undefined && searched !== null) {
        search.current = searched;
    }

    const [ordering, setOrdering] = useState("description");

    useEffect(() => {
        let data;

        axios.get(`http://localhost:8000/eshop/items/?page=${state.currentPage}&brand=${state.brand}&search=${search.current}&ordering=${ordering}/`)
        .then(res => {
            data = res.data;
            setState( s => {
                return {...s,
                count: data.count,
                images: data.results}
            });
        })
        .catch(err => {})
    }, [state.currentPage, state.brand, search, ordering]);

    const handlePageClick = (event) => {
        setState( s => {
                return {...s,
                currentPage: event.selected + 1}
        });
    };

    const handleCheckBox = (event) => {

        if (!event.target.checked){
            setState( s => {
                return {...s,
                    currentPage : 1,
                    brand : ""}
            });
        } else {
            setState( s => {
                return {...s,
                    currentPage : 1,
                    brand : event.target.value}
            });
        }
    };

     const handleSelect = (event) => {
        setOrdering(event.target.value)
        setState( s => {
                return {...s,
                    currentPage : 1}
            });
     };


  return (
    <div className ="container-fluid">

      <div className ="row ">

        <div className  ="col-2 bg-secondary">
            <form>
                <h1>Filters</h1>
                <div className ="form-check">
                    <input className ="form-check-input" type="checkbox" id="amd" name="amd" value="amd" onChange={handleCheckBox}></input>
                    <label className ="form-check-label float-start" for="amd">Amd</label>
                </div>
                <div className ="form-check">
                  <input className ="form-check-input" type="checkbox" id="intel" name="intel" value="intel" onChange={handleCheckBox}></input>
                  <label className ="form-check-label float-start" for="intel">Intel</label>
                </div>
            </form>
        </div>

        <div className ="col-10 bg-secondary ">
            <div className ="row">
                <form >
                  <select value={ordering} onChange={handleSelect}>
                    <option value="description">description</option>
                    <option value="price">price</option>
                  </select>
                </form>
            </div>

            <div className ="row ">
                <div className="d-flex flex-wrap">
                    {state.images.map((image, id) => (
                        <div key={id} className ="p-1  flex-fill rounded-3 m-2 bg-light">
                            <div>
                                <Link to={ "/item/" + image.id + "/" + image.image}>
                                    <img src= {`/images/${image.image}`} width="150" height="150" alt="imgerr"></img>
                                </Link>
                                <p>{image.description}</p>
                                <p>Price: <b>{image.price} €</b></p>
                            </div>
                        </div>
                    ) )}
                </div>
            </div>

        </div>

      </div>

      <div className="commentBox">
          <nav aria-label="Page navigation comments" className="mt-4">
            <ReactPaginate
              previousLabel="< previous"
              nextLabel="next >"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              pageCount={state.count/10}
              pageRangeDisplayed={2}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName="pagination justify-content-center"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              activeClassName="active"

              hrefBuilder={(page, pageCount, selected) =>
                page >= 1 && page <= pageCount ? `/page/${page}` : '#'
              }
              hrefAllControls
            />
          </nav>
      </div>

    </div>
  );
};

export default Items;
