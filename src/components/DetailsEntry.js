import React, { Component } from 'react';
import { TextField } from '@material-ui/core';

class DetailsEntry extends Component {
    

    render() {
        return (
            <div>
                <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    onChange={this.props.onChange}
                    value={this.props.quizCount}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
            </div>
        );
    }
}

export default DetailsEntry;