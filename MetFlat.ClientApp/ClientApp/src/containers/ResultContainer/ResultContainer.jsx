import * as React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom'
import FlatList from '../../components/FlatList/FlatList'
import Filters from '../../components/Filters/Filters'
import './styles.css';  


class ResultContainer extends React.Component {
    render() {
        return (
            <div className="result-container">
                <FlatList />
                <Filters />
            </div>
        )
    }
}

export default ResultContainer