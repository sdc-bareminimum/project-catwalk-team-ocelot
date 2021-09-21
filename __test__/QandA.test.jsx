/**
 * @jest-environment jsdom
 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
// import App from '../client/src/components/App.jsx';
import { ProductProvider } from '../client/src/components/ProductContext.jsx';
import QuestionsAndAnswers from '../client/src/components/QuestionsAndAnswers.jsx';
import QuestionsList from '../client/src/components/Q&A-Components/QuestionsList.jsx';
import Question from '../client/src/components/Q&A-Components/Question.jsx';
import Answer from '../client/src/components/Q&A-Components/Answer.jsx';
import SearchQuestion from '../client/src/components/Q&A-Components/SearchQuestion.jsx';

const questionData = {
  question_id: 425914,
  question_body: 'Can you put these in the washing machine ??',
  question_date: '2021-09-15T00:00:00.000Z',
  asker_name: 'Seller',
  question_helpfulness: 6,
  reported: false,
  answers: {
    3989584: {
      id: 3989584,
      body: 'Yes!',
      date: '2021-09-16T00:00:00.000Z',
      answerer_name: 'Seller',
      helpfulness: 4,
      photos: [],
    },
    3989588: {
      id: 3989588,
      body: 'Mine is from India',
      date: '2021-09-16T00:00:00.000Z',
      answerer_name: 'kitty',
      helpfulness: 0,
      photos: [],
    },
    3989589: {
      id: 3989589,
      body: 'Mine is from India',
      date: '2021-09-16T00:00:00.000Z',
      answerer_name: 'kitty',
      helpfulness: 0,
      photos: [],
    },
    3989590: {
      id: 3989590,
      body: 'Mine is from China',
      date: '2021-09-16T00:00:00.000Z',
      answerer_name: 'hahaha',
      helpfulness: 0,
      photos: [],
    },
  },
};

const AnswerData = {
  answer_id: 3989584,
  body: 'Yes!',
  date: '2021-09-16T00:00:00.000Z',
  answerer_name: 'Seller',
  helpfulness: 4,
  photos: [],
};

const Questions = [
  {
    question_id: 425951,
    question_body: 'Where is this product made?',
    question_date: '2021-09-16T00:00:00.000Z',
    asker_name: 'alex',
    question_helpfulness: 4,
    reported: false,
    answers: {
      3989585: {
        id: 3989585,
        body: 'Made in Canada',
        date: '2021-09-16T00:00:00.000Z',
        answerer_name: 'Seller',
        helpfulness: 3,
        photos: [],
      },
    },
  },
  {
    question_id: 426043,
    question_body: 'Where does this product ship from?',
    question_date: '2021-09-17T00:00:00.000Z',
    asker_name: 'linda',
    question_helpfulness: 3,
    reported: false,
    answers: {
      3989645: {
        id: 3989645,
        body: 'Mine is from India',
        date: '2021-09-17T00:00:00.000Z',
        answerer_name: 'Alex',
        helpfulness: 3,
        photos: [],
      },
    },
  },
];

jest.mock('axios');

it('renders QandA without crashing', () => {
  const div = document.createElement('div');
  const productId = 42366;
  // eslint-disable-next-line max-len
  ReactDOM.render(<ProductProvider><QuestionsAndAnswers productId={productId} /></ProductProvider>, div);
});

it('renders SearchQuestion without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProductProvider><SearchQuestion /></ProductProvider>, div);
});

it('renders Question without crashing', () => {
  const div = document.createElement('div');
  const productId = 42366;
  ReactDOM.render(
    <ProductProvider>
      <Question
        productId={productId}
        key={425914}
        question={questionData}
      />
    </ProductProvider>, div,
  );
});

it('renders Answer without crashing', () => {
  const div = document.createElement('div');
  // const productId = 42366;

  ReactDOM.render(
    <ProductProvider>
      <Answer
        // productId={productId}
        answer={AnswerData}
      />
    </ProductProvider>, div,
  );
});

it('renders QuestionsList without crashing', () => {
  const div = document.createElement('div');
  const productId = 42366;

  ReactDOM.render(
    <ProductProvider>
      <QuestionsList
        productId={productId}
        questions={Questions}
        moreQuestions={false}
        search={false}
      />
    </ProductProvider>, div,
  );
});
