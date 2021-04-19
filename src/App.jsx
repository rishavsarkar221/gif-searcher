import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [text, setText] = useState("");
    const [arr, setArr] = useState([]);

    const onChange = (e) => {
        setText(e.target.value);
        
        setArr(resetArr => {
            return [];
        });
    }

    const onSubmit = (e) => {
        async function getGifs() {
            const api = await axios.get(`https://g.tenor.com/v1/search?q=${text}&key=YVCODF5W0SKS`);
            
            for(let i = 0; i < api.data.results.length; i++) {
                setArr(oldSrc => {
                    return [api.data.results[i].media[0].gif.url, ...oldSrc];
                });
            }
            console.log(arr)
        }

        getGifs();
    }

    return(
        <React.Fragment>
            <div className="enter">
                <input type="text" className="form-control" placeholder="First name" name="search" onChange={onChange} />
                <br/>
                <button onClick={onSubmit} className="btn btn-primary">Submit</button>
            </div>

            <br/><br/>

            {arr.map(src => {
                return (
                    <>
                        <img style={{width: '15%', borderRadius: '15px', paddingLeft: '10px'}} src={src} />
                    </>
                )
            })}
        </React.Fragment>
    );
}

export default App;