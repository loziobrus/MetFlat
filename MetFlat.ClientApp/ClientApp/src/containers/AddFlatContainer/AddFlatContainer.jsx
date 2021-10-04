import * as React from 'react';
import AddFlat from '../../components/AddFlat/AddFlat'
import AdBanner from '../../components/AdBanner/AdBanner'
import './styles.css';  


class AddFlatContainer extends React.Component {
    render() {
        return (
            <div className="result-container">
                <AddFlat />
                <AdBanner />
            </div>
        )
    }
}

export default AddFlatContainer