import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function SearchArtists() {
    const [keyword, setKeyword] = useState('');
    let navigate = useNavigate();

    function handleChange(event){
        setKeyword(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        navigate("/results/"+keyword);
    }

    return (
            <div>
              <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input className="form-control"
                  placeholder="e.g., Noel Gallagher"
                  value={keyword}
                  onChange={handleChange}
                  />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit">Search</button>
                </div>
              </div>
              </form>
            </div>
    )
}

export default SearchArtists;