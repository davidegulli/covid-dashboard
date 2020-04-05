import React, {useEffect, useState} from 'react';
import CurrentCases from './current-cases';
import CurrentCasesRegion from './current-cases-region';
import DailyDeltaCases from './daily-delta-cases';
import DailyDeltaCasesRegion from './daily-delta-cases-region';

const Container = () => {

    const [data, setData] = useState([]);
    const [dataRegions, setDataRegions] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [regions, setRegions] = useState([]);
    const [region, setRegion] = useState("Lazio");

    const filterRegions = (data, region) => {
        return data.filter(
            item => item.denominazione_regione === region)
    }

    useEffect(() => {
      fetch("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json")
        .then(response => response.json())
        .then(response => setData(response));

    
      fetch("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json")
        .then(response => response.json())
        .then(response => {
            setDataRegions(response);
            setRegions([...new Set(response.map(item => item.denominazione_regione))])
            setFilteredData(filterRegions(response, region));
        })
    }, []); 

    const changeRegionHandler = (event) => {

        const selectedRegion = 
            event.target.options[event.target.selectedIndex].value;
        
        setRegion(selectedRegion);
        setFilteredData(filterRegions(dataRegions, selectedRegion));
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col">
                    <h2>Italia</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-6">
                    <CurrentCases data={data}/>
                </div>
                <div className="col-xl-6">
                    <DailyDeltaCases data={data}/>
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-12">
                    <h2>{region}</h2>
                    <span className="float-right mb-2">
                        <select 
                            value={region}
                            onChange={changeRegionHandler}
                        >
                            {regions && regions.map((item, index) => {
                                    return (
                                        <option 
                                            key={index}
                                            value={item}>
                                            {item}
                                        </option>)
                                })
                            }
                        </select>
                    </span>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-6">
                    <CurrentCasesRegion data={filteredData}/>
                </div>
                <div className="col-xl-6">
                    <DailyDeltaCasesRegion data={filteredData}/>
                </div>
            </div>

        </div>
    );
}

export default Container;