import React, { Component } from 'react'
import './styles.css'


class AdBanner extends Component {
    render() {
        return(
            <header>
                    <form className="ads" onSubmit={this.handleSubmit}>
                        <div>
                            Ads
                        </div>
                        <br/>
                        <div>
                            (Coming soon)
                        </div>
                    </form>
            </header>
        )
    }
}

export default AdBanner