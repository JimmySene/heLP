// Test du navigateur
var regexp = /Firefox/;
if (!regexp.test(navigator.userAgent)) {
  document.getElementById('loadingScreen').style.display = "none";
  document.getElementById('firefox-missing').style.display = "block";
} else {
  window.onunload = window.onbeforeunload = function(event) {
    return "Les données saisies pourraient ne pas être enregistrées.";
  };
  startTime();
  startDate();
  window.addEventListener('load', function(event) {
    $('.carousel').carousel('pause');
    addTranslationInDOM();
    form = document.getElementById('form');

    // Gestion du swipe
    $(".item").on( "swipeleft", swipeleftHandler );
    $(".item").on( "swiperight", swiperightHandler );

    function swipeleftHandler( event ){
      var item = document.getElementsByClassName('item active')[0];
      if (item.dataset['swipeleft'] == undefined) {
        $('.carousel').carousel('next');
      }
    }

    function swiperightHandler( event ){
      var item = document.getElementsByClassName('item active')[0];
      if (item.dataset['swiperight'] == undefined) {
        $('.carousel').carousel('prev');
      }
    }

    // EVENEMENTS

    // Ajout d'une nouvelle ligne de saisie pour les objets voles
    $(document).on('click', '.btn-add-objet', function(e) {
      e.preventDefault();

      var controlForm = $('.controls-objets:first');
      var currentEntry = $(this).parents('.entry-objets:first');
      var newEntry = $(currentEntry.clone()).appendTo(controlForm);

      // ajouter les langues RTL en premier, francais juste apres RTL et avant les autres LTR
      var deleteButtonHTML = "";
      deleteButtonHTML += "<span lang='ar'>"+arabe["element_80"]+"</span>";
      deleteButtonHTML += "<span lang='fr'>"+francais["element_80"]+"</span>";
      deleteButtonHTML += "<span lang='en'>"+anglais["element_80"]+"</span>";
      deleteButtonHTML += "<span lang='de'>"+allemand["element_80"]+"</span>";
      deleteButtonHTML += "<span lang='zh'>"+chinois["element_80"]+"</span>";
      deleteButtonHTML += "<span lang='ko'>"+coreen["element_80"]+"</span>";
      deleteButtonHTML += "<span lang='es'>"+espagnol["element_80"]+"</span>";
      deleteButtonHTML += "<span lang='it'>"+italien["element_80"]+"</span>";
      deleteButtonHTML += "<span lang='ja'>"+japonais["element_80"]+"</span>";
      deleteButtonHTML += "<span lang='tr'>"+turc["element_80"]+"</span>";
      deleteButtonHTML += "<span lang='ru'>"+russe["element_80"]+"</span>";

      newEntry.find('input').val('');
      controlForm.find('.entry-objets:not(:last) .btn-add-objet')
      .removeClass('btn-add-objet')
      .addClass('btn-remove-objet')
      .removeClass('btn-success')
      .addClass('btn-danger')
      .html(deleteButtonHTML)
    });

    // Suppression d'une ligne de saisie d'objet vole
    $(document).on('click', '.btn-remove-objet', function(e) {
      $(this).parents('.entry-objets:first').remove();
      e.preventDefault();
      return false;
    });

    // Affichage d'un champ de saisie supplementaire lorsque 'AUTRE' est selectionne
    // dans une liste deroulante
    select1.addEventListener('change', function(event) {
      if (select1.value == 'Autre') {
        autreLocalisationInput.style.display = 'inline';
      } else {
        autreLocalisationInput.style.display = 'none';
      }
    });

    select2.addEventListener('change', function(event) {
      if (select2.value == 'Autre') {
        typeCheveuxInput.style.display = 'inline';
      } else {
        typeCheveuxInput.style.display = 'none';
      }
    });

    select4.addEventListener('change', function(event) {
      if (select4.value == 'Autre') {
        typeCheveuxInputBis.style.display = 'inline';
      } else {
        typeCheveuxInputBis.style.display = 'none';
      }
    });

    // Activation/Desactivation du bouton de transmission d'une plainte lorsqu'un
    // SJS est selectionné
    select5.addEventListener('change', function(event) {
      toggleSJS();
    });

    // Permet de transmettre la plainte
    transmettreBouton.addEventListener('click', function() {
      if (confirm("Transmettre la plainte ?") == true) {
        envoyerPlainte();
      }
    });

    auteurPresumeInput.addEventListener('input', function(event) {
      var binds = document.getElementsByClassName('data-bind');
      if (auteurPresumeInput.value == "") {
        form.element_100.value = 'X';
      } else {
        form.element_100.value = 'QQN';
      }
      for (var i = 0; i < binds.length; i++) {
        binds[i].innerHTML = auteurPresumeInput.value;
      }
    });

    // Permet d'effacer la signature de la victime
    resetButtonVictime.addEventListener('click', function(event) {
      signaturePadVictime.clear();
    });

    // Permet de d'effacer la signature du policier
    resetButtonAgent.addEventListener('click', function(event) {
      signaturePadAgent.clear();
    });

    versionButton.addEventListener('click', function(event) {
      var attribution = document.getElementById('attribution');
      if (attribution.style.display == 'none') {
        $("#attribution").fadeIn(400);
      } else {
        $("#attribution").fadeOut(400);
      }
    });

    // Initialisation des differents datepicker
    $('#element_6').datepicker({
      format: "dd/mm/yyyy",
      endDate: "+0d",
      weekStart: 1,
      autoclose: true,
      maxViewMode: 3,
      todayHighlight: true,
      todayBtn: "linked",
      language: "fr"
    });

    $('#element_12').datepicker({
      format: "dd/mm/yyyy",
      endDate: "+0d",
      weekStart: 1,
      todayHighlight: true,
      startView: 3,
      maxViewMode: 3,
      language: "fr"
    });

    $('#element_21').datepicker({
      format: "dd/mm/yyyy",
      startDate: "+0d",
      weekStart: 1,
      maxViewMode: 2,
      todayBtn: "linked",
      todayHighlight: true
    });

    // Gestion des barres de progressions
    initProgressBars();

    recupererIdentiteAgent();

    // Reset de la plaite (mise en cache par le navigateur) au 1er lancement
    resetPlainte();

    // Animation de chargement
    setTimeout(function() {
      $("#loadingScreen").fadeOut(600);
      $("#accueil").fadeIn(600);
    }, 600);

  });
}

// Variables globales
var resetButtonVictime = document.getElementById('resetButtonVictime');
var resetButtonAgent = document.getElementById('resetButtonAgent');
var transmettreBouton = document.getElementById('transmettreBouton');
var canvasVictime = document.getElementById('canvasVictime');
var canvasAgent = document.getElementById('canvasAgent');
var select1 = document.getElementById('select1');
var select2 = document.getElementById('select2');
var select4 = document.getElementById('select4');
var select5 = document.getElementById('select5');
var versionButton = document.getElementById('version');
var autreLocalisationInput = document.getElementById('autreLocalisationInput');
var auteurPresumeInput = document.getElementById('auteurPresumeInput');
var typeCheveuxInput = document.getElementById('typeCheveuxInput');
var typeCheveuxInputBis = document.getElementById('typeCheveuxInput_bis');
var signaturePadVictime = new SignaturePad(canvasVictime, {
  throttle: 1
});
var signaturePadAgent = new SignaturePad(canvasAgent, {
  throttle: 1
});
var signVictime;
var signAgent;
var ltr = true;
var currentLang;
var dateString;
var timeString;
var NOM_AGENT = "NOM_AGENT";
var PRENOM_AGENT = "PRENOM_AGENT";
var GRADE_AGENT = "GRADE_AGENT";
var AFFECTATION_AGENT = "AFFECTATION_AGENT";


// Ajout dans le DOM des traduction des langues supportées, sauf pour les listes
// déroulantes (option des selects)
// ajouter les langues RTL en premier, francais juste apres RTL et avant les autres LTR
function addTranslationInDOM() {
  var elements = document.getElementsByClassName('trad');
  var length = elements.length;
  for (var i = 0; i < elements.length; i++) {
    var content = elements[i].dataset['content'];
    elements[i].innerHTML += '<span lang="'+arabe["lang"]+'">'+arabe[content]+"</span>";
    elements[i].innerHTML += '<span lang="'+francais["lang"]+'">'+francais[content]+'</span>';
    elements[i].innerHTML += '<span lang="'+anglais["lang"]+'">'+anglais[content]+'</span>';
    elements[i].innerHTML += '<span lang="'+allemand["lang"]+'">'+allemand[content]+"</span>";
    elements[i].innerHTML += '<span lang="'+chinois["lang"]+'">'+chinois[content]+'</span>';
    elements[i].innerHTML += '<span lang="'+coreen["lang"]+'">'+coreen[content]+'</span>';
    elements[i].innerHTML += '<span lang="'+espagnol["lang"]+'">'+espagnol[content]+"</span>";
    elements[i].innerHTML += '<span lang="'+italien["lang"]+'">'+italien[content]+'</span>';
    elements[i].innerHTML += '<span lang="'+japonais["lang"]+'">'+japonais[content]+'</span>';
    elements[i].innerHTML += '<span lang="'+turc["lang"]+'">'+turc[content]+'</span>';
    elements[i].innerHTML += '<span lang="'+russe["lang"]+'">'+russe[content]+'</span>';
  }
  console.log("9 langues ajoutées");
}

// Permet de changer la direction d'affichage de la page
function changeDirection(dir) {
  if (ltr && dir == 'rtl') {
    document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    ltr = !ltr;
  } else if (!ltr && dir == 'ltr') {
    document.getElementsByTagName('html')[0].removeAttribute('dir');
    ltr = !ltr;
  }
}

// Permet de changer la langue des datepicker lors d'un changement de langue
function switchDatePicker(lang) {
  $("#element_6").datepicker('destroy');
  $("#element_12").datepicker('destroy');
  $("#element_21").datepicker('destroy');

  var locale;
  switch (lang) {
    case "zh":
    locale = "zh-CN"
    break;
    default:
    locale = lang;
    break;
  }

  $('#element_6').datepicker({
    format: "dd/mm/yyyy",
    weekStart: 1,
    autoclose: true,
    endDate: "+0d",
    todayHighlight: true,
    maxViewMode: 3,
    todayBtn: "linked",
    language: locale
  });

  var d = new Date();
  var today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  $("#element_6").datepicker('update', today);

  $('#element_12').datepicker({
    format: "dd/mm/yyyy",
    weekStart: 1,
    endDate: "+0d",
    todayHighlight: true,
    startView: 3,
    maxViewMode: 3,
    language: locale
  });

  $('#element_21').datepicker({
    format: "dd/mm/yyyy",
    weekStart: 1,
    startDate: "+0d",
    maxViewMode: 2,
    todayBtn: "linked",
    todayHighlight: true,
    language: locale
  });

}

// Change la 'langue' de la page en modifiant dynamiquement le css des elements 'span'
function affiche(lang) {
  var spans = document.getElementsByTagName('span');
  var length = spans.length;
  if (lang == 'ar') {
    changeDirection("rtl");
  } else {
    changeDirection("ltr");
  }
  currentLang = lang;
  switchDatePicker(lang);
  for (var i = 0; i < spans.length; i++) {
    var span = spans[i];
    if (span.lang == lang || span.lang == "fr") {
      span.style.display = "inline";
    } else if (span.lang != "") {
      span.style.display = "none";
    }
  }

  // Traitement différent pour les elements 'option' car ils ne peuvent pas
  // contenir de noeuds 'enfants'
  var options = document.getElementsByTagName('option');
  length = options.length;
  for (var i = 0; i < options.length; i++) {
    var option = options[i];
    var content = option.dataset['content'];
    var boutonLangue = document.getElementById("boutonLangue");
    // <span lang='fr' class="caret"></span>
    var boutonLangueText;
    if (content != undefined) {

      switch (lang) {
        case "fr":
        option.innerHTML = francais[content];
        boutonLangueText = "Français";
        break;
        case "ar":
        option.innerHTML = arabe[content] + francais[content] ;
        boutonLangueText = "Arabe";
        break;
        case "en":
        option.innerHTML = francais[content] + anglais[content];
        boutonLangueText = "Anglais";
        break;
        case "de":
        option.innerHTML = francais[content] + allemand[content];
        boutonLangueText = "Allemand";
        break;
        case "zh":
        option.innerHTML = francais[content] + chinois[content];
        boutonLangueText = "Chinois";
        break;
        case "ko":
        option.innerHTML = francais[content] + coreen[content];
        boutonLangueText = "Coréen";
        break;
        case "es":
        option.innerHTML = francais[content] + espagnol[content];
        boutonLangueText = "Espagnol";
        break;
        case "it":
        option.innerHTML = francais[content] + italien[content];
        boutonLangueText = "Italien";
        break;
        case "ja":
        option.innerHTML = francais[content] + japonais[content];
        boutonLangueText = "Japonais";
        break;
        case "tr":
        option.innerHTML = francais[content] + turc[content];
        boutonLangueText = "Turc";
        break;
        case "ru":
        option.innerHTML = francais[content] + russe[content];
        boutonLangueText = "Russe";
        break;

        default:
        console.error("Je ne dois pas passer ici");
      }
    }
    boutonLangue.innerHTML = boutonLangueText + "<span lang='fr' class='caret'></span>"
  }
}

// Permet d'afficher l'ecran de prise de plainte avec la langue selectionne
// depuis l'ecran d'accueil
function afficherTexte(lang) {
  $("#accueil").fadeOut(500);
  $("#myCarousel").delay(500).fadeIn(500);
  affiche(lang);
}

// Permet de revenir a l'ecran d'accueil et de reinitialiser le formulaire + confirmation
function retourAccueilConfirm() {
  if (confirm("Voulez-vous revenir à l'écran d'accueil ? Les champs saisis seront alors perdus.") == true) {
    retourAccueil();
  }
}

// Permet de revenir a l'ecran d'accueil et de reinitialiser le formulaire sans confirmation
function retourAccueil() {
  $("#myCarousel").hide(500);
  $("#accueil").show(500);
  if (!ltr) {
    changeDirection("ltr");
  }
  resetPlainte();
  // remettre la premiere page active
  document.getElementsByClassName("item active")[0].classList.remove('active');
  document.getElementsByClassName("item")[0].classList.add('active');
}

// Permet de reinitialiser la plainte
function resetPlainte() {

  // reinitialisation de tout les champs de formulaire et de la signature
  signaturePadVictime.clear();
  signaturePadAgent.clear();
  var entries = document.getElementsByClassName('entry-objets');
  while (entries.length > 1) {
    entries[0].remove();
  }
  typeCheveuxInput.style.display = 'none';
  typeCheveuxInputBis.style.display = 'none';
  autreLocalisationInput.style.display = 'none';
  memoriserIdentiteAgent();
  form.reset();
  recupererIdentiteAgent();
  toggleSJS();
}

// Construction du JSON de la plainte pour recuperer plus facilement les champs remplis
function generateJSON() {
  var plainteJSON = {};
  plainteJSON["element_49"] = "";
  plainteJSON["element_49_bis"] = "";

  // INPUTS
  var inputs = document.getElementsByTagName('input');
  var length = inputs.length;
  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    switch (input.type) {
      case "radio":
      if (input.checked) {
        if (input.name == 'element_100' && input.value == 'X') {
            plainteJSON[input.name] = getTrad('element_76');
        } else if (input.name == 'element_100' && input.value == 'QQN') {
          var _value = getTrad('element_101');
          _value = _value.replace(/<span class='data-bind'><\/span>/g, form.auteurPresume.value);
            plainteJSON[input.name] = _value;
        } else {
          plainteJSON[input.name] = input.value.toUpperCase();
        }
      }
      break;
      case "checkbox":
      if (input.checked) {
        var inputName = input.name;
        if (inputName == "element_95") {
          // checkbox de la restitution des objets
          plainteJSON[input.name] = input.value.toUpperCase();
        } else if (inputName.endsWith("_bis")) {
          plainteJSON["element_49_bis"] += input.value.toUpperCase() + ", ";
        } else {
          plainteJSON["element_49"] += input.value.toUpperCase() + ", ";
        }
      }
      break;
      default:
      if (input.name != "element_58") {
        plainteJSON[input.name] = input.value.toUpperCase();
      }
      break;
    }
  }

  plainteJSON["element_49_bis"] = plainteJSON["element_49_bis"].slice(0, -2);
  plainteJSON["element_49"] = plainteJSON["element_49"].slice(0, -2);

  // TEXTAREAS
  var textareas = document.getElementsByTagName('textarea');
  length = textareas.length;
  for (var i = 0; i < textareas.length; i++) {
    var textarea = textareas[i];
    plainteJSON[textarea.name] = textarea.value.toUpperCase();
  }

  // SELECTS
  var selects = document.getElementsByTagName('select');
  length = selects.length;
  for (var i = 0; i < selects.length; i++) {
    var select = selects[i];
    if (select.name != "element_57") {
      plainteJSON[select.name] = select.value.toUpperCase();
    }
  }

  // OBJETS VOLES
  var objets, details;
  if (form.elements["element_58"].length == undefined) {
    objets = form.elements["element_57"].value;
    details = form.elements["element_58"].value;
  } else {
    tabObjets = form.elements["element_57"];
    tabDetails = form.elements["element_58"];
    objets = tabObjets[0].value + "";
    details = tabDetails[0].value + "";
    for (var i = 1; i<tabObjets.length; i++) {
      objets += ";" + tabObjets[i].value;
      details += ";" + tabDetails[i].value;
    }
  }
  plainteJSON["element_57"] = objets.toUpperCase();
  plainteJSON["element_58"] = details.toUpperCase();

  // SIGNATURE

  signVictime = signaturePadVictime.toDataURL();
  plainteJSON["element_75"] = signVictime;
  signAgent = signaturePadAgent.toDataURL();
  plainteJSON["element_89"] = signAgent;

  // Date
  var dd = new Date();
  plainteJSON["date"] = dateString;

  console.log(plainteJSON);
  return plainteJSON;
}

// Permet de generer une plainte au format HTML qui sera envoyee par mail
// Utilisation du fichier JSON qui permet d'acceder facilement a n'importe quel champ de la plainte
function toTextHTML() {
  var html;
  var d = new Date();
  var logoPP = "data:image/jpg;base64,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";
  if (currentLang == 'ar') {
    html = '<!DOCTYPE html><html><head><meta charset="utf-8"><title></title></head><body style="text-align:right;"><table style="page-break-before: always;width: 90%;text-align: center;margin-left:3%;"><tr><td style="border: 1px solid black;"><p>DIRECTION DE LA SECURITE DE <br>PROXIMITE DE L’AGGLOMERATION <br>PARISIENNE <br>Direction Territoriale de la Sécurité de <br>Proximité de Paris </td><td style="border: 1px solid black;"><img src='+logoPP+' alt="Préfecture de Police"></td><td style="border: 1px solid black;">Destinataire <br>PARQUET DE PARIS <br>04, boulevard du Palais <br>75001 PARIS</td></tr></table>';
  } else {
    html = '<!DOCTYPE html><html><head><meta charset="utf-8"><title></title></head><body><table style="page-break-before: always;width: 90%;text-align: center;margin-left:3%;"><tr><td style="border: 1px solid black;"><p>DIRECTION DE LA SECURITE DE <br>PROXIMITE DE L’AGGLOMERATION <br>PARISIENNE <br>Direction Territoriale de la Sécurité de <br>Proximité de Paris </td><td style="border: 1px solid black;"><img src='+logoPP+' alt="Préfecture de Police"></td><td style="border: 1px solid black;">Destinataire <br>PARQUET DE PARIS <br>04, boulevard du Palais <br>75001 PARIS</td></tr></table>';
  }
  var json = generateJSON();
  var trads = document.getElementsByClassName('trad');
  for (var i = 0; i < trads.length; i++) {
    var elemName = trads[i].dataset['content'];
    var label = getTrad(elemName);
    var value = json[elemName];

    //Champ qui ne sont pas des input mais qui doivent apparaitre dans le mail
    if (elemName == "element_84") {
      html += '<p>'+label+'</p>'
    } else if (elemName == 'element_82' || elemName == 'element_83') {
      html += '<p><b><u>'+label+' :</u></b></p>'
    } else if (trads[i].nodeName == 'H2' && elemName != 'element_22_bis'){
      html += '<h2>'+label+'</h2>'
    }
    // Traitement different pour la couleur des cheveux (choix autre)

    else if (elemName == 'element_5') {
      if (select1.value == "Autre") {
        html += '<p><b>'+label+' : </b> '+json["autreLocalisation"]+'</p>';
      } else {
        html += '<p><b>'+label+' : </b> '+value+'</p>';
      }
    } else if (elemName == 'element_41') {
      if (select2.value == "Autre") {
        html += '<p><b>'+label+' : </b> '+json["cheveuxVoleur"]+'</p>';
      } else {
        html += '<p><b>'+label+' : </b> '+value+'</p>';
      }
    } else if (elemName == 'element_41_bis') {
      if (select4.value == "Autre") {
        html += '<p><b>'+label+' : </b> '+json["cheveuxVoleur_bis"]+'</p>';
      } else {
        html += '<p><b>'+label+' : </b> '+value+'</p>';
      }
    } else if (elemName == 'element_91') {
      // LE SJS ne doit pas apparaitre dans le code HTML de la plainte
      continue;
    } else {
      if (value != undefined) {
        // Traitement de la liste des objets voles
        if (elemName == "element_57") {
          var objets = json['element_57'];
          var details = json['element_58'];
          var objetsTab = objets.split(";");
          var detailsTab = details.split(";");

          html += '<table>';
          html += '<tr>';
          html += '<th style="border: 1px solid black;">' + getTrad('element_57') + '</td>';
          html += '<th style="border: 1px solid black;">' + getTrad('element_58') + '</td>';
          html += '</tr>';
          for (var j = 0; j < objetsTab.length; j++) {
            html += '<tr>';
            html += '<td style="border: 1px solid black;">' + objetsTab[j] + '</td>';
            html += '<td style="border: 1px solid black;">' + detailsTab[j] + '</td>';
            html += '</tr>';
          }
          html += '</table>'
        } else if (elemName == "element_58" || elemName == 'auteurPresume') {
          continue;
        }
        //Traitement des signatures
        else if (elemName == "element_89") {
          html += '<p><b> Paris le '+dateString+" à "+timeString+"</b></p>";
          html += '<p><b>'+label+' : </b></p><img src="'+json[elemName]+'" alt="signature">';
        } else if (elemName == "element_75") {
          html += '<p><b> Paris le '+dateString+"</b></p>";
          html += '<p><b>'+label+' : </b></p><img src="'+json[elemName]+'" alt="signature">';
        } else if (elemName == 'element_95') {
          // Checkbox de restitution des objets
            html += '<p>'+label+'</p>';
        } else if (elemName == 'element_100') {
          // Type de plainte
            html += '<p>'+json[elemName]+'</p>';
        } else {
          // Traitement normal
          if (currentLang == 'ar') {
            html += '<p>'+value+' <b> : '+label+'</b></p>';
          } else {
            html += '<p><b>'+label+' : </b> '+value+'</p>';
          }
        }
      }
    }
  }
  // Ajout des mentions terminales dans le mail
  html += addMentionsTerminales();
  html += '</body></html>';
  console.log(html);
  return html;
}

// Permet de recuperer les mentions terminales et leur traduction dans la langue courante
function addMentionsTerminales() {
  if (currentLang == 'ar') {
    return "<p style='text-align:left'>" + mentions['fr'] + "</p><br><p>" + mentions[currentLang] + "</p>";
  } else if (currentLang != "fr") {
    return "<p>" + mentions['fr'] + "</p><br><p>" + mentions[currentLang] + "</p><br>";
  } else {
    return "<p>" + mentions['fr'] + "</p><br>";
  }
}

// Permet d'avoir un intitule avec la traduction dans la langue courante de l'appli
function getTrad(content) {
  switch (currentLang) {
    case "fr":
    return francais[content];
    break;
    case "ar":
    return francais[content] +" / "+ arabe[content].slice(0, -2) ;
    break;
    case "en":
    return francais[content] + anglais[content];
    break;
    case "de":
    return francais[content] + allemand[content];
    break;
    case "zh":
    return francais[content] + chinois[content];
    break;
    case "ko":
    return francais[content] + coreen[content];
    break;
    case "es":
    return francais[content] + espagnol[content];
    break;
    case "it":
    return francais[content] + italien[content];
    break;
    case "ja":
    return francais[content] + japonais[content];
    break;
    case "tr":
    return francais[content] + turc[content];
    break;
    case "ru":
    return francais[content] + russe[content];
    break;
    default:
    console.error("Je ne dois pas passer ici");
  }
}

// Permet de memoriser l'identite de l'agent dans localStorage
function memoriserIdentiteAgent() {
  localStorage.setItem(NOM_AGENT, form.element_85.value);
  localStorage.setItem(PRENOM_AGENT, form.element_86.value);
  localStorage.setItem(GRADE_AGENT, form.element_87.value);
  localStorage.setItem(AFFECTATION_AGENT, form.element_88.value);
}

// Permet de recuper l'identite de l'agent a partir du localStorage
function recupererIdentiteAgent() {
  var nom = localStorage.getItem(NOM_AGENT);
  if (nom != null) { form.element_85.value = nom }

  var prenom = localStorage.getItem(PRENOM_AGENT);
  if (prenom != null) { form.element_86.value = prenom }

  var grade = localStorage.getItem(GRADE_AGENT);
  if (grade != null) { form.element_87.value = grade }

  var affectation = localStorage.getItem(AFFECTATION_AGENT);
  if (affectation != null) { form.element_88.value = affectation }
}

// Appel au service /plaintes
function envoyerPlainte() {
  var plainteHTML = toTextHTML();
  var plainteResponse;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200 ) {
        plainteResponse = xhr.responseText;
        console.log(plainteResponse);
        envoyerMail(plainteResponse);
      } else {
        console.log(xhr.responseText);
        alert("Échec de la transmission");
      }
    }
  }
  xhr.open("PUT", "/plaintes", true);
  xhr.setRequestHeader("content-type", "text/html");
  xhr.setRequestHeader("content-type", "charset=utf-8");
  xhr.send(plainteHTML);
}

// Appel au service /mails
function envoyerMail(filename) {
  var body = {};
  var mail = form.element_19.value;
  var nom = form.element_10.value.toUpperCase();
  var prenom = form.element_11.value.toUpperCase();
  var sjs = form.element_91.value;
  var response;
  body["titre"] = "DEPOT DE PLAINTE "+nom+" "+prenom+" "+filename;
  body["arrSjs"] = sjs;
  body["mailVictime"] = mail;
  body["fichierPlainte"] = filename;

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        alert("Plainte transmise avec succès !");
        retourAccueil();
      } else {
        console.log(xhr.responseText);
        alert("Échec de la transmission");
      }
    }
  }
  xhr.open("POST", "/mails", true);
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("content-type", "charset=utf-8");
  xhr.send(JSON.stringify(body));
}

// Permet d'activer/desactiver le bouton de transmission de la plainte
function toggleSJS() {
  if (select5.value == '') {
    transmettreBouton.setAttribute('disabled', 'true');
    transmettreBouton.removeAttribute('class');
    transmettreBouton.setAttribute('class', 'btn btn-danger trad');
  } else {
    transmettreBouton.removeAttribute('disabled');
    transmettreBouton.removeAttribute('class');
    transmettreBouton.setAttribute('class', 'btn btn-info trad');
  }
}

// Permet d'afficher dynamiquement l'heure sur la page de signature du policier
function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  timeString = h + ":" + m + ":" + s;
  document.getElementById('timeAgent').innerHTML = " à " + timeString;
  var t = setTimeout(startTime, 900);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};
  return i;
}

// Permet d'afficher statiquement l'heure des signatures dans le DOM
function startDate() {
  var today = new Date();
  var Y = today.getFullYear();
  var M = today.getMonth();
  var D = today.getDate();
  M = checkMonth(M);
  dateString = D + "/" + M + "/" + Y;
  document.getElementById('dateVictime').innerHTML += dateString;
  document.getElementById('dateAgent').innerHTML += dateString;
}

function checkMonth(i) {
  i = i + 1;
  if (i < 10) {i = "0" + i};
  return i;
}

// Permet de gerer automatiquement la barre de progression en fonction du nombre de pages
function initProgressBars() {
  var progressBars = document.getElementsByClassName('progress-bar');
  var length = progressBars.length;
  for (var i = 0; i < length; i++) {
    var progressBar = progressBars[i];
    var pourcentage = i / length * 100;
    pourcentage = pourcentage.toFixed(0);
    progressBar.innerHTML = pourcentage+"%";
    if (i == 0) {
      progressBar.style.width = "7%";
    } else {
      progressBar.style.width = pourcentage+"%";
    }
  }
}
