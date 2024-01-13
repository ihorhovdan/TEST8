import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from 'react-bootstrap';
import { WiDaySunny, WiCloud, WiCloudy, WiFog, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
import './Style.css';
const DettagliSettimana = (props) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(null);

    const getWeatherIcon = (codtempo) => {
        switch (codtempo) {
            case 0:
                return <WiDaySunny size={32} />;
            case 1:
            case 2:
            case 3:
                return <WiCloud size={32} />;
            case 45:
            case 48:
                return <WiFog size={32} />;
            case 51:
            case 53:
            case 55:
                return <WiCloudy size={32} />;
            case 61:
            case 63:
            case 65:
            case 66:
            case 67:
            case 80:
            case 81:
            case 82:
                return <WiRain size={32} />;
            case 71:
            case 73:
            case 75:
            case 85:
            case 86:
                return <WiSnow size={32} />;
            case 95:
            case 96:
            case 99:
                return <WiThunderstorm size={32} />;
            default:
                return null; // Puoi gestire il caso predefinito come preferisci
        }
    };

    const fetchTempo = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${props.latitudine}&longitude=${props.longitudine}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration`);
            const resultsData = response.data;
            setResults(resultsData);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (props.latitudine && props.longitudine) {
            fetchTempo();
        }
    }, [props.latitudine, props.longitudine]);

    const getDayOfWeek = (date) => {
        const daysOfWeek = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
        const dayIndex = new Date(date).getDay();
        return daysOfWeek[dayIndex];
    };

    const formatDate = (date) => {
        const options = { month: "long", day: "numeric" };
        return new Date(date).toLocaleDateString("it-IT", options);
    };

    return (
        <>
            <Row className="text-center d-flex flex-wrap">
                {results?.daily?.weather_code?.map((codtempo, i) => (
                    <Col className="card-meteo">
                        <div key={i}>
                            <p className="giorni">{getDayOfWeek(results.daily.time[i])}</p>
                            <p>{formatDate(results.daily.time[i])}</p>
                            {getWeatherIcon(codtempo)}
                            {codtempo === 0 && <p>Cielo sereno</p>}
                            {[1, 2, 3].includes(codtempo) && <p>Nuvoloso</p>}
                            {[45, 48].includes(codtempo) && <p>Nebbia</p>}
                            {[51, 53, 55].includes(codtempo) && <p>Leggermente nuvoloso</p>}
                            {[61, 63, 65, 66, 67, 80, 81, 82].includes(codtempo) && <p>Pioggia</p>}
                            {[71, 73, 75, 85, 86].includes(codtempo) && <p>Neve</p>}
                            {[95, 96, 99].includes(codtempo) && <p>Temporale</p>}
                            {![0, 1, 2, 3, 45, 48, 51, 53, 55, 61, 63, 65, 66, 67, 80, 81, 82, 71, 73, 75, 85, 86, 95, 96, 99].includes(codtempo) && <p>Previsioni non disponibili, trasferisciti da qualche parte</p>}
                            <div className="d-flex justify-content-center">
                                <p>{results.daily.temperature_2m_min[i]}&deg;C&nbsp;/&nbsp;</p>
                                <p>{results.daily.temperature_2m_max[i]}&deg;</p>
                            </div>
                        </div>
                    </Col>
                ))}
                {isLoading && <p>Caricamento...</p>}
                {error && <p>Errore: {error}</p>}
            </Row>
        </>
    );
};

export default DettagliSettimana;