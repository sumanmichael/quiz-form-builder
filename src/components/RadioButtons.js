import React, { Component } from "react";
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  List,
  ListItem,
} from "@material-ui/core";

class RadioButtons extends Component {
  constructor(props) {
    super(props);

    const { number } = this.props;
    const data = {};
    for (let i = 0; i < number; i++) {
      data[i + 1] = "A";
    }

    this.state = { data };
    this.optionChange = this.optionChange.bind(this);
  }

  componentWillUnmount() {
    const { data } = this.state;
    this.props.handleMcqsChange(data);
  }

  optionChange = (e) => {
    const { data } = this.state;
    data[e.target.name] = e.target.value;
    this.setState({ data });
  };

  render() {
    const RadioItems = [];
    const { number } = this.props;
    const { data } = this.state;

    for (let i = 0; i < number; i++) {
      RadioItems.push(
        <ListItem
          key={i + 1}
          style={{ display: "flex", justifyContent: "center" }}
          divider
        >
          <FormControl margin="normal" component="fieldset">
            <FormLabel component="legend">Question: {i + 1}</FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name={`${i + 1}`}
              // defaultValue="A"
              value={data[i + 1]}
              onChange={this.optionChange}
            >
              {/* TODO: Remove default value an dput required */}
              <FormControlLabel value="A" control={<Radio />} label="A" />
              <FormControlLabel value="B" control={<Radio />} label="B" />
              <FormControlLabel value="C" control={<Radio />} label="C" />
              <FormControlLabel value="D" control={<Radio />} label="D" />
            </RadioGroup>
          </FormControl>
        </ListItem>
      );
    }

    return <List>{RadioItems}</List>;
  }
}

export default RadioButtons;
