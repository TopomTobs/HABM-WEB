// ============================================
// PASSWORD PROTECTION WITH SHA-256 HASHING
// ============================================
// Default password hash (SHA-256 of "test123")
// To generate your own hash: 
// await sha256("your_password") in browser console
const CORRECT_PASSWORD_HASH = "12dcba6f6ee644657c01c710ce57be906cd1d898a1036c0a2364bf1d96031ec5";

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

let passwordVerified = false;

async function initPasswordProtection() {
    const modal = document.getElementById('passwordModal');
    const input = document.getElementById('passwordInput');
    const btn = document.getElementById('passwordBtn');
    const errorDiv = document.getElementById('passwordError');

    // Focus on input when modal is shown
    input.focus();

    // Handle Enter key
    input.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            await verifyPassword();
        }
    });

    // Handle button click
    btn.addEventListener('click', verifyPassword);

    async function verifyPassword() {
        const password = input.value;
        if (!password) {
            errorDiv.textContent = 'Bitte geben Sie ein Passwort ein';
            return;
        }

        const hash = await sha256(password);
        if (hash === CORRECT_PASSWORD_HASH) {
            passwordVerified = true;
            modal.classList.add('hidden');
            input.value = '';
            errorDiv.textContent = '';
        } else {
            errorDiv.textContent = 'Falsches Passwort, bitte versuchen Sie es erneut';
            input.value = '';
            input.focus();
        }
    }
}

// Initialize password protection immediately
document.addEventListener('DOMContentLoaded', initPasswordProtection);

// Prevent access to page content until password is verified
const sidebarLinks = document.addEventListener('click', function(e) {
    if (!passwordVerified && (e.target.closest('#personList') || e.target.closest('#content'))) {
        e.preventDefault();
        e.stopPropagation();
    }
}, true);

// ============================================
// APPLICATION DATA
// ============================================
const data = {
  persons: [
    {
      id: 'markus',
      name: 'Markus Hablesreiter',
      role: 'IT-Lehrer an der HTL Wels',
      profileImage: 'Assets/HABM.jpg',
      summary:
        'Markus verbindet handwerkliches Denken aus dem Maschinenbau mit klaren mathematischen Strukturen und pädagogischer Leidenschaft. Er liebt es, komplexe Themen so zu erklären, dass sie auch für jene verständlich werden, die noch nie darüber nachgedacht haben.',
      education: [
        {
          title: 'HTL IT-Mechanik',
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
        'Projektdokumentation (Platzhalter)',
      ],
    },
    {
      id: 'ShenZ',
      name: 'ShenZ ',
      role: 'NWT Großmeister an der HTL Wels',
      profileImage: 'Assets/ShenZ.gif',
      summary:
        'ShenZ ist ein erfahrener NWT-Lehrer, der mit seiner ruhigen und geduldigen Art komplexe naturwissenschaftliche und technische Konzepte vermittelt. Er legt großen Wert auf praktische Anwendungen und fördert das kritische Denken seiner Schüler, um sie auf die Herausforderungen der modernen Technik vorzubereiten. Besonderen Wert legt er auf die Sozialen Kompetenzen welche er im SOPK, NWT sowie ITS Unterricht vermittelt.',
      education: [
      {
        title: 'HTL IT-Elek',
          institution: 'HTL Wels',
          year: 'Abschluss 1992',
          details:
            'Fundierte Ausbildung in Elektrotechnik, Psychologie'},
            {title: 'Lehrtätigkeit NWT',
          institution: 'HTL Wels',
          year: 'seit 2002',
          details:
            'Unterrichtet Naturwissenschaft und Technik, mit Fokus auf praktische Anwendungen und kritisches Denken.'},
            {title: 'Master SOPK & ITS',
          institution: 'HTL Wels',
          year: 'seit 2002',
          details:
            'Fördert soziale Kompetenzen und Teamarbeit durch spezielle Unterrichtseinheiten und Projekte.'},
      ],
      skills: [],
      highlights: ["Obwohl er schon seit 2002 an der HTL Wels unterrichtet, ist er immer noch der jüngste Lehrer an der Schule."],
      placeholders: ['Protokoll hier Hochladen', 'Bild 2 (Platzhalter)'],
    },
    {
      id: 'laurenz',
      name: 'Lolo',
      role: 'Schüler an der HTL Wels',
      profileImage: 'Assets/LOLO.avif',
      summary:
        'Lolo ist ein leidenschaftlicher kroatischer Nationalist, der seine Wurzeln stolz vertritt. Als Schüler an der HTL Wels teilt er seine Zeit zwischen intensivem Schlaf in der Schule und aktiven Outdoor-Abenteuern. Wenn er nicht gerade döst, tracktiert er seine Mitschüler mit seinem scharfen Witz und seiner energischen Persönlichkeit. Seine Leidenschaft gilt dem Eisklettern und Felsenklettern, wo er die Herausforderungen der Natur meistert.',
      education: [
        {
          title: 'HTL Wels',
          institution: 'HTL Wels',
          year: 'aktuell',
          details:
            'Besucht die Höhere Technische Lehranstalt Wels, mit Fokus auf technische Fächer und praktische Ausbildung.Die Ausbildung wird voraussichtlich 7 Jahre dauern.',
        },
      ],
      skills: [
        'Kroatisch nationalistische Kultur',
        'Eisklettern & Felsenklettern',
        'Schlafoptimierung (Schule)',
        'Mitschüler-Interaktion',
      ],
      highlights: [
        'Meister im strategischen Schlafen während des Unterrichts',
        'Erfolgreiche Klettertouren in den Alpen',
        'Stolzer Vertreter kroatischer Traditionen',
      ],
      placeholders: [
        //'Assets/lolo2.png',
      ],
    },
    {
      id: 'Ayshee',
      name: 'Ayshee Müller',
      role: 'Lolos Affaire',
      profileImage: 'Assets/Ayshee_Mueller.png',
      summary:
        'Ayshee ist eine geheimnisvolle und faszinierende Persönlichkeit, die als Lolos Affaire bekannt ist. Sie hat eine enge Beziehung zu Laurenz, dem Schüler an der HTL Wels, und teilt mit ihm eine besondere Verbindung. Ayshee ist für ihre charmante und einnehmende Art bekannt, die sie in sozialen Kreisen beliebt macht. Ihre Interessen und Aktivitäten sind vielfältig, und sie bringt eine einzigartige Dynamik in Laurenzs Leben. Ihr leben verbringt sie ausschließlich zu Hause in der koratischen Botschft wo sie für Lolos wohl sorgt.',
      education: [
        {
          title: 'MaHF (Master of House Frau)',
          institution: 'FH Kabul for Applied IS',
          year: 'Abschluss September 2001',
          details:
            'Fundierte Ausbildung in Mechanik, Fertigungstechnik und Konstruktion. Schwerpunkt: Betriebstechnik & Steuerungstechnik.',
        },
        
      ],
      skills: [
        'Butzen / Kochen',
        'Python & Automatisierung',
        'Stochastik & Statistik',
        'Didaktik & Gebärung',
        'Kroatischer Charme',
      ],
      highlights: [
        'Wäre Laurenz nicht zeugungsunfähig, hätte Ayshee bereits 10 Kinder mit ihm',
        'Meisterin im Butzen und Kochen für Laurenz',
        'Unschlagbare Fähigkeiten im Stochastischen Denken, besonders in Bezug auf die Wahrscheinlichkeit, dass Laurenz jemals erwachsen wird.',
        'Verteidigerin von Laurenz in sozialen Situationen, insbesondere wenn es um seine Schlafgewohnheiten geht.',
      ],
      placeholders: [
        'Sichtungen von Ayshee hier hochladen',
      ],
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

  const profileImage = person.profileImage
    ? `<div class="profile-image"><img src="${person.profileImage}" alt="Profilbild ${person.name}"></div>`
    : '';

  const placeholderImages = person.placeholders
    .map((label) => {
      if (label.startsWith('Assets/')) {
        return `<div class="placeholder-image"><img src="${label}" alt="${label}"></div>`;
      } else {
        return `<div class="placeholder-image">${label}<br><span class="badge">Bild hier</span></div>`;
      }
    })
    .join('');

  content.innerHTML = `
    <section class="section">
      <h2>${person.name}</h2>
      <p class="highlight">${person.role}</p>
      ${profileImage}
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
