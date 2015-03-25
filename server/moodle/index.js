module.exports = { 
    passerelle: {
        coteFinales : function(req, res, next){
            console.log('Dans cote finales');
            res.send('Coucou 2!');
            next();
        }
    }  
};

