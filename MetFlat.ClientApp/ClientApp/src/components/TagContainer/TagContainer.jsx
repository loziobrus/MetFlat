import React from 'react';
import { Chip } from '@material-ui/core';
import "./styles.css"

class TagContainer extends React.Component {
  constructor(props){
    super(props)
  }
  
  
  render () {
    const { flat } = this.props

    return(
      <div className="tag-container">
        {flat.balcony && 
            <Chip className="tag" label="Balcony" />
        }
        {flat.elevator && 
            <Chip className="tag" label="Elevator" />
        }
        {flat.fridge && 
            <Chip className="tag" label="Fridge" />
        }
        {flat.iron && 
            <Chip className="tag" label="Iron" />
        }
        {flat.kitchen && 
            <Chip className="tag" label="Kitchen" />
        }
        {flat.microwave && 
            <Chip className="tag" label="Microwave" />
        }
        {flat.oven && 
            <Chip className="tag" label="Oven" />
        }
        {flat.parking && 
            <Chip className="tag" label="Parking" />
        }
        {flat.tv && 
            <Chip className="tag" label="TV" />
        }
        {flat.wifi && 
            <Chip className="tag" label="WIFI" />
        }
        {flat.withKids && 
            <Chip className="tag" label="With kids" />
        }
        {flat.withPets && 
            <Chip className="tag" label="With pets" />
        }
      </div>
    )
  }
}

export default TagContainer