import React, { useRef, useEffect, useState, useContext } from 'react'; 
import mapboxgl from 'mapbox-gl';
import UserContext from './context/UserContext';


import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';


mapboxgl.accessToken = 'pk.eyJ1Ijoic2FsYXphcmplMSIsImEiOiJjbGNxdmZzazgwOW94M3dtdjB6dDhjZmljIn0.ArMQ0i7cbFKJWaS0xZRPXw'

const DisplayMap = ({ hikes }) => {
    const { currUser } = useContext(UserContext); 

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-98.4133)
    const [lat, setLat] = useState(39.3203)
    const [zoom, setZoom] = useState(4.2)


    useEffect(() => {
        if (map.current) return; 
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        })
    })

    useEffect(() => {
        if (!map.current) return;
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2)); 
        })
    })

    useEffect(() => {
        // https://docs.mapbox.com/mapbox-gl-js/example/cluster/
        map.current.on('load', () => {
            // Add a new source from our GeoJSON data and
            // set the 'cluster' option to true. GL-JS will
            // add the point_count property to your source data.
            map.current.addSource('hikes', {
                type: 'geojson',
                data:hikes,
                cluster: true,
                clusterMaxZoom: 14, // Max zoom to cluster points on
                clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
            });

            map.current.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'hikes',
                filter: ['has', 'point_count'],
                paint: {
                    // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                    // with three steps to implement three types of circles:
                    //   * Blue, 20px circles when point count is less than 100
                    //   * Yellow, 30px circles when point count is between 100 and 750
                    //   * Pink, 40px circles when point count is greater than or equal to 750
                    'circle-color': [
                        'step',
                        ['get', 'point_count'],
                        '#51bbd6',
                        100,
                        '#f1f075',
                        750,
                        '#f28cb1'
                    ],
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        20,
                        100,
                        30,
                        750,
                        40
                    ]
                }
            });
            map.current.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'hikes',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': ['get', 'point_count_abbreviated'],
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                }
            });
                 
            map.current.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'hikes',
                filter: ['!', ['has', 'point_count']],
                paint: {
                    'circle-color': '#11b4da',
                    'circle-radius': 5,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                }
            });
                 
            // inspect a cluster on click
            map.current.on('click', 'clusters', (e) => {
                const features = map.current.queryRenderedFeatures(e.point, {
                    layers: ['clusters']
                });
                const clusterId = features[0].properties.cluster_id;
                map.current.getSource('hikes').getClusterExpansionZoom(
                    clusterId,
                    (err, zoom) => {
                        if (err) return;
                        
                        map.current.easeTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom
                        });
                    }
                );
            });
                 
            // When a click event occurs on a feature in
            // the unclustered-point layer, open a popup at
            // the location of the feature, with
            // description HTML from its properties.
            map.current.on('click', 'unclustered-point', (e) => {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const name = e.features[0].properties.name;
                const description =
                    e.features[0].properties.description;
                let link = currUser ? `<a class="map-link" href='/hikes/${e.features[0].properties.id}'>Trail Link</a>` :  `<small>Login For More</small>`; 
                 
                // Ensure that if the map is zoomed out such that
                // multiple copies of the feature are visible, the
                // popup appears over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                 
                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(
                        `<b>${name}</b> <br> ${description} <br> ${link}`
                    )
                    .addTo(map.current);
            });
                 
            map.current.on('mouseenter', 'clusters', () => {
                map.current.getCanvas().style.cursor = 'pointer';
            });
            map.current.on('mouseleave', 'clusters', () => {
                map.current.getCanvas().style.cursor = '';
            });
        })
    })

    return (
        <div ref={mapContainer} className="map-container" />
    )
}

export default DisplayMap; 