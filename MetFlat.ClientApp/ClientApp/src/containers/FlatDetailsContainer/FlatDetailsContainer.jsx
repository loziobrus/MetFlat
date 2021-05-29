import * as React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom'
import FlatDetails from '../../components/FlatDetails/FlatDetails.jsx'
import BookDetails from '../../components/BookDetails/BookDetails'
import './styles.css';  


class FlatDetailsContainer extends React.Component {
    render() {
        return (
            <div className="result-container">
                <FlatDetails />
                <BookDetails />
            </div>
        )
    }
}

export default FlatDetailsContainer