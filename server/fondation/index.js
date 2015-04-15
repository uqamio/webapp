module.exports = {
    journalisation: require('./lib/logger'),
    authentification: {
        passport: require('./lib/authentification-usager').passport
    }
};