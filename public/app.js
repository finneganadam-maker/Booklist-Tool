function loeschenBestaetigen() {
  var antwort = confirm('Buch wirklich löschen?')
  return antwort
}

function filterBuecher() {
  var suchtext = document.getElementById('suchfeld').value.toLowerCase()
  console.log('Suche:', suchtext)

  var eintraege = document.getElementsByClassName('buch-eintrag')

  for (var i = 0; i < eintraege.length; i++) {
    var titel = eintraege[i].getElementsByClassName('buch-titel')[0].innerText.toLowerCase()
    var autor = eintraege[i].getElementsByClassName('buch-autor')[0].innerText.toLowerCase()

    if (titel.includes(suchtext) || autor.includes(suchtext)) {
      eintraege[i].style.display = ''
    } else {
      eintraege[i].style.display = 'none'
    }
  }
}
