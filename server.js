var express = require('express')
var mongoose = require('mongoose')
var app = express()

var PORT = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/buecherliste')
  .then(function() {
    console.log('MongoDB verbunden!')
  })
  .catch(function(err) {
    console.log('Fehler:', err)
  })

var Buch = require('./models/Buch')

app.get('/', function(req, res) {
  console.log('Startseite aufgerufen')
  Buch.find().then(function(buecher) {
      console.log('Bücher gefunden:', buecher.length)
      res.render('index', { buecher: buecher })
  }).catch(function(err) {
    console.log(err)
    res.send('Fehler beim Laden der Bücher')
  })
})

app.get('/neu', function(req, res) {
  res.render('neu')
})

app.post('/buch', function(req, res) {
  console.log(req.body)

  var neuesBuch = new Buch({
    titel: req.body.titel,
    autor: req.body.autor,
    seiten: req.body.seiten,
    gelesen: req.body.gelesen === 'on' ? true : false
  })

  neuesBuch.save().then(function() {
    res.redirect('/')
  })
  .catch(function(err) {
      console.log('Fehler beim Speichern:', err)
      res.send('Fehler')
  })
})

app.get('/buch/:id/bearbeiten', function(req, res) {
  var id = req.params.id

  Buch.findById(id)
    .then(function(buch) {
      if (!buch) {
        res.send('Nicht gefunden')
        return
      }
      res.render('bearbeiten', { buch: buch })
    }).catch(function(err) {
      console.log(err)
      res.send('Fehler')
    })
})

app.post('/buch/:id/bearbeiten', function(req, res) {
  var id = req.params.id

  Buch.findByIdAndUpdate(id, {
    titel: req.body.titel,
    autor: req.body.autor,
    seiten: req.body.seiten,
    gelesen: req.body.gelesen === 'on' ? true : false
  }).then(function() {
      console.log('gespeichert')
      res.redirect('/')
  })
  .catch(function(err) {
    console.log('Fehler beim Aktualisieren', err)
    res.send('Fehler')
  })
})

app.post('/buch/:id/loeschen', function(req, res) {
  var id = req.params.id
  console.log('löschen:', id)

  Buch.findByIdAndDelete(id)
    .then(function() {
        res.redirect('/')
    })
    .catch(function(err) {
      console.log(err)
      res.send('Fehler beim Löschen')
    })
})

app.listen(PORT, function() {
  console.log('Server läuft auf http://localhost:' + PORT)
})
