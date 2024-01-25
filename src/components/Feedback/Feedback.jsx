import { useState } from 'react';

import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Notification from './Notification';

const feedbackOptions = ['good', 'neutral', 'bad'];

const Feedback = () => {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const countTotalFeedback = () => {
    const { good, neutral, bad } = state;
    const total = good + neutral + bad;
    return total;
  };

  const countPositiveFeedbackPercentage = propName => {
    const total = countTotalFeedback();
    if (!total) {
      return 0;
    }
    const value = state[propName];
    return Number(((value / total) * 100).toFixed(0));
  };

  const leaveFeedback = propName => {
    setState(prevState => {
      return {
        ...prevState,
        [propName]: prevState[propName] + 1,
      };
    });
  };

  const { good, neutral, bad } = state;

  const total = countTotalFeedback();
  const percentOfPositive = countPositiveFeedbackPercentage('good');

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions
          feedbackOptions={feedbackOptions}
          leaveFeedback={leaveFeedback}
        />
      </Section>
      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            percentOfPositive={percentOfPositive}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

export default Feedback;
