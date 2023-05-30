const QuizModel = require('./models/quiz.model.js');
const QuestionModel = require('./models/question.model.js');
const userModel = require('./models/user.model.js');
const buildServer = require('./build-server.js');
const logger = require('./utils/logger.js');
const { Configuration } = require('./models/index.js');
const CodeAccesModel = require('./models/codeAcces.model.js');

const deleteAllData = () => {
  QuizModel.deleteAll();
  userModel.deleteAll();
  QuestionModel.deleteAll();
  Configuration.deleteAll();
  logger.info('Données supprimées avec succès.');
};

//deleteAllData();

const codeAcces = () => {
    CodeAccesModel.create({ code: '1234' });
    logger.info('Code Accès créé avec succès.');
};

codeAcces();

async function createSampleData() {
  try {
    // Création de deux objets User
    const user1 = userModel.createUser({
      name: 'John Doe',
      imagePath: 'path/to/image1.jpg',
      color: '#ffffff',
      configuration: { /* ... */ }
    });

    const user2 = userModel.createUser({
      name: 'Jane Smith',
      imagePath: 'path/to/image2.jpg',
      color: '#ff0000',
      configuration: { /* ... */ }
    });

    // Création de deux objets Configuration
    const config1 = configurationModel.create({
      animateur: true,
      animateurImagePath: 'path/to/animateur1.jpg',
      animation: false,
      animationSpeed: 'normal',
      sliderPosition: 50,
      duration: '00:05:00',
      contraste: true
    });

    const config2 = configurationModel.create({
      animateur: false,
      animateurImagePath: 'path/to/animateur2.jpg',
      animation: true,
      animationSpeed: 'fast',
      sliderPosition: 30,
      duration: '00:10:00',
      contraste: false
    });

    // Création de deux objets Quiz
    const quiz1 = quizModel.create({
      name: 'Quiz 1',
      desc: 'Description du Quiz 1',
      theme: 'Thème 1',
      /* ... */
    });

    const quiz2 = quizModel.create({
      name: 'Quiz 2',
      desc: 'Description du Quiz 2',
      theme: 'Thème 2',
      /* ... */
    });

    // Création de deux objets Question
    const question1 = questionModel.create({
      label: 'Question 1',
      answers: [ /* ... */ ],
    });

    const question2 = questionModel.create({
      label: 'Question 2',
      answers: [ /* ... */ ],
    });

    console.log('Échantillons de données créés avec succès !');
  } catch (error) {
    console.error('Erreur lors de la création des échantillons de données :', error);
  }
}


//createSampleData();

buildServer((server) => logger.info(`Le serveur écoute sur le port ${server.address().port}`));
