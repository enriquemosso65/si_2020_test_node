var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Comic = require('../model/comics.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/saluda',(req,res,next)=>{
  res.render('hola',{nombre:'Jesus',
  colores:[
          {id:1,nombre:"rojo"},
          {id:2,nombre:"verde"},
          {id:3,nombre:"azul"},
          {id:4,nombre:"Amarillo"}
          ]
  });
});
 
router.get('/alta', (req,res,next)=>{
    res.render('alta_comic',{});
});

router.post('/grabar',(req, res, next)=>{
  console.log(req.body);
  var nom=req.body.nombre;
  var url=req.body.imagen;
  var poder=req.body.poder;
  var miComic = Comic(
    {
      nombre: nom,
      imagen: url,
      poderes: poder
    }
  );
  miComic.save((err,data)=>{
    if(err) res.send('Error al guardar datos');
    else res.render('alta_ok', data);
  });
});

router.get('/listar',(req,res,next)=>{
  Comic.find({}, (err,data)=>{
    console.log(data);
    if(err) res.sedn("error"+err);
    else res.render('catalgo', {comics:data});
    });

});
module.exports = router;
