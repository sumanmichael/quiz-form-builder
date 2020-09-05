import React, { Component } from 'react';
import { FormLabel, FormControl, FormControlLabel, RadioGroup, Radio, List, ListItem } from '@material-ui/core';   

class RadioButtons extends Component {
    

    render() {
        const RadioItems = []
        
        const { number } = this.props
        
        for (let i = 0; i < number; i++) {
            RadioItems.push(
                <ListItem key={i+1} style={{display:'flex', justifyContent:'center'}} divider>
                    <FormControl margin="normal" component="fieldset">
                        <FormLabel component="legend">Question: {i+1}</FormLabel>    
                        <RadioGroup row aria-label="gender" name="gender1" defaultValue="A">
                            {/* TODO: Remove default value an dput required */}
                            <FormControlLabel value="A" control={<Radio />} label="A" />
                            <FormControlLabel value="B" control={<Radio />} label="B" />
                            <FormControlLabel value="C" control={<Radio />} label="C" />
                            <FormControlLabel value="D" control={<Radio />} label="D" />
                        </RadioGroup>
                    </FormControl>
                </ListItem>
            )
        }

        return (
            <List>
                {RadioItems}
           </List>
        );
    }
}

export default RadioButtons;