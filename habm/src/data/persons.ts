import type { Person } from '../types'

export const persons: Person[] = [
  {
    id: 'markus',
    name: 'Markus Hablesreiter',
    role: 'Java CEO an der HTL Wels',
    profileImage: '/HABM.jpg',
    summary:
      'Markus oder Maggus wie ihn seine Freunde nennen, ist wahrscheindlich die modernste Lehrkraft an der HTL Wels. Viel Wert legt er auf die Aktualität seiner Werkzeuge, dies demonstriert er an der Wahl seines Notebooks und der Java Version. Genau deshalb vertritt er auch den legendären Posten des Java CEOs. Mit seiner genössichen Art begeistert er die Schüler der 4. Klasse im Gegenstand Data Science',
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
    placeholders: ['Projektdokumentation (Platzhalter)'],
    folder: '/HABM',
    images: ['/HABM/HABM_Shredded1.png', '/HABM/aone-man-two-women-portrait-sitting-vintage-chair-30339318.png', '/HABM/markus-ruehl.jpg'],
  },
  {
    id: 'ShenZ',
    name: 'ShenZ',
    role: 'NWT Großmeister an der HTL Wels',
    profileImage: '/ShenZ.png',
    summary:
      'ShenZ ist ein erfahrener NWT-Lehrer, der mit seiner ruhigen und geduldigen Art komplexe naturwissenschaftliche und technische Konzepte vermittelt. Er legt großen Wert auf praktische Anwendungen und fördert das kritische Denken seiner Schüler, um sie auf die Herausforderungen der modernen Technik vorzubereiten. Besonderen Wert legt er auf die Sozialen Kompetenzen welche er im SOPK, NWT sowie ITS Unterricht vermittelt.',
    education: [
      {
        title: 'HTL IT-Elek',
        institution: 'HTL Wels',
        year: 'Abschluss 1992',
        details: 'Fundierte Ausbildung in Elektrotechnik, Psychologie',
      },
      {
        title: 'Lehrtätigkeit NWT',
        institution: 'HTL Wels',
        year: 'seit 2002',
        details:
          'Unterrichtet Naturwissenschaft und Technik, mit Fokus auf praktische Anwendungen und kritisches Denken.',
      },
      {
        title: 'Master SOPK & ITS',
        institution: 'HTL Wels',
        year: 'seit 2002',
        details:
          'Fördert soziale Kompetenzen und Teamarbeit durch spezielle Unterrichtseinheiten und Projekte.',
      },
    ],
    skills: [],
    highlights: [
      'Obwohl er schon seit 2002 an der HTL Wels unterrichtet, ist er immer noch der jüngste Lehrer an der Schule.',
    ],
    placeholders: ['Protokoll hier Hochladen', 'Bild 2 (Platzhalter)'],
    folder: '/ShenZ',
    images: ['/ShenZ/ShenZ.gif', '/ShenZ/ShenZ.png'],
  },
  {
    id: 'laurenz',
    name: 'Lolo',
    role: 'Alias: Ali Mohammed',
    profileImage: '/lolo1.png',
    summary:
      'Lolo ist ein leidenschaftlicher kroatischer Nationalist, der seine Wurzeln stolz vertritt. Als Schüler an der HTL Wels teilt er seine Zeit zwischen intensivem Schlaf in der Schule und aktiven Outdoor-Abenteuern. Wenn er nicht gerade döst, tracktiert er seine Mitschüler mit seinem scharfen Witz und seiner energischen Persönlichkeit. Seine Leidenschaft gilt dem Eisklettern und Felsenklettern, wo er die Herausforderungen der Natur meistert.',
    education: [
      {
        title: 'HTL Wels',
        institution: 'HTL Wels',
        year: 'aktuell',
        details:
          'Besucht die Höhere Technische Lehranstalt Wels, mit Fokus auf technische Fächer und praktische Ausbildung. Die Ausbildung wird voraussichtlich 7 Jahre dauern.',
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
    placeholders: [],
    folder: '/LOLO',
    images: ['/LOLO/LOLOsHochzeit.png', '/LOLO/PXL_20251119_102401925.jpg', '/LOLO/PXL_20251119_132347252.MP.jpg', '/LOLO/PXL_20251119_132348221.jpg', '/LOLO/PXL_20251119_132354254.MP.jpg', '/LOLO/PXL_20251119_132354509.jpg', '/LOLO/PXL_20251119_132452693.MP.jpg', '/LOLO/PXL_20260318_111854147.MP.jpg', '/LOLO/lolo2.png'],
  },
  {
    id: 'Ayshee',
    name: 'Ayshee Müller',
    role: 'Lolos Affaire',
    profileImage: '/Ayshee_Mueller.png',
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
    placeholders: ['Sichtungen von Ayshee hier hochladen '],
    folder: '/Ayshee',
    images: ['/Ayshee/Ayshee_Kind.png', '/Ayshee/Ayshee_Mueller.png'],
  },
]