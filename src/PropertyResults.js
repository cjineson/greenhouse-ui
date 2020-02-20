import React, { Component } from 'react';
import Chart from "react-google-charts";

import './epc-main.css';
import './App.css';

class PropertyResults extends Component {
    constructor( props ){
        super( props );
        const query = props.location.search;
        const params = new URLSearchParams(query);
        this.state = {
          address: params.get('address'),
          postcode: params.get('postcode')
        };
        console.log('init state: ' + JSON.stringify(this.state));

        console.log(`searching postcode/address ${this.state.postcode}/${this.state.address}`)
        const postcodeurl = `http://greenhouseapi.chrisineson.com:10666/searchAddress?address=${encodeURI(this.state.address)}&postcode=${encodeURI(this.state.postcode)}`
        // const postcodeurl = `http://35.195.92.130:10666/searchAddress?address=${encodeURI(this.state.address)}&postcode=${encodeURI(this.state.postcode)}`
        // const postcodeurl = `http://localhost:10666/searchAddress?address=${encodeURI(this.state.address)}&postcode=${encodeURI(this.state.postcode)}`
        console.log(postcodeurl)        
        const hdrs = new Headers({
          'Accept': 'application/json'
        });
          fetch(postcodeurl, {headers: hdrs})
          .then(res => res.json())
          .then((data) => {
            console.log(data);
            this.setState( s => ({ propertydata_tmp: data.rows }) )
            console.log('post search state: ' + JSON.stringify(this.state));
            let propobj = {}
            for (const [key, value] of Object.entries(this.state.propertydata_tmp[0])) {
              console.log(`Key</td><td>{key} Value:${value}`);
              let newkey = key.replace(/-/g,'')
              propobj[newkey] = value
            }
            console.log(propobj)
            this.setState( s => ({ propertydata: propobj }) )
            this.setState( s => ({ showData: true }) )
          })
          .catch(e => {
            console.log(e)
            this.setState( s => ({showData: false, showError: true}) );
          })
       
    }

  render() {
    return (
      <div className="App">
        <h1>Results</h1>
        {this.state.showData && 

        <div>

            <div className="chart">
    <div className="bars">
      <div className="bar">
        <div className="col_1"><span className="th">Energy Rating</span></div>
        <div className="col_2"><span className="th">Current</span></div>
        <div className="col_3"><span className="th">Potential</span></div>
      </div>
    </div>
    <div className="bars noborder_bottom">
      <div className="bar">
        <small>very energy efficient - lower running costs</small>
      </div>
    </div>
    <div className="bars noborder_bottom">
        <div className="bar">
          <div className="col_1"><span className="block rating_a"><span className="range">(92+)</span><span className="title">A</span></span>
          </div>
          <div className="col_2"></div>
          <div className="col_3"></div>
        </div>
        <div className="bar">
          <div className="col_1"><span className="block rating_b"><span className="range">(81-91)</span><span className="title">B</span></span>
          </div>
          <div className="col_2"></div>
          <div className="col_3"></div>
        </div>
        <div className="bar">
          <div className="col_1"><span className="block rating_c"><span className="range">(69-80)</span><span className="title">C</span></span>
          </div>
          <div className="col_2"></div>
          <div className="col_3"></div>
        </div>
        <div className="bar">
          <div className="col_1"><span className="block rating_d"><span className="range">(55-68)</span><span className="title">D</span></span>
          </div>
          <div className="col_2"></div>
          <div className="col_3"></div>
        </div>
        <div className="bar">
          <div className="col_1"><span className="block rating_e"><span className="range">(39-54)</span><span className="title">E</span></span>
          </div>
          <div className="col_2"></div>
          <div className="col_3"></div>
        </div>
        <div className="bar">
          <div className="col_1"><span className="block rating_f"><span className="range">(21-38)</span><span className="title">F</span></span>
          </div>
          <div className="col_2"></div>
          <div className="col_3"></div>
        </div>
        <div className="bar">
          <div className="col_1"><span className="block rating_g"><span className="range">(1-20)</span><span className="title">G</span></span>
          </div>
          <div className="col_2"></div>
          <div className="col_3"></div>
        </div>
        <div className={`pointer current rating_${this.state.propertydata.currentenergyrating.toLowerCase()} type_${this.state.propertydata.currentenergyrating.toLowerCase()}`}>
          <span>{this.state.propertydata.currentenergyefficiency}</span>
        </div>
        <div className={`pointer potential rating_${this.state.propertydata.potentialenergyrating.toLowerCase()} type_${this.state.propertydata.potentialenergyrating.toLowerCase()}`}>
          <span>{this.state.propertydata.potentialenergyefficiency}</span>
        </div>
    </div>
    <div className="bars noborder_top">
      <div className="bar">
        <small>not energy efficient - higher running costs</small>
      </div>
    </div>
    </div>



    {/* <Chart
              width={400}
              height={300}
              chartType="ColumnChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Measure', 'Potential', 'Current'],
                // ['Energy Rating', this.state.propertydata.potentialenergyrating, this.state.propertydata.currentenergyrating],
                ['Environmental Impact', parseInt(this.state.propertydata.environmentimpactpotential), parseInt(this.state.propertydata.environmentimpactcurrent)],
                ['CO2 Emissions', parseInt(this.state.propertydata.co2emissionspotential), parseInt(this.state.propertydata.co2emissionscurrent)],
              ]}
              options={{
                chartArea: { width: '80%' },
                hAxis: {
                  title: '???',
                  minValue: 0,
                },
                vAxis: {
                  title: 'Measure',
                },
              }}
              legendToggle
            /> */}

            
        {/* <table>
          {


            <tr>
              <td>Potential Energy Rating</td><td>{this.state.propertydata.potentialenergyrating}</td>
            </tr>
            <tr>
              <td>Current Energy Rating</td><td>{this.state.propertydata.currentenergyrating}</td>
            </tr>
            <tr>
              <td>Potential Environmental Impact</td><td>{this.state.propertydata.environmentimpactpotential}</td>
            </tr>
            <tr>
              <td>Current Environmental Impact</td><td>{this.state.propertydata.environmentimpactcurrent}</td>
            </tr>
            <tr>
              <td>Potential CO2 Emissions</td><td>{this.state.propertydata.co2emissionspotential}</td>
            </tr>
            <tr>
              <td>Current CO2 Emissions</td><td>{this.state.propertydata.co2emissionscurrent}</td>
            </tr>

          </table> */}
        </div>
        }
      </div>
    );
  }

}

export default PropertyResults;
