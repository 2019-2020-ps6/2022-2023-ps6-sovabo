const QuizModel = require('./models/quiz.model.js');
const QuestionModel = require('./models/question.model.js');
const buildServer = require('./build-server.js');
const logger = require('./utils/logger.js');

const deleteAllData = () => {
  QuizModel.deleteAll();
  QuestionModel.deleteAll();
  logger.info('Données supprimées avec succès.');
};

//deleteAllData();

buildServer((server) => logger.info(`Le serveur écoute sur le port ${server.address().port}`));
