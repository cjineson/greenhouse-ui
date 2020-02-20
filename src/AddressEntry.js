import React, { Component } from 'react';

import './App.css';

class AddressEntry extends Component {
  constructor( props ){
    super( props );
    this.state = {
      showAddresses: false,
      showNotfound: false
    };
    console.log('init state: ' + JSON.stringify(this.state));
    this.searchPostCode = this.searchPostCode.bind(this);
    this.updatePostcode = this.updatePostcode.bind(this);
  }

  updatePostcode(e) {
    this.setState({postcode: e.target.value});
  }

  searchPostCode(e) {
    e.preventDefault();
    console.log('search clicked state: ' + JSON.stringify(this.state));
    console.log('searching postcode: ' + JSON.stringify(this.state.postcode))
    const url = "http://greenhouseapi.chrisineson.com:10666/searchPostcode?postcode=" + encodeURI(this.state.postcode)
    // const url = "http://35.195.92.130:10666/searchPostcode?postcode=" + encodeURI(this.state.postcode)
    // const url = "http://localhost:10666/searchPostcode?postcode=" + encodeURI(this.state.postcode)
    console.log(url)        
    const hdrs = new Headers({
      'Accept': 'application/json'
    });
      fetch(url, {headers: hdrs})
      .then(res => res.json())
      .then((data) => {
        console.log("data: " + data);
        this.setState( s => ({ properties: data.rows }) )
        this.setState( s => ({showAddresses: true}) );
        console.log('state: ' + JSON.stringify(this.state));
      })
      .catch(e => {
        console.log(e)
        this.setState( s => ({showAddresses: false, showNotfound: true}) );
      })
        

  }  

  render() {
    return (
              <div className="App">
                <h1>
                  GreenHouse   <img height="70" src="https://www.nea.org.uk/wp-content/uploads/2019/07/energy-efficiency.jpg" alt="greenhouse"></img>             
                </h1>
                <h4>
                  How Energy Efficient is your home?
                </h4>
                <br/>
                <h3>
                  Search for your Postcode
                </h3>
                <input label="" name="postcode" value={this.state.postcode} onChange={this.updatePostcode}>                 
                </input>
                <br/><br/>
                <button onClick={this.searchPostCode} label="Search1" name="search">Search</button>
                <br/><br/>
                { this.state.showAddresses &&
                  <div>
                    <p>
                      Choose Your Address:
                    </p>
                    <ul name="addresslist">
                    {
                      Object
                        .keys(this.state.properties)
                        .map(key => 
                          <li key={key}>
                            <a href={`propertyresults?address=${this.state.properties[key].address}&postcode=${this.state.postcode}`}>
                              {this.state.properties[key].address}
                            </a>
                          </li>
                        )
                      }
                    </ul>
                    <p>
                      If your Address isn't shown above, your property may not have an Energy Efficiency Certificate. Request one <a href="https://google.com">here</a>
                    </p>
                  </div>
                }
                { this.state.showNotfound && 
                  <div>
                    <p>
                      Unable to find your postcode - your property may not have an Energy Efficiency Certificate. Request one <a href="https://google.com">here</a>
                    </p>
                  </div>
                }
              </div>
    );
  }
}

export default AddressEntry;
