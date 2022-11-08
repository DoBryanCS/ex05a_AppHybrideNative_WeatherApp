import {useEffect, useState} from "react";

function App() {
    const [temp, setTemp] = useState('');
    const [temp_min, setTempMin] = useState('');
    const [temp_max, setTempMax] = useState('');
    const [sunrise, setSunrise] = useState('');
    const [sunset, setSunset] = useState('');
    const [icon, setIcon] = useState('');

    const [ville, setVille] = useState('Montreal,CA');
    function handleChangeVille(event) {
        setVille(event.target.value)
    }

    var timeRise = new Date(sunrise * 1e3).toISOString().slice(-13, -5)
    var timeSet = new Date(sunset * 1e3).toISOString().slice(-13, -5)

useEffect(() => {
    async function getData() {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&appid=7a692edb6a4c6cc59015d0ea14008878`;
        let rep = await fetch(url);
        if (rep.ok) {
            let data = await rep.json();
            setTemp(data.main.temp);
            setTempMin(data.main.temp_min);
            setTempMax(data.main.temp_max);
            setSunrise(data.sys.sunrise);
            setSunset(data.sys.sunset);
            setIcon(data.weather[0].icon);
        }
    }
    getData();
}, [ville])

    
    return (
        <div>
            <h2 className="has-text-centered title is-1 is-primary">OpenWeatherMap</h2>
            <div className="container">
                <div className="section">
                    <div className="columns is-centered">
                        <div className="field is-horizontal" style={{paddingLeft: '20px'}}>
                            <div className="field-label is-normal">
                                <label className="label" htmlFor="ville">Ville</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control" style={{minWidth: '200px'}}>
                                        <div className="select is-fullwidth">
                                            <select id="ville" value={ville} onChange={handleChangeVille}>
                                                <option>Montreal,CA</option>
                                                <option>Trois-Rivières,CA</option>
                                                <option>Québec,CA</option>
                                                <option>Ottawa,CA</option>
                                                <option>Toronto,CA</option>
                                                <option>Vancouver,CA</option>
                                                <option>Edmonton,CA</option>
                                                <option>San Francisco,US</option>
                                                <option>New York City,US</option>
                                                <option>Washington,US</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section is-centered">
                    <div className="columns is-centered">
                        <table className="table is-bordered">
                            <thead>
                            <tr>
                                <th colSpan="2" className="has-text-centered">
                                    <label>
                                        Résultats
                                    </label>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">Température actuelle (temp):</th>
                                <td><label>{temp}</label></td>
                            </tr>
                            <tr>
                                <th scope="row">Température min (temp_min):</th>
                                <td><label>{temp_min}</label></td>
                            </tr>
                            <tr>
                                <th scope="row">Température max (temp_min):</th>
                                <td><label>{temp_max}</label></td>
                            </tr>
                            <tr>
                                <th scope="row">Heure lever soleil (sunrise):</th>
                                <td><label>{timeRise}</label></td>
                            </tr>
                            <tr>
                                <th scope="row">Heure coucher soleil (sunrise):</th>
                                <td><label>{timeSet}</label></td>
                            </tr>
                            <tr>
                                <th scope="row"></th>
                                <td><img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="condition ciel"/></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
