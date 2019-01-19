import React from 'react';
import Wizard from './Wizard';
import renderer from 'react-test-renderer';

debugger;

const generateStep = key => ({
  key: key,
  title: `${key} - title`,
  description: `${key} - description`,
  render: nextButton => (
    <div>
      <p>
        This is where the content for {key} goes, below is the next/done button.
      </p>
      {nextButton()}
    </div>
  ),
});

describe('Rendering tests', () => {
  test('Single step', () => {
    const steps = [generateStep('test')];
    const wizard = renderer.create(<Wizard steps={steps} />);
    expect(wizard.toJSON()).toMatchSnapshot();
  });

  test('Multiple steps', () => {
    const steps = [
      generateStep('item-1'),
      generateStep('item-2'),
      generateStep('item-3'),
    ];
    const wizard = renderer.create(<Wizard steps={steps} />);
    expect(wizard.toJSON()).toMatchSnapshot();
  });
});

describe('Interactions tests', () => {
  const steps = [
    generateStep('item-1'),
    generateStep('item-2'),
    generateStep('item-3'),
  ];
  let wizard;
  const onComplete = jest.fn();

  beforeEach(() => {
    wizard = renderer.create(<Wizard steps={steps} onComplete={onComplete} />);
  });

  afterEach(() => {
    onComplete.mockClear();
  });

  test('Clicking on the next button shows next step', () => {
    wizard.root
      .findByProps({ wizardIdentifier: 'next-done-button' })
      .props.onClick();
    expect(wizard.toJSON()).toMatchSnapshot();
  });

  test('Clicking on the done button calls onComplete', () => {
    wizard.root
      .findByProps({ wizardIdentifier: 'next-done-button' })
      .props.onClick();
    wizard.root
      .findByProps({ wizardIdentifier: 'next-done-button' })
      .props.onClick();
    expect(wizard.toJSON()).toMatchSnapshot();
    wizard.root
      .findByProps({ wizardIdentifier: 'next-done-button' })
      .props.onClick();
    expect(onComplete.mock.calls.length).toBe(1);
  });
});
