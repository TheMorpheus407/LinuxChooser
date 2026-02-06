// Quiz questions with answer options and scoring mappings

export interface AnswerOption {
  id: string;
  text: string; // German
  description?: string; // German - additional explanation
  icon?: string;
}

export interface Question {
  id: string;
  text: string; // German
  description?: string; // German - additional context
  category: 'experience' | 'usage' | 'hardware' | 'preferences' | 'gaming' | 'software';
  type: 'single' | 'multiple';
  required: boolean;
  options: AnswerOption[];

  // Conditional display
  showIf?: {
    questionId: string;
    answerId: string | string[];
  };

  // Weight for scoring (1-3, higher = more important)
  weight: number;
}

export const questions: Question[] = [
  // Experience Level
  {
    id: 'experience',
    text: 'Wie viel Erfahrung hast du mit Linux?',
    description: 'Sei ehrlich - es gibt keine falsche Antwort!',
    category: 'experience',
    type: 'single',
    required: true,
    weight: 3,
    options: [
      {
        id: 'none',
        text: 'Noch nie benutzt',
        description: 'Ich komme von Windows oder macOS',
        icon: 'seedling',
      },
      {
        id: 'beginner',
        text: 'Einsteiger',
        description: 'Ich habe es mal ausprobiert oder in einer VM getestet',
        icon: 'leaf',
      },
      {
        id: 'intermediate',
        text: 'Fortgeschritten',
        description: 'Ich nutze Linux regelmäßig und kenne die Grundlagen',
        icon: 'tree',
      },
      {
        id: 'advanced',
        text: 'Erfahren',
        description: 'Ich bin mit der Kommandozeile (Textbefehle) vertraut und habe mehrere Distros getestet',
        icon: 'mountain',
      },
      {
        id: 'expert',
        text: 'Experte',
        description: 'Ich passe den Kern des Systems selbst an',
        icon: 'rocket',
      },
      {
        id: 'unsure',
        text: 'Ich bin mir nicht sicher',
        description: 'Ich kann meine Erfahrung schwer einschätzen',
        icon: 'question',
      },
    ],
  },

  // Primary Use Case
  {
    id: 'primary-use',
    text: 'Wofür wirst du Linux hauptsächlich nutzen?',
    description: 'Wähle den wichtigsten Verwendungszweck',
    category: 'usage',
    type: 'single',
    required: true,
    weight: 3,
    options: [
      {
        id: 'daily',
        text: 'Täglicher Gebrauch',
        description: 'Surfen, E-Mails, Office, Medien',
        icon: 'home',
      },
      {
        id: 'gaming',
        text: 'Gaming',
        description: 'Spiele sind meine Priorität',
        icon: 'gamepad',
      },
      {
        id: 'development',
        text: 'Softwareentwicklung',
        description: 'Programmieren und Development',
        icon: 'code',
      },
      {
        id: 'creative',
        text: 'Kreative Arbeit',
        description: 'Grafik, Video, Audio, 3D',
        icon: 'palette',
      },
      {
        id: 'server',
        text: 'Server / Homelab',
        description: 'Selbst-gehostete Dienste',
        icon: 'server',
      },
      {
        id: 'learning',
        text: 'Lernen',
        description: 'Ich will Linux und Computerwissenschaft lernen',
        icon: 'graduation-cap',
      },
      {
        id: 'privacy',
        text: 'Privatsphäre',
        description: 'Sicherheit und Anonymität sind mir wichtig',
        icon: 'shield',
      },
      {
        id: 'unsure',
        text: 'Noch nicht sicher',
        description: 'Ich will erstmal Linux ausprobieren',
        icon: 'question',
      },
    ],
  },

  // Secondary Uses
  {
    id: 'secondary-uses',
    text: 'Welche anderen Dinge wirst du auch tun?',
    description: 'Mehrfachauswahl möglich',
    category: 'usage',
    type: 'multiple',
    required: false,
    weight: 2,
    options: [
      { id: 'browsing', text: 'Internet surfen', icon: 'globe' },
      { id: 'office', text: 'Office-Arbeiten', icon: 'file-text' },
      { id: 'gaming-casual', text: 'Gelegentliches Gaming', icon: 'gamepad' },
      { id: 'coding', text: 'Programmieren', icon: 'code' },
      { id: 'media', text: 'Medien (Videos, Musik)', icon: 'play' },
      { id: 'graphics', text: 'Bildbearbeitung', icon: 'image' },
      { id: 'video-editing', text: 'Videobearbeitung', icon: 'film' },
      { id: 'streaming', text: 'Streaming und Videos erstellen', icon: 'video' },
      { id: 'virtualization', text: 'Virtuelle Computer', icon: 'box' },
    ],
  },

  // Gaming Details (conditional)
  {
    id: 'gaming-type',
    text: 'Welche Art von Spielen spielst du?',
    description: 'Manche Spiele haben Einschränkungen unter Linux',
    category: 'gaming',
    type: 'multiple',
    required: false,
    weight: 3,
    showIf: {
      questionId: 'primary-use',
      answerId: 'gaming',
    },
    options: [
      {
        id: 'native',
        text: 'Native Linux-Spiele',
        description: 'Spiele die offiziell Linux unterstützen',
        icon: 'penguin',
      },
      {
        id: 'steam',
        text: 'Steam-Spiele (Proton)',
        description: 'Windows-Spiele via Proton',
        icon: 'steam',
      },
      {
        id: 'indie',
        text: 'Indie-Spiele',
        description: 'Kleinere, unabhängige Spiele',
        icon: 'heart',
      },
      {
        id: 'aaa',
        text: 'AAA-Titel',
        description: 'Große Blockbuster-Spiele',
        icon: 'star',
      },
      {
        id: 'competitive',
        text: 'Kompetitive Multiplayer',
        description: 'Valorant, Fortnite, etc.',
        icon: 'trophy',
      },
      {
        id: 'emulation',
        text: 'Emulation',
        description: 'Retro-Gaming und Konsolen-Emulatoren',
        icon: 'joystick',
      },
    ],
  },

  // Specific Games
  {
    id: 'specific-games',
    text: 'Spielst du eines dieser Spiele?',
    description: 'Diese Spiele haben bekannte Probleme mit Linux',
    category: 'gaming',
    type: 'multiple',
    required: false,
    weight: 3,
    showIf: {
      questionId: 'gaming-type',
      answerId: ['competitive', 'aaa'],
    },
    options: [
      { id: 'valorant', text: 'Valorant', icon: 'crosshair' },
      { id: 'fortnite', text: 'Fortnite', icon: 'target' },
      { id: 'destiny2', text: 'Destiny 2', icon: 'moon' },
      { id: 'pubg', text: 'PUBG', icon: 'target' },
      { id: 'apex', text: 'Apex Legends', icon: 'target' },
      { id: 'rainbow6', text: 'Rainbow Six Siege', icon: 'shield' },
      { id: 'cod', text: 'Call of Duty (Online)', icon: 'crosshair' },
      { id: 'genshin', text: 'Genshin Impact', icon: 'star' },
      { id: 'league', text: 'League of Legends', icon: 'trophy' },
      { id: 'none', text: 'Keines davon', icon: 'check' },
    ],
  },

  // Hardware - Computer Age
  {
    id: 'computer-age',
    text: 'Wie alt ist dein Computer?',
    description: 'Dies hilft uns, passende Distributionen zu finden',
    category: 'hardware',
    type: 'single',
    required: true,
    weight: 2,
    options: [
      {
        id: 'new',
        text: 'Neu (0-2 Jahre)',
        description: 'Aktuelle Hardware',
        icon: 'sparkles',
      },
      {
        id: 'recent',
        text: 'Aktuell (3-5 Jahre)',
        description: 'Noch leistungsfähig',
        icon: 'check',
      },
      {
        id: 'older',
        text: 'Älter (6-10 Jahre)',
        description: 'Könnte Updates brauchen',
        icon: 'clock',
      },
      {
        id: 'vintage',
        text: 'Sehr alt (10+ Jahre)',
        description: 'Braucht leichtgewichtige Software',
        icon: 'hourglass',
      },
      {
        id: 'unknown',
        text: 'Weiß ich nicht',
        description: 'Kein Problem, wir finden trotzdem was Passendes',
        icon: 'question',
      },
    ],
  },

  // Hardware - RAM
  {
    id: 'ram',
    text: 'Wie viel Arbeitsspeicher (RAM) hat dein Computer?',
    description: 'Falls du es nicht weißt, wähle "Weiß ich nicht"',
    category: 'hardware',
    type: 'single',
    required: false,
    weight: 2,
    options: [
      { id: '2gb', text: '2 GB oder weniger', icon: 'memory' },
      { id: '4gb', text: '4 GB', icon: 'memory' },
      { id: '8gb', text: '8 GB', icon: 'memory' },
      { id: '16gb', text: '16 GB', icon: 'memory' },
      { id: '32gb', text: '32 GB oder mehr', icon: 'memory' },
      { id: 'unknown', text: 'Weiß ich nicht', icon: 'question' },
    ],
  },

  // Hardware - GPU
  {
    id: 'gpu',
    text: 'Welche Grafikkarte hast du?',
    description: 'NVIDIA erfordert manchmal extra Konfiguration',
    category: 'hardware',
    type: 'single',
    required: false,
    weight: 2,
    options: [
      {
        id: 'nvidia',
        text: 'NVIDIA',
        description: 'GeForce Karten',
        icon: 'gpu',
      },
      {
        id: 'amd',
        text: 'AMD',
        description: 'Radeon Karten',
        icon: 'gpu',
      },
      {
        id: 'intel-igpu',
        text: 'Intel (integriert)',
        description: 'In der CPU integriert (Iris Xe, UHD Graphics)',
        icon: 'cpu',
      },
      {
        id: 'intel-arc',
        text: 'Intel Arc',
        description: 'Separate Grafikkarte (Arc A-Serie, B-Serie)',
        icon: 'gpu',
      },
      {
        id: 'unknown',
        text: 'Weiß ich nicht',
        icon: 'question',
      },
    ],
  },

  // Desktop Preference - Style
  {
    id: 'desktop-style',
    text: 'Welches Desktop-Layout bevorzugst du?',
    description: 'Wie soll dein Desktop aussehen und sich anfühlen?',
    category: 'preferences',
    type: 'single',
    required: true,
    weight: 2,
    options: [
      {
        id: 'windows',
        text: 'Windows-ähnlich',
        description: 'Taskleiste unten, Startmenü',
        icon: 'windows',
      },
      {
        id: 'macos',
        text: 'macOS-ähnlich',
        description: 'Dock unten, Menüleiste oben',
        icon: 'apple',
      },
      {
        id: 'modern',
        text: 'Modern / Minimalistisch',
        description: 'Aufgeräumter Look mit Activities/Overview',
        icon: 'layout',
      },
      {
        id: 'tiling',
        text: 'Fenster werden automatisch angeordnet',
        description: 'Tastatur-fokussiert, effiziente Bildschirmnutzung',
        icon: 'grid',
      },
      {
        id: 'flexible',
        text: 'Mir egal / Flexibel',
        description: 'Ich passe mich an',
        icon: 'shuffle',
      },
    ],
  },

  // Customization Level
  {
    id: 'customization',
    text: 'Wie wichtig ist dir Anpassbarkeit?',
    description: 'Möchtest du alles konfigurieren können?',
    category: 'preferences',
    type: 'single',
    required: false,
    weight: 2,
    options: [
      {
        id: 'minimal',
        text: 'Minimal',
        description: 'Soll einfach funktionieren, wie es ist',
        icon: 'check-circle',
      },
      {
        id: 'some',
        text: 'Etwas',
        description: 'Grundlegende Anpassungen wie Themes',
        icon: 'sliders',
      },
      {
        id: 'moderate',
        text: 'Moderat',
        description: 'Ich will einiges anpassen können',
        icon: 'settings',
      },
      {
        id: 'full',
        text: 'Vollständig',
        description: 'Ich will alles kontrollieren',
        icon: 'wrench',
      },
      {
        id: 'dont-care',
        text: 'Ist mir egal',
        description: 'Ich hab da keine besonderen Vorlieben',
        icon: 'shuffle',
      },
    ],
  },

  // Stability vs Cutting Edge
  {
    id: 'stability',
    text: 'Was ist dir wichtiger: Stabilität oder aktuelle Software?',
    description: 'Ein klassischer Kompromiss in der Linux-Welt',
    category: 'preferences',
    type: 'single',
    required: true,
    weight: 3,
    options: [
      {
        id: 'stable',
        text: 'Stabilität',
        description: 'Lieber ältere aber zuverlässige Software',
        icon: 'shield-check',
      },
      {
        id: 'balanced',
        text: 'Ausgewogen',
        description: 'Ein guter Mix aus beidem',
        icon: 'scale',
      },
      {
        id: 'cutting-edge',
        text: 'Aktuelle Software',
        description: 'Ich will die neuesten Features',
        icon: 'zap',
      },
      {
        id: 'bleeding-edge',
        text: 'Immer das Allerneueste',
        description: 'Selbst wenn es mal bricht - Hauptsache aktuell',
        icon: 'flame',
      },
    ],
  },

  // Software Requirements
  {
    id: 'software-requirements',
    text: 'Benötigst du bestimmte Software?',
    description: 'Manche Software ist unter Linux nicht verfügbar',
    category: 'software',
    type: 'multiple',
    required: false,
    weight: 2,
    options: [
      { id: 'ms-office', text: 'Microsoft Office', icon: 'file-word' },
      { id: 'adobe', text: 'Adobe Creative Suite', icon: 'image' },
      { id: 'autodesk', text: 'AutoCAD / Autodesk', icon: 'cube' },
      { id: 'itunes', text: 'iTunes', icon: 'music' },
      { id: 'specific-windows', text: 'Andere Windows-Software', icon: 'windows' },
      { id: 'none', text: 'Keine davon / Open Source ist OK', icon: 'check' },
    ],
  },

  // Learning Willingness
  {
    id: 'learning',
    text: 'Wie viel Zeit willst du ins Lernen investieren?',
    description: 'Manche Distributionen erfordern mehr Einarbeitung',
    category: 'preferences',
    type: 'single',
    required: false,
    weight: 2,
    options: [
      {
        id: 'none',
        text: 'Keine - soll einfach funktionieren',
        description: 'Wie Windows oder macOS',
        icon: 'check',
      },
      {
        id: 'minimal',
        text: 'Ein bisschen',
        description: 'Grundlagen lernen ist OK',
        icon: 'book-open',
      },
      {
        id: 'moderate',
        text: 'Ich lerne gerne',
        description: 'Ich scheue mich nicht vor neuen Konzepten',
        icon: 'book',
      },
      {
        id: 'deep',
        text: 'Tief eintauchen',
        description: 'Ich will verstehen wie alles funktioniert',
        icon: 'graduation-cap',
      },
    ],
  },

  // Community Language
  {
    id: 'language',
    text: 'Ist dir eine deutschsprachige Community wichtig?',
    description: 'Support und Dokumentation auf Deutsch',
    category: 'preferences',
    type: 'single',
    required: false,
    weight: 1,
    options: [
      {
        id: 'important',
        text: 'Ja, sehr wichtig',
        description: 'Ich brauche Hilfe auf Deutsch',
        icon: 'flag-de',
      },
      {
        id: 'nice',
        text: 'Wäre nett',
        description: 'Aber englisch geht auch',
        icon: 'globe',
      },
      {
        id: 'irrelevant',
        text: 'Egal',
        description: 'Englisch ist kein Problem',
        icon: 'check',
      },
    ],
  },

  // Privacy Importance
  {
    id: 'privacy-level',
    text: 'Wie wichtig ist dir Privatsphäre?',
    category: 'preferences',
    type: 'single',
    required: false,
    weight: 2,
    options: [
      {
        id: 'casual',
        text: 'Normal',
        description: 'Standard-Privatsphäre reicht mir',
        icon: 'eye',
      },
      {
        id: 'important',
        text: 'Wichtig',
        description: 'Ich achte auf meine Daten',
        icon: 'shield',
      },
      {
        id: 'critical',
        text: 'Sehr wichtig',
        description: 'Maximaler Schutz meiner Privatsphäre',
        icon: 'lock',
      },
      {
        id: 'paranoid',
        text: 'Paranoid',
        description: 'Ich brauche Anonymität',
        icon: 'user-secret',
      },
      {
        id: 'dont-know',
        text: 'Weiß ich nicht',
        description: 'Hab mir darüber noch keine Gedanken gemacht',
        icon: 'question',
      },
    ],
  },

  // Previous OS
  {
    id: 'previous-os',
    text: 'Welches Betriebssystem nutzt du aktuell?',
    category: 'experience',
    type: 'single',
    required: false,
    weight: 1,
    options: [
      { id: 'windows-11', text: 'Windows 11', icon: 'windows' },
      { id: 'windows-10', text: 'Windows 10', icon: 'windows' },
      { id: 'windows-old', text: 'Windows 7/8', icon: 'windows' },
      { id: 'macos', text: 'macOS', icon: 'apple' },
      { id: 'chromeos', text: 'ChromeOS', icon: 'chrome' },
      { id: 'linux', text: 'Bereits Linux', icon: 'penguin' },
      { id: 'unknown', text: 'Keins davon / Weiß nicht', icon: 'question' },
    ],
  },

  // Secure Boot
  {
    id: 'secure-boot',
    text: 'Brauchst du Secure Boot Unterstützung?',
    description: 'Wenn du Windows 11 im Dual-Boot behalten willst, ist Secure Boot oft erforderlich',
    category: 'hardware',
    type: 'single',
    required: false,
    weight: 2,
    options: [
      {
        id: 'required',
        text: 'Ja, unbedingt',
        description: 'Ich brauche Secure Boot (z.B. für Dual-Boot mit Windows 11)',
        icon: 'shield-check',
      },
      {
        id: 'preferred',
        text: 'Wäre gut',
        description: 'Ich würde Secure Boot gerne aktiviert lassen',
        icon: 'shield',
      },
      {
        id: 'not-needed',
        text: 'Nicht nötig',
        description: 'Ich kann Secure Boot deaktivieren',
        icon: 'shield-off',
      },
      {
        id: 'unknown',
        text: 'Weiß ich nicht',
        description: 'Ich bin mir nicht sicher was Secure Boot ist',
        icon: 'question',
      },
    ],
  },
];

// Helper function to get question by ID
export function getQuestionById(id: string): Question | undefined {
  return questions.find(q => q.id === id);
}

// Get visible questions based on current answers
export function getVisibleQuestions(answers: { [id: string]: string | string[] }): Question[] {
  return questions.filter(q => {
    if (!q.showIf) return true;

    const { questionId, answerId } = q.showIf;
    const answer = answers[questionId];

    if (!answer) return false;

    if (Array.isArray(answerId)) {
      // Check if any of the required answers match
      if (Array.isArray(answer)) {
        return answerId.some(id => answer.includes(id));
      }
      return answerId.includes(answer);
    }

    if (Array.isArray(answer)) {
      return answer.includes(answerId);
    }

    return answer === answerId;
  });
}
