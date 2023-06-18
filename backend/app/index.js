const QuizModel = require('./models/quiz.model.js')
const QuestionModel = require('./models/question.model.js')
const ConfigurationModel = require('./models/configuration.model')
const userModel = require('./models/user.model.js')
const buildServer = require('./build-server.js')
const logger = require('./utils/logger.js')
const { Configuration } = require('./models/index.js')
const CodeAccesModel = require('./models/codeAcces.model.js')
const { Answer } = require('./models')

const deleteAllData = () => {
  QuizModel.deleteAll()
  userModel.deleteAll()
  QuestionModel.deleteAll()
  Configuration.deleteAll()
  logger.info('Données supprimées avec succès.')
}

const codeAcces = () => {
  CodeAccesModel.create({ code: '1234' })
  logger.info('Code Accès créé avec succès.')
}

async function createSampleData() {
  try {
    // Création de deux objets Configuration
    const config1 = ConfigurationModel.create({
      animateur: true,
      animateurImagePath: 'path/to/animateur1.jpg',
      animation: false,
      animationSpeed: 'normal',
      sliderPosition: 50,
      duration: '00:05:00',
      contraste: true,
      jeuCouleur: -1,
    })

    const config2 = ConfigurationModel.create({
      animateur: false,
      animateurImagePath: 'path/to/animateur2.jpg',
      animation: true,
      animationSpeed: 'fast',
      sliderPosition: 30,
      duration: '00:10:00',
      contraste: false,
      jeuCouleur: 0,
    })

    // Création de deux objets User
    userModel.createUser({
      name: 'John Doe',
      imagePath: 'bear/bear-emoji-normal.png.png',
      color: '#ffffff',
      configuration: config1,
      selected: false,
    })

    userModel.createUser({
      name: 'Jane Smith',
      imagePath: 'cat/cat-emoji-normal.png',
      color: '#ff0000',
      configuration: config2,
      selected: true,
    })

    // Création de deux objets Quiz
    QuizModel.create({
      hovered: false,
      name: 'Quiz sur les capitales',
      desc: 'Testez vos connaissances sur les capitales du monde.',
      theme: 'Géographie',
      questions: [
        {
          label: 'Quelle est la capitale de la France ?',
          answers: [
            {
              type: 'text',
              value: 'Paris',
              isCorrect: true,
            },
            {
              type: 'text',
              value: 'Londres',
              isCorrect: false,
            },
            {
              type: 'text',
              value: 'Berlin',
              isCorrect: false,
            },
          ],
        },
        {
          label: 'Quelle est la capitale de l\'Espagne ?',
          answers: [
            {
              type: 'text',
              value: 'Madrid',
              isCorrect: true,
            },
            {
              type: 'text',
              value: 'Rome',
              isCorrect: false,
            },
            {
              type: 'text',
              value: 'Athènes',
              isCorrect: false,
            },
          ],
        },
      ],
      difficulty: 2,
      image: 'https://www.actualitix.com/wp-content/uploads/2017/08/carte-capitales-du-monde.jpg',
    })

    QuizModel.create({
      hovered: false,
      name: 'Quiz de mathématiques',
      desc: 'Testez vos compétences en mathématiques avec ce quiz.',
      theme: 'Mathématiques',
      questions: [
        {
          label: 'Quel est le résultat de 2 + 2 ?',
          answers: [
            {
              type: 'text',
              value: '4',
              isCorrect: true,
            },
            {
              type: 'text',
              value: '5',
              isCorrect: false,
            },
            {
              type: 'text',
              value: '3',
              isCorrect: false,
            },
          ],
        },
        {
          label: 'Quelle est la racine carrée de 16 ?',
          answers: [
            {
              type: 'text',
              value: '4',
              isCorrect: true,
            },
            {
              type: 'text',
              value: '2',
              isCorrect: false,
            },
            {
              type: 'text',
              value: '8',
              isCorrect: false,
            },
          ],
        },
      ],
      difficulty: 3,
      image: 'https://lycee-marchal.com/sites/default/files/imce/spe-maths-image.jpg',
    })

    QuizModel.save()
    ConfigurationModel.save()
    userModel.save()

    console.log('Échantillons de données créés avec succès !')
  } catch (error) {
    console.error('Erreur lors de la création des échantillons de données :', error)
  }
}


deleteAllData()
codeAcces()
createSampleData()

buildServer((server) => logger.info(`Le serveur écoute sur le port ${server.address().port}`))
