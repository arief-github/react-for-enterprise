import { describe, expect, it } from 'vitest';
import Accordion from './Accordion';
import { fireEvent, render, screen } from 'test-utils';

const accordionData = [
  {
    heading: 'One',
    content: 'Content One',
  },
  {
    heading: 'Two',
    content: 'Content Two',
  },
  {
    heading: 'Three',
    content: 'Content Three',
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const renderAccordion = (props = {}) => {
  render(<Accordion items={accordionData} {...props} />);
};

describe('Accordion.tsx', () => {
  // Negative Scenario
  it('Accordion content remains hidden if not clicked', () => {
    renderAccordion();

    const secondContent = screen.getByText(accordionData[1].content);
    expect(secondContent).toHaveClass('hidden');
  });

  it('Accordion content remain hidden if not clicked', () => {
    renderAccordion();

    const secondContent = screen.getByText(accordionData[1].content);
    expect(secondContent).toHaveClass('hidden');
  });

  it('Clicking one accordion item does not open others', () => {
    renderAccordion();

    const secondHeading = screen.getByText(accordionData[1].heading);
    fireEvent.click(secondHeading);

    const firstContent = screen.getByText(accordionData[0].content);
    const thirdContent = screen.getByText(accordionData[2].content);

    expect(firstContent).toHaveClass('hidden');
    expect(thirdContent).toHaveClass('hidden');
  });

  it('Clicking unrelated text does not toggle accordion', () => {
    renderAccordion();

    const unrelatedDiv = document.createElement('div');
    unrelatedDiv.textContent = 'Random Text';
    document.body.appendChild(unrelatedDiv);

    fireEvent.click(unrelatedDiv);

    screen.getAllByTestId('accordion-item-content').forEach((el) => {
      expect(el).toHaveClass('hidden');
    });
  });

  it('Renders nothing when items array is empty', () => {
    render(<Accordion items={[]} />);
    expect(
      screen.queryByTestId('accordion-item-content')
    ).not.toBeInTheDocument();
  });

  // Positive Scenario
  it('Accordion items have correct text', async () => {
    renderAccordion();

    // Match Text Content
    accordionData.forEach((data) => {
      screen.getByText(data.heading);
      screen.getByText(data.content);
    });
  });

  it('Each accordion item content is hidden at the start', async () => {
    renderAccordion();
    screen.getAllByTestId('accordion-item-content').forEach((el) => {
      expect(el).toHaveClass('hidden');
    });
  });

  it('Accordion item content is toggled on header click', async () => {
    renderAccordion();
    const heading = accordionData[1].heading;
    const content = accordionData[1].content;
    expect(screen.getByText(content)).toHaveClass('hidden');

    fireEvent.click(screen.getByText(heading));
    expect(screen.getByText(content)).toHaveClass('block');
  });
});
