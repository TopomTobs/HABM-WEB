const data = {
  persons: [
    {
      id: 'markus',
      name: 'Markus Hablesreiter',
      role: 'IT-Lehrer an der HTL Wels',
      summary:
        'Markus verbindet handwerkliches Denken aus dem Maschinenbau mit klaren mathematischen Strukturen und pädagogischer Leidenschaft. Er liebt es, komplexe Themen so zu erklären, dass sie auch für jene verständlich werden, die noch nie darüber nachgedacht haben.',
      education: [
        {
          title: 'HTL Maschinenbau',
          institution: 'HTL Wels',
          year: 'Abschluss 2010',
          details:
            'Fundierte Ausbildung in Mechanik, Fertigungstechnik und Konstruktion. Schwerpunkt: Betriebstechnik & Steuerungstechnik.',
        },
        {
          title: 'Studium Mathematik',
          institution: 'Universität (Dipl.-Ing.)',
          year: 'Abschluss 2014',
          details:
            'Mathematische Modellierung, Statistik und numerische Methoden – Basis für präzises Denken im Projektunterricht.',
        },
        {
          title: 'Lehrtätigkeit IT & Mathematik',
          institution: 'HTL Wels',
          year: 'seit 2016',
          details:
            'Unterrichtet IT-Grundlagen, Programmieren, Netzwerktechnik und mathematische Grundlagen für Technikerschüler.',
        },
      ],
      skills: [
        'JavaScript / Webentwicklung',
        'Python & Automatisierung',
        'Mathematik & Statistik',
        'Didaktik & Projektbegleitung',
        'CAD / Konstruktion',
      ],
      highlights: [
        'Teamprojekte mit HTL-Schülern zur digitalen Fertigung',
        'Lehrplanentwicklung im Bereich Informatik',
        'Tutor für Schulwettbewerbe und Hackathons',
      ],
      placeholders: [
        'Profilbild (Platzhalter)',
        'Projektdokumentation (Platzhalter)',
      ],
    },
    {
      id: 'person2',
      name: 'Person 2 (Platzhalter)',
      role: 'Später erweiterbar',
      summary:
        'Hier können später weitere Personen ergänzt werden. Klick dich gern durch die verschiedenen Profile.',
      education: [],
      skills: [],
      highlights: [],
      placeholders: ['Bild 1 (Platzhalter)', 'Bild 2 (Platzhalter)'],
    },
  ],
};

const sidebar = document.getElementById('sidebar');
const burger = document.getElementById('burger');
const content = document.getElementById('content');
const personList = document.getElementById('personList');

function toggleSidebar() {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('visible');
  content.classList.toggle('shifted');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('visible');
  content.classList.remove('shifted');
}

function createOverlay() {
  const overlayEl = document.createElement('div');
  overlayEl.className = 'overlay';
  overlayEl.addEventListener('click', closeSidebar);
  document.body.appendChild(overlayEl);
  return overlayEl;
}

const overlay = createOverlay();

function renderPersonList() {
  personList.innerHTML = '';
  data.persons.forEach((person) => {
    const item = document.createElement('li');
    item.className = 'person-item';
    item.textContent = person.name;
    item.dataset.personId = person.id;
    item.addEventListener('click', () => {
      selectPerson(person.id);
      closeSidebar();
    });
    personList.appendChild(item);
  });
}

function renderPerson(person) {
  const educationItems = person.education
    .map(
      (edu) =>
        `<li><strong>${edu.title}</strong> — ${edu.institution} <span class="highlight">(${edu.year})</span><br><small>${edu.details}</small></li>`
    )
    .join('');

  const skillItems = person.skills
    .map((skill) => `<li>${skill}</li>`)
    .join('');

  const highlightItems = person.highlights
    .map((point) => `<li>${point}</li>`)
    .join('');

  const placeholderImages = person.placeholders
    .map(
      (label) =>
        `<div class="placeholder-image">${label}<br><span class="badge">Bild hier</span></div>`
    )
    .join('');

  content.innerHTML = `
    <section class="section">
      <h2>${person.name}</h2>
      <p class="highlight">${person.role}</p>
      <p>${person.summary}</p>
      ${placeholderImages}
    </section>

    <section class="section">
      <h2>Bildung</h2>
      <ul class="list">${educationItems}</ul>
    </section>

    <section class="section">
      <h2>Kenntnisse</h2>
      <ul class="list">${skillItems}</ul>
    </section>

    <section class="section">
      <h2>Highlights</h2>
      <ul class="list">${highlightItems}</ul>
    </section>
  `;

  document.querySelectorAll('.person-item').forEach((item) => {
    item.classList.toggle('active', item.dataset.personId === person.id);
  });
}

function selectPerson(personId) {
  const person = data.persons.find((p) => p.id === personId);
  if (!person) return;
  renderPerson(person);
}

function init() {
  renderPersonList();
  selectPerson(data.persons[0].id);
  burger.addEventListener('click', toggleSidebar);
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 860) {
      sidebar.classList.remove('open');
      overlay.classList.remove('visible');
    }
  });
}

init();
