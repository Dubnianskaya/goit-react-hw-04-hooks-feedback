import { memo, useState } from "react";
import Section from "../Section";
import FeedbackOptions from "../FeedbackOptions";
import Statistics from "../Statistics";
import Notification from "../Statistics/Notification";
import { Container } from "./App.styled";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedback = { good, neutral, bad };

  const handleStatistics = (key) => {
    switch (key) {
      case "good":
        setGood((prevState) => prevState + 1);
        break;
      case "neutral":
        setNeutral((prevState) => prevState + 1);
        break;
      case "bad":
        setBad((prevState) => prevState + 1);
        break;
      default:
        return;
    }
  };

  const totalFeedbacks = good + neutral + bad;

  const countPositiveFeedbackPercentage = (total) => {
    return Math.round((100 / total) * good);
  };

  const positivePercentage = countPositiveFeedbackPercentage(totalFeedbacks);

  return (
    <Container>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(feedback)}
          onLeaveFeedback={handleStatistics}
        />
      </Section>
      <Section title="Statistics">
        {totalFeedbacks ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedbacks}
            positivePercentage={
              Number.isNaN(positivePercentage) ? 0 : positivePercentage
            }
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </Container>
  );
}

export default memo(App);
