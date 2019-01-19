import React, { Component } from 'react';
import { StepGroup, Form } from 'semantic-ui-react';

class Wizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
    };
  }

  nextStep = () => {
    const { steps, onComplete } = this.props;
    const activeStep = this.state.activeStep;
    if (activeStep < steps.length - 1) {
      this.setState({
        activeStep: activeStep + 1,
      });
    } else {
      onComplete();
    }
  }

  render() {
    const { steps } = this.props;
    const stepItems = steps.map((step, index) => ({
      key: step.key,
      title: step.title,
      icon: step.icon,
      description: step.description,
      active: index === this.state.activeStep,
      disabled: index > this.state.activeStep,
    }));
    const activeStep = steps[this.state.activeStep];
    const nextButton = () => (
      <Form.Button
        onClick={this.nextStep}
        disabled={activeStep.nextDisabled && activeStep.nextDisabled()}
      >
        {this.state.activeStep === steps.length - 1 ? 'Done' : 'Next'}
      </Form.Button>
    );
    return (
      <div>
        <StepGroup fluid items={stepItems} />
        {activeStep.render(nextButton)}
      </div>
    );
  }
}

export default Wizard;
