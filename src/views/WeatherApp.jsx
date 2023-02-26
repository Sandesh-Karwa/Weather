// Importing external dependencies from libraries and frameworks
import React, { useEffect, useRef, useState } from "react";
import Highcharts from 'highcharts';
import styled from "styled-components";

// Importing custom hooks
import { getWeather } from "../hooks/getWeather";
import { getLocationsList } from "../hooks/getLocationsList";

// Importing reusable styled components
import Typeahead from "../components/AutoComplete/AutoComplete";
import CustomDropdown from "../components/Dropdown/Dropdown";

// Importing static dropdown content
import { weatherParameters } from "../static/weatherParameters";
import { timePeriod } from "../static/timePeriod";

// Importing static content
import { content } from "../static/content";

const WeatherApp = () => {
  const selectedLocation = useRef({});
  const [locationDetails, setLocationDetails] = useState([]);
  const [locationText, setLocationText] = useState("");
  const [selectedWeatherParam, setSelectedWeatherParam] = useState({ label: '', value: '' });
  const [selectedTimePeriod, setSelectedTimePeriod] = useState({ label: '', value: '' });

  // Fetching locations based on text entered by the user
  const getUpdatedLocations = (locationText) => {
    if (!selectedLocation.current.isUpdated) {
      getLocationsList({
        locationText
      }).then(response => {
        setLocationDetails(response)
      })
    }
  }

  // Fetching weather details based on location, weather parameter and time period selected by user
  useEffect(() => {
    if(selectedLocation.current.isUpdated && selectedWeatherParam.value && selectedTimePeriod.value){
      getWeather({
        weatherParameter: selectedWeatherParam.value,
        coordinates: selectedLocation.current.coordinates,
        timePeriod: selectedTimePeriod.value
      }).then(responseData => {
        Highcharts.chart('container', {
          chart: {
            type: 'line',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 10,
            borderColor: '#ccc',
            borderWidth: 1,
            plotBackgroundColor: '#f9f9f9'
          },
          title: {
            text: selectedWeatherParam.label + ' over time',
            style: {
              fontSize: '24px',
            }
          },
          xAxis: {
            type: 'datetime',
            title: {
              text: 'Time Duration',
              style: {
                fontSize: '16px',
                fontWeight: 'bold'
              }
            },
            labels: {
              style: {
                fontSize: '14px'
              }
            }
          },
          yAxis: {
            title: {
              text: selectedWeatherParam.label,
              style: {
                fontSize: '16px',
                fontWeight: 'bold'
              }
            },
            labels: {
              style: {
                fontSize: '14px'
              }
            }
          },
          series: [{
            name: selectedWeatherParam.label,
            data: responseData,
            color: '#1e90ff'
          }],
          legend: {
            enabled: false
          },
          credits: {
            enabled: false
          }
        });
      })
    }
  }, [selectedLocation.current.isUpdated, selectedWeatherParam.value, selectedTimePeriod.value, selectedWeatherParam.label, ])

  // Selecting location from autocomplete list
  const onSelectLocation = (location) => {
    location = { ...location, isUpdated: true }
    selectedLocation.current = location
    setLocationText(location.label)
    setLocationDetails([])
  }

  // Updating location state entered by user
  const onTextEntered = (newValue) => {
    selectedLocation.current = { ...selectedLocation.current, isUpdated: false }
    setLocationText(newValue);
  }

  return (
    <WeatherContainer>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-12 col-xl-12">
              <div className="card shadow-0 text-dark">
                <div className="card-body">
                  <div className="row text-center">
                    <div className="col-md-3 text-end">
                      <Typeahead
                        placeholder={content.selectLocation}
                        value={locationText}
                        options={locationDetails}
                        onSelect={onSelectLocation}
                        onRequestOptions={getUpdatedLocations}
                        onChange={onTextEntered}
                      />
                      <CustomDropdown 
                        value={selectedWeatherParam.label}
                        label={content.selectWeatherParameter}
                        options={weatherParameters}
                        selectedOptions={setSelectedWeatherParam}
                      />
                      <CustomDropdown
                        label={content.selectTimePeriod}
                        value={selectedTimePeriod.label}
                        options={timePeriod}
                        selectedOptions={setSelectedTimePeriod}
                      />
                    </div>
                    <WeatherChart id="container" className="col-md-9 text-center border-start border-1 border-dark py-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </WeatherContainer>
  )
}

export default WeatherApp


const WeatherContainer = styled.div`
  background-image: url(https://d3nn873nee648n.cloudfront.net/900x600/19142/220-SM900193.jpg);
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;

const WeatherChart = styled.div`
  overflow: hidden;
  height: 80vh;
  background-color: white;
`