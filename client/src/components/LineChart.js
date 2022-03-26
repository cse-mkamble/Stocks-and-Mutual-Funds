import React, { useEffect, useState } from "react";
import ReactApexChart from 'react-apexcharts';

import axios from 'axios';


export default function LineChart() {

    const [optionsCategories, setOptionsCategories] = useState([]);
    const [seriesData, setSeriesData] = useState([]);

    useEffect(async () => {
        const res = await axios.get(`/getdata`);

        setOptionsCategories(Object.keys(res.data.data['Time Series (5min)']));
        var obj1 = Object.values(res.data.data['Time Series (5min)']);
        var createobj = [];
        for (let key in obj1) {
            var val = obj1[key];
            // setSeriesData(...seriesData, Object.values(val)[0]);
            console.log(Object.values(val)[0]);
            createobj.push(Object.values(val)[0]);
        }
        setSeriesData(createobj);
        // console.log(createobj);
    }, []);

    const series = [{
        name: "1. open",
        data: seriesData
    }];

    const options = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Product Trends by Month',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: optionsCategories,
        }
    }



    return (<div>
        <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>);
}
