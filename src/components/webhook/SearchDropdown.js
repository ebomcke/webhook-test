import React, { Component } from 'react';
import { compose } from 'recompose';
import { withEndpoints } from '../../contexts/Endpoints';
import { Dropdown, Label, LabelDetail, Icon, Segment } from 'semantic-ui-react';

class SearchDropdown extends Component {
  constructor(props) {
    super(props);
    let options = props.endpoints.map(endpoint => ({
      key: endpoint.id,
      text: `url: /${endpoint.path}`,
      value: endpoint.id,
      type: 'path',
      filtervalue: endpoint.path,
    }));
    const { filters } = this.props;
    const contentFilters = filters.filter(f => f.type === 'content');
    if (contentFilters.length > 0) {
      options = options.concat(contentFilters.map(f => this.generateContentOption(f.value)));
    }
    this.state = {
      options,
    };
  }

  generateContentOption = (value) => ({
    key: `content-${value}`,
    text: `content: ${value}`,
    value,
    type: 'content',
    filtervalue: value,
  })

  addContentSearch = (e, { value }) => {
    const { options } = this.state;
    if (!options.find(o => o.value === value)) {
      options.push(this.generateContentOption(value));
      this.setState({ options });
      const { filters, updateFilters } = this.props;
      updateFilters(
        filters.concat([
          {
            type: 'content',
            value: value,
          },
        ]),
      );
    }
  };

  handleChange = (e, { value: values }) => {
    const { options } = this.state;
    const filters = values
      .map(value => options.find(o => o.value === value))
      .map(
        o =>
          o && {
            type: o.type,
            value: o.filtervalue,
          },
      )
      .filter(f => f);
    this.props.updateFilters(filters);
  };

  render() {
    const { options } = this.state;
    const { filters } = this.props;
    const defaultValue = filters.map(
      f =>
        options.find(o => o.type === f.type && o.filtervalue === f.value).value,
    );
    return (
      <Dropdown
        fluid
        multiple
        search
        selection
        placeholder="Filter by content and/or url"
        allowAdditions={true}
        defaultValue={defaultValue}
        additionLabel="content: "
        onAddItem={this.addContentSearch}
        closeOnChange={true}
        openOnFocus={false}
        icon="search"
        options={options}
        onChange={this.handleChange}
      />
    );
  }
}

export default compose(withEndpoints)(SearchDropdown);
