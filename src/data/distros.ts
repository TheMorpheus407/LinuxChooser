// Linux distribution data with scoring attributes
// Daten aus der Recherche Januar 2026

export interface Distro {
  id: string;
  name: string;
  logo: string;
  description: string; // German
  website: string;
  version?: string; // Current version
  releaseDate?: string; // German date string

  // Scoring attributes (0-10 scale)
  beginnerFriendly: number;
  stability: number;
  cuttingEdge: number; // How up-to-date packages are
  customizability: number;
  performance: number; // Resource efficiency
  gamingSupport: number;
  hardwareSupport: number;
  communitySupport: number; // German community
  professionalUse: number;
  privacyFocus: number;

  // Available desktop environments
  availableDEs: string[];
  defaultDE: string;

  // Package management
  packageManager: 'apt' | 'dnf' | 'pacman' | 'zypper' | 'portage' | 'xbps' | 'apk' | 'rpm-ostree' | 'nix' | 'eopkg';
  hasAUR: boolean;
  hasFlatpak: boolean;
  hasSnap: boolean;

  // Target audience
  targetAudience: ('beginner' | 'intermediate' | 'advanced' | 'developer' | 'gamer' | 'server' | 'privacy')[];

  // Release model
  releaseModel: 'fixed' | 'rolling' | 'semi-rolling' | 'immutable';

  // Minimum requirements
  minRAM: number; // in GB
  minStorage: number; // in GB

  // Special features
  features: string[];

  // Warnings (German)
  warnings?: string[];

  // Who is this for / not for (German)
  bestFor?: string[];
  notFor?: string[];

  // Installation difficulty (1-10)
  installDifficulty?: number;

  // Base distro (for derivatives)
  basedOn?: string;

  // Secure Boot support level
  secureBootSupport?: 'full' | 'partial' | 'none';
}

export const distros: Distro[] = [
  {
    id: 'linux-mint',
    name: 'Linux Mint',
    logo: '/distros/linuxmint.svg',
    description: 'Die benutzerfreundlichste Linux-Distribution, perfekt für Windows-Umsteiger. Mit Timeshift-Backup und Cinnamon-Desktop.',
    website: 'https://linuxmint.com',
    version: '22.3 Zena',
    releaseDate: '13. Januar 2026',

    beginnerFriendly: 10,
    stability: 9,
    cuttingEdge: 4,
    customizability: 7,
    performance: 7,
    gamingSupport: 7,
    hardwareSupport: 9,
    communitySupport: 8,
    professionalUse: 7,
    privacyFocus: 7,

    availableDEs: ['cinnamon', 'mate', 'xfce'],
    defaultDE: 'cinnamon',

    packageManager: 'apt',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: false,

    targetAudience: ['beginner', 'intermediate'],
    releaseModel: 'fixed',

    minRAM: 2,
    minStorage: 20,

    features: ['Timeshift Backup', 'Update Manager', 'Driver Manager', 'Software Manager', 'Snap-frei'],
    warnings: [
      'Moderne Anzeigetechnik noch in Entwicklung',
      'Basiert auf Ubuntu LTS (ältere Pakete)',
    ],
    bestFor: [
      'Windows-Umsteiger',
      'Linux-Anfänger',
      'Nutzer, die ein fertiges System wollen',
    ],
    notFor: [
      'Nutzer, die immer die allerneueste Software wollen',
      'Unternehmen mit Support-Anforderungen',
    ],
    installDifficulty: 2,
    basedOn: 'ubuntu',
    secureBootSupport: 'full',
  },
  {
    id: 'ubuntu',
    name: 'Ubuntu',
    logo: '/distros/ubuntu.svg',
    description: 'Die bekannteste Linux-Distribution mit großer Community und Unterstützung.',
    website: 'https://ubuntu.com',
    version: '24.04 LTS',
    releaseDate: 'April 2024',

    beginnerFriendly: 9,
    stability: 8,
    cuttingEdge: 6,
    customizability: 6,
    performance: 6,
    gamingSupport: 8,
    hardwareSupport: 9,
    communitySupport: 10,
    professionalUse: 8,
    privacyFocus: 5,

    availableDEs: ['gnome'],
    defaultDE: 'gnome',

    packageManager: 'apt',
    hasAUR: false,
    hasFlatpak: false,
    hasSnap: true,

    targetAudience: ['beginner', 'intermediate', 'developer', 'server'],
    releaseModel: 'fixed',

    minRAM: 4,
    minStorage: 25,

    features: ['Snap Store', 'Ubuntu Pro', 'Große Community', 'Lange Unterstützung (LTS)'],
    basedOn: 'debian',
    secureBootSupport: 'full',
  },
  {
    id: 'fedora',
    name: 'Fedora',
    logo: '/distros/fedora.svg',
    description: 'Moderne Distribution mit aktueller Software, von Red Hat unterstützt.',
    website: 'https://fedoraproject.org',
    version: '43',
    releaseDate: '28. Oktober 2025',

    beginnerFriendly: 7,
    stability: 8,
    cuttingEdge: 9,
    customizability: 7,
    performance: 7,
    gamingSupport: 7,
    hardwareSupport: 8,
    communitySupport: 8,
    professionalUse: 9,
    privacyFocus: 7,

    availableDEs: ['gnome', 'kde', 'xfce', 'mate', 'cinnamon', 'lxqt', 'i3', 'sway'],
    defaultDE: 'gnome',

    packageManager: 'dnf',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: false,

    targetAudience: ['intermediate', 'advanced', 'developer'],
    releaseModel: 'fixed',

    minRAM: 2,
    minStorage: 20,

    features: ['GNOME Vanilla', 'Moderne Anzeigetechnik', 'Aktuelle System-Komponenten', 'Erweiterter Sicherheitsschutz'],
    bestFor: [
      'Entwickler, die aktuelle Tools brauchen',
      'Tech-Enthusiasten',
      'Red Hat/RHEL-Profis',
      'Nutzer, die Vanilla GNOME wollen',
    ],
    notFor: [
      'Nutzer, die Langzeit-Stabilität brauchen',
      'Absolute Einsteiger',
      'Nutzer ohne Erfahrung mit Textbefehlen',
    ],
    secureBootSupport: 'full',
  },
  {
    id: 'pop-os',
    name: 'Pop!_OS',
    logo: '/distros/popos.svg',
    description: 'Gaming- und Entwickler-freundliche Distribution von System76. Jetzt mit neuem COSMIC Desktop.',
    website: 'https://system76.com/pop/',
    version: '24.04 LTS',
    releaseDate: '11. Dezember 2025',

    beginnerFriendly: 8,
    stability: 8,
    cuttingEdge: 7,
    customizability: 8,
    performance: 8,
    gamingSupport: 9,
    hardwareSupport: 9,
    communitySupport: 4,
    professionalUse: 8,
    privacyFocus: 7,

    availableDEs: ['cosmic'],
    defaultDE: 'cosmic',

    packageManager: 'apt',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: false,

    targetAudience: ['beginner', 'intermediate', 'developer', 'gamer'],
    releaseModel: 'fixed',

    minRAM: 4,
    minStorage: 20,

    features: ['COSMIC Desktop', 'NVIDIA-Unterstützung', 'Hybrid-GPU-Management', 'Pop!_Shop', 'Recovery Partition'],
    warnings: [
      'COSMIC Desktop ist Version 1.0 - einige Funktionen fehlen noch',
      'GNOME-Extensions funktionieren nicht mehr mit COSMIC',
      'Secure Boot muss deaktiviert werden',
    ],
    bestFor: [
      'Gamer mit NVIDIA-Grafikkarten',
      'Softwareentwickler',
      'Nutzer mit Hybrid-GPU-Laptops',
    ],
    notFor: [
      'Nutzer, die GNOME-Extensions benötigen',
      'Touch-Geräte-Nutzer',
    ],
    installDifficulty: 3,
    basedOn: 'ubuntu',
    secureBootSupport: 'none',
  },
  {
    id: 'manjaro',
    name: 'Manjaro',
    logo: '/distros/manjaro.svg',
    description: 'Benutzerfreundliches Arch-basiertes System mit eigenen Repositories.',
    website: 'https://manjaro.org',
    version: '26.0',
    releaseDate: '4. Januar 2026',

    beginnerFriendly: 7,
    stability: 7,
    cuttingEdge: 8,
    customizability: 9,
    performance: 8,
    gamingSupport: 9,
    hardwareSupport: 9,
    communitySupport: 8,
    professionalUse: 7,
    privacyFocus: 6,

    availableDEs: ['kde', 'gnome', 'xfce', 'i3', 'sway', 'cinnamon'],
    defaultDE: 'xfce',

    packageManager: 'pacman',
    hasAUR: true,
    hasFlatpak: true,
    hasSnap: true,

    targetAudience: ['intermediate', 'advanced', 'gamer'],
    releaseModel: 'semi-rolling',

    minRAM: 2,
    minStorage: 30,

    features: ['Manjaro Hardware Detection', 'System-Verwaltung', 'AUR Zugang', 'Eigene Software-Quellen'],
    basedOn: 'arch',
    secureBootSupport: 'partial',
  },
  {
    id: 'arch',
    name: 'Arch Linux',
    logo: '/distros/arch.svg',
    description: 'Minimalistisch, flexibel und immer aktuell. Für erfahrene Nutzer.',
    website: 'https://archlinux.org',

    beginnerFriendly: 2,
    stability: 7,
    cuttingEdge: 10,
    customizability: 10,
    performance: 10,
    gamingSupport: 9,
    hardwareSupport: 9,
    communitySupport: 9,
    professionalUse: 7,
    privacyFocus: 8,

    availableDEs: ['kde', 'gnome', 'xfce', 'i3', 'sway', 'cinnamon', 'mate', 'lxqt', 'budgie', 'deepin', 'hyprland'],
    defaultDE: 'kde',

    packageManager: 'pacman',
    hasAUR: true,
    hasFlatpak: true,
    hasSnap: true,

    targetAudience: ['advanced', 'developer'],
    releaseModel: 'rolling',

    minRAM: 1,
    minStorage: 10,

    features: ['Arch Wiki', 'AUR', 'Pacman', 'Minimale Basis-Installation'],
    secureBootSupport: 'partial',
  },
  {
    id: 'debian',
    name: 'Debian',
    logo: '/distros/debian.svg',
    description: 'Der Fels in der Brandung. Extrem stabil, Basis vieler Distributionen.',
    website: 'https://debian.org',
    version: '13 Trixie',
    releaseDate: '9. August 2025',

    beginnerFriendly: 5,
    stability: 10,
    cuttingEdge: 3,
    customizability: 8,
    performance: 8,
    gamingSupport: 5,
    hardwareSupport: 7,
    communitySupport: 9,
    professionalUse: 9,
    privacyFocus: 7,

    availableDEs: ['gnome', 'kde', 'xfce', 'mate', 'cinnamon', 'lxqt'],
    defaultDE: 'gnome',

    packageManager: 'apt',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: false,

    targetAudience: ['intermediate', 'advanced', 'server'],
    releaseModel: 'fixed',

    minRAM: 1,
    minStorage: 10,

    features: ['Extreme Stabilität', 'Freie Software', 'Lange Release-Zyklen', 'Server-Standard'],
    bestFor: [
      'Server und Produktionssysteme',
      'Nutzer, die Stabilität priorisieren',
      'Erfahrene Linux-Nutzer',
      'Nutzer, die freie Software-Prinzipien schätzen',
    ],
    notFor: [
      'Absolute Einsteiger',
      'Nutzer, die neueste Software wollen',
      'Gaming-Enthusiasten',
    ],
    secureBootSupport: 'full',
  },
  {
    id: 'opensuse-tumbleweed',
    name: 'openSUSE Tumbleweed',
    logo: '/distros/opensuse.svg',
    description: 'Rolling Release mit hoher Qualitätssicherung. Deutsche Wurzeln.',
    website: 'https://opensuse.org',
    version: 'Rolling',
    releaseDate: 'Kontinuierlich',

    beginnerFriendly: 6,
    stability: 8,
    cuttingEdge: 9,
    customizability: 9,
    performance: 7,
    gamingSupport: 7,
    hardwareSupport: 8,
    communitySupport: 9,
    professionalUse: 9,
    privacyFocus: 7,

    availableDEs: ['kde', 'gnome', 'xfce', 'i3', 'sway'],
    defaultDE: 'kde',

    packageManager: 'zypper',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: false,

    targetAudience: ['intermediate', 'advanced', 'developer'],
    releaseModel: 'rolling',

    minRAM: 2,
    minStorage: 40,

    features: ['YaST', 'Automatische Qualitätstests', 'System-Schnappschüsse', 'Open Build Service'],
    secureBootSupport: 'full',
  },
  {
    id: 'opensuse-leap',
    name: 'openSUSE Leap',
    logo: '/distros/opensuse.svg',
    description: 'Stabile Version von openSUSE, ideal für Unternehmen.',
    website: 'https://opensuse.org',
    version: '16.0',
    releaseDate: '1. Oktober 2025',

    beginnerFriendly: 6,
    stability: 9,
    cuttingEdge: 5,
    customizability: 8,
    performance: 7,
    gamingSupport: 6,
    hardwareSupport: 8,
    communitySupport: 9,
    professionalUse: 10,
    privacyFocus: 7,

    availableDEs: ['kde', 'gnome', 'xfce', 'cinnamon', 'lxqt', 'budgie', 'sway'],
    defaultDE: 'kde',

    packageManager: 'zypper',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: false,

    targetAudience: ['intermediate', 'advanced', 'server'],
    releaseModel: 'fixed',

    minRAM: 2,
    minStorage: 40,

    features: ['YaST', 'Enterprise-Qualität', 'System-Schnappschüsse', 'SUSE Support möglich'],
    secureBootSupport: 'full',
  },
  {
    id: 'zorin',
    name: 'Zorin OS',
    logo: '/distros/zorin.svg',
    description: 'Windows-ähnliches Design, perfekt für Umsteiger.',
    website: 'https://zorin.com/os',
    version: '18',
    releaseDate: '14. Oktober 2025',

    beginnerFriendly: 10,
    stability: 8,
    cuttingEdge: 5,
    customizability: 6,
    performance: 7,
    gamingSupport: 7,
    hardwareSupport: 8,
    communitySupport: 6,
    professionalUse: 6,
    privacyFocus: 5,

    availableDEs: ['gnome'],
    defaultDE: 'gnome',

    packageManager: 'apt',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: true,

    targetAudience: ['beginner'],
    releaseModel: 'fixed',

    minRAM: 2,
    minStorage: 15,

    features: ['Windows-Look', 'Zorin Appearance', 'Zorin Connect', 'Wine vorinstalliert'],
    basedOn: 'ubuntu',
    secureBootSupport: 'full',
  },
  {
    id: 'elementary',
    name: 'elementary OS',
    logo: '/distros/elementary.svg',
    description: 'Elegantes macOS-ähnliches Design mit eigenem App-Store.',
    website: 'https://elementary.io',
    version: '8.1',
    releaseDate: '22. Dezember 2025',

    beginnerFriendly: 9,
    stability: 8,
    cuttingEdge: 5,
    customizability: 4,
    performance: 7,
    gamingSupport: 5,
    hardwareSupport: 8,
    communitySupport: 6,
    professionalUse: 6,
    privacyFocus: 7,

    availableDEs: ['pantheon'],
    defaultDE: 'pantheon',

    packageManager: 'apt',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: false,

    targetAudience: ['beginner'],
    releaseModel: 'fixed',

    minRAM: 4,
    minStorage: 32,

    features: ['AppCenter', 'Kuratierte Apps', 'Konsistentes Design', 'Datenschutz-Fokus'],
    warnings: [
      'Keine In-Place-Upgrades (Neuinstallation erforderlich)',
      'Begrenzte Anpassungsmöglichkeiten (Design-Entscheidung)',
    ],
    bestFor: [
      'macOS-Umsteiger',
      'Design-bewusste Nutzer',
      'Nutzer, die ein kuratiertes Erlebnis wollen',
    ],
    notFor: [
      'Power-User, die viel anpassen wollen',
      'Nutzer, die immer die allerneueste Software brauchen',
    ],
    basedOn: 'ubuntu',
    secureBootSupport: 'full',
  },
  {
    id: 'endeavouros',
    name: 'EndeavourOS',
    logo: '/distros/endeavouros.svg',
    description: 'Arch Linux mit grafischem Installer und freundlicher Community. Fast reines Arch.',
    website: 'https://endeavouros.com',
    version: 'Ganymede Neo',
    releaseDate: '15. Januar 2026',

    beginnerFriendly: 5,
    stability: 7,
    cuttingEdge: 9,
    customizability: 9,
    performance: 9,
    gamingSupport: 7,
    hardwareSupport: 9,
    communitySupport: 7,
    professionalUse: 7,
    privacyFocus: 8,

    availableDEs: ['kde', 'gnome', 'xfce', 'i3', 'mate', 'cinnamon', 'budgie', 'lxqt'],
    defaultDE: 'kde',

    packageManager: 'pacman',
    hasAUR: true,
    hasFlatpak: true,
    hasSnap: false,

    targetAudience: ['intermediate', 'advanced', 'developer'],
    releaseModel: 'rolling',

    minRAM: 2,
    minStorage: 15,

    features: ['Calamares Installer', 'Vanilla Arch', 'Gute Community', 'Deutsches Subforum', 'Viele DE-Optionen'],
    bestFor: [
      'Nutzer, die Arch lernen wollen',
      'Minimalisten',
      'Nutzer, die volle Kontrolle wollen',
    ],
    notFor: [
      'Absolute Einsteiger',
      'Nutzer, die alles vorinstalliert wollen',
      'Stabilitäts-fokussierte Nutzer',
    ],
    installDifficulty: 3,
    basedOn: 'arch',
    secureBootSupport: 'none',
  },
  {
    id: 'nobara',
    name: 'Nobara',
    logo: '/distros/nobara.svg',
    description: 'Gaming-fokussierte Fedora-Variante vom Proton-GE-Entwickler GloriousEggroll. Gaming sofort startklar.',
    website: 'https://nobaraproject.org',
    version: '43',
    releaseDate: '26. Dezember 2025',

    beginnerFriendly: 7,
    stability: 6,
    cuttingEdge: 8,
    customizability: 6,
    performance: 8,
    gamingSupport: 10,
    hardwareSupport: 8,
    communitySupport: 5,
    professionalUse: 6,
    privacyFocus: 6,

    availableDEs: ['gnome', 'kde'],
    defaultDE: 'kde',

    packageManager: 'dnf',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: false,

    targetAudience: ['gamer', 'intermediate'],
    releaseModel: 'fixed',

    minRAM: 4,
    minStorage: 40,

    features: ['Proton-GE vorinstalliert', 'Steam vorinstalliert', 'OBS Studio Ready', 'Gaming-Optimierungen'],
    warnings: [
      'Hobbyprojekt einer Person - kein Enterprise-Support',
      'Kein Secure Boot Support',
      'NVIDIA Pascal (GTX 10-Serie) nicht standardmäßig unterstützt',
    ],
    bestFor: [
      'Gamer',
      'Streamer und Video-Ersteller',
      'Nutzer, die sofort losspielen wollen',
    ],
    notFor: [
      'Unternehmen und Produktionsumgebungen',
      'Nutzer mit älterer NVIDIA-Hardware',
      'Nutzer, die Secure Boot brauchen',
    ],
    installDifficulty: 3,
    basedOn: 'fedora',
    secureBootSupport: 'none',
  },
  {
    id: 'garuda',
    name: 'Garuda Linux',
    logo: '/distros/garuda.svg',
    description: 'Gaming-optimiertes Arch mit auffälligem Design.',
    website: 'https://garudalinux.org',

    beginnerFriendly: 6,
    stability: 7,
    cuttingEdge: 10,
    customizability: 9,
    performance: 9,
    gamingSupport: 10,
    hardwareSupport: 9,
    communitySupport: 7,
    professionalUse: 5,
    privacyFocus: 6,

    availableDEs: ['kde', 'gnome', 'xfce', 'i3', 'sway', 'hyprland'],
    defaultDE: 'kde',

    packageManager: 'pacman',
    hasAUR: true,
    hasFlatpak: true,
    hasSnap: false,

    targetAudience: ['gamer', 'intermediate', 'advanced'],
    releaseModel: 'rolling',

    minRAM: 4,
    minStorage: 40,

    features: ['Garuda Gamer', 'System-Schnappschüsse', 'Performance-Optimierungen', 'Gaming Tools vorinstalliert'],
    basedOn: 'arch',
    secureBootSupport: 'partial',
  },
  {
    id: 'cachyos',
    name: 'CachyOS',
    logo: '/distros/cachyos.svg',
    description: 'Performance-optimiertes Arch Linux mit eigenem Kernel und CPU-spezifischen Optimierungen. Ideal für Gaming und maximale Geschwindigkeit.',
    website: 'https://cachyos.org',
    version: 'Rolling',
    releaseDate: 'Januar 2026',

    beginnerFriendly: 5,
    stability: 7,
    cuttingEdge: 10,
    customizability: 9,
    performance: 10,
    gamingSupport: 10,
    hardwareSupport: 9,
    communitySupport: 7,
    professionalUse: 7,
    privacyFocus: 6,

    availableDEs: ['kde', 'gnome', 'xfce', 'hyprland', 'i3', 'sway'],
    defaultDE: 'kde',

    packageManager: 'pacman',
    hasAUR: true,
    hasFlatpak: true,
    hasSnap: false,

    targetAudience: ['gamer', 'intermediate', 'advanced', 'developer'],
    releaseModel: 'rolling',

    minRAM: 2,
    minStorage: 20,

    features: ['BORE/EEVDF Scheduler', 'x86-64-v3/v4 Optimierungen', 'CachyOS Kernel Manager', 'Ein-Klick Gaming Setup', 'Hardware Auto-Erkennung'],
    warnings: [
      'Rolling Release - regelmäßige Updates erforderlich',
      'Moderne CPU erforderlich (ab 2013)',
      'Arch-basiert - erfordert grundlegende Linux-Kenntnisse',
    ],
    bestFor: [
      'Performance-Enthusiasten',
      'Linux-Gamer',
      'Nutzer mit moderner Hardware',
      'Entwickler, die Geschwindigkeit schätzen',
    ],
    notFor: [
      'Absolute Linux-Einsteiger',
      'Nutzer mit sehr alter Hardware (vor 2013)',
      'Nutzer, die maximale Stabilität brauchen',
    ],
    installDifficulty: 4,
    basedOn: 'arch',
    secureBootSupport: 'partial',
  },
  {
    id: 'mx-linux',
    name: 'MX Linux',
    logo: '/distros/mxlinux.svg',
    description: 'Effiziente und stabile Distribution für ältere Hardware.',
    website: 'https://mxlinux.org',

    beginnerFriendly: 7,
    stability: 9,
    cuttingEdge: 4,
    customizability: 8,
    performance: 9,
    gamingSupport: 5,
    hardwareSupport: 9,
    communitySupport: 8,
    professionalUse: 7,
    privacyFocus: 7,

    availableDEs: ['xfce', 'kde', 'fluxbox'],
    defaultDE: 'xfce',

    packageManager: 'apt',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: false,

    targetAudience: ['beginner', 'intermediate'],
    releaseModel: 'fixed',

    minRAM: 1,
    minStorage: 8,

    features: ['MX Tools', 'Live USB', 'Ressourcenschonend', 'Gute Hardware-Erkennung'],
    basedOn: 'debian',
    secureBootSupport: 'partial',
  },
  {
    id: 'tails',
    name: 'Tails',
    logo: '/distros/tails.svg',
    description: 'Maximale Anonymität und Sicherheit. Läuft nur von USB/DVD.',
    website: 'https://tails.net',

    beginnerFriendly: 4,
    stability: 8,
    cuttingEdge: 5,
    customizability: 2,
    performance: 6,
    gamingSupport: 1,
    hardwareSupport: 6,
    communitySupport: 7,
    professionalUse: 4,
    privacyFocus: 10,

    availableDEs: ['gnome'],
    defaultDE: 'gnome',

    packageManager: 'apt',
    hasAUR: false,
    hasFlatpak: false,
    hasSnap: false,

    targetAudience: ['privacy', 'advanced'],
    releaseModel: 'fixed',

    minRAM: 2,
    minStorage: 8,

    features: ['Tor Browser', 'Amnesic System', 'Verschlüsselung', 'Keine Spuren'],
    basedOn: 'debian',
    secureBootSupport: 'partial',
  },
  {
    id: 'qubes',
    name: 'Qubes OS',
    logo: '/distros/qubes.svg',
    description: 'Hochsicheres System mit Isolation durch Virtualisierung.',
    website: 'https://qubes-os.org',

    beginnerFriendly: 1,
    stability: 8,
    cuttingEdge: 5,
    customizability: 7,
    performance: 4,
    gamingSupport: 1,
    hardwareSupport: 5,
    communitySupport: 6,
    professionalUse: 8,
    privacyFocus: 10,

    availableDEs: ['xfce'],
    defaultDE: 'xfce',

    packageManager: 'dnf',
    hasAUR: false,
    hasFlatpak: false,
    hasSnap: false,

    targetAudience: ['privacy', 'advanced'],
    releaseModel: 'fixed',

    minRAM: 16,
    minStorage: 128,

    features: ['Sicherheit durch Abschottung', 'Virtuelle Computer', 'Einweg-Systeme', 'Whonix Integration'],
    secureBootSupport: 'none',
  },
  {
    id: 'kubuntu',
    name: 'Kubuntu',
    logo: '/distros/kubuntu.svg',
    description: 'Ubuntu mit KDE Plasma - das Beste aus beiden Welten.',
    website: 'https://kubuntu.org',

    beginnerFriendly: 8,
    stability: 8,
    cuttingEdge: 6,
    customizability: 9,
    performance: 7,
    gamingSupport: 8,
    hardwareSupport: 9,
    communitySupport: 8,
    professionalUse: 7,
    privacyFocus: 5,

    availableDEs: ['kde'],
    defaultDE: 'kde',

    packageManager: 'apt',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: true,

    targetAudience: ['beginner', 'intermediate'],
    releaseModel: 'fixed',

    minRAM: 2,
    minStorage: 25,

    features: ['KDE Plasma', 'Discover App Store', 'Ubuntu Basis', 'Anpassbar'],
    basedOn: 'ubuntu',
    secureBootSupport: 'full',
  },
  {
    id: 'void',
    name: 'Void Linux',
    logo: '/distros/void.svg',
    description: 'Unabhängige Distribution mit eigener System-Verwaltung und Software-Installation.',
    website: 'https://voidlinux.org',

    beginnerFriendly: 2,
    stability: 8,
    cuttingEdge: 8,
    customizability: 10,
    performance: 10,
    gamingSupport: 6,
    hardwareSupport: 7,
    communitySupport: 6,
    professionalUse: 6,
    privacyFocus: 8,

    availableDEs: ['xfce', 'kde', 'gnome', 'i3', 'sway'],
    defaultDE: 'xfce',

    packageManager: 'xbps',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: false,

    targetAudience: ['advanced'],
    releaseModel: 'rolling',

    minRAM: 1,
    minStorage: 10,

    features: ['Eigene System-Verwaltung', 'Eigenes Programm zum Installieren von Software', 'Leichtgewichtige Option', 'Unabhängig'],
    secureBootSupport: 'none',
  },
  {
    id: 'gentoo',
    name: 'Gentoo',
    logo: '/distros/gentoo.svg',
    description: 'Kompiliere alles selbst - maximale Kontrolle und Optimierung.',
    website: 'https://gentoo.org',

    beginnerFriendly: 1,
    stability: 9,
    cuttingEdge: 8,
    customizability: 10,
    performance: 10,
    gamingSupport: 7,
    hardwareSupport: 8,
    communitySupport: 7,
    professionalUse: 7,
    privacyFocus: 8,

    availableDEs: ['kde', 'gnome', 'xfce', 'i3', 'sway', 'mate'],
    defaultDE: 'kde',

    packageManager: 'portage',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: false,

    targetAudience: ['advanced'],
    releaseModel: 'rolling',

    minRAM: 2,
    minStorage: 30,

    features: ['Portage', 'Anpassungsoptionen', 'Aus Quellcode erstellt', 'Maximale Optimierung'],
    secureBootSupport: 'partial',
  },
  {
    id: 'nixos',
    name: 'NixOS',
    logo: '/distros/nixos.svg',
    description: 'Deklaratives System - reproduzierbare Konfiguration.',
    website: 'https://nixos.org',

    beginnerFriendly: 2,
    stability: 9,
    cuttingEdge: 8,
    customizability: 10,
    performance: 7,
    gamingSupport: 6,
    hardwareSupport: 7,
    communitySupport: 7,
    professionalUse: 8,
    privacyFocus: 7,

    availableDEs: ['gnome', 'kde', 'xfce', 'i3', 'sway'],
    defaultDE: 'gnome',

    packageManager: 'nix',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: false,

    targetAudience: ['advanced', 'developer'],
    releaseModel: 'rolling',

    minRAM: 2,
    minStorage: 30,

    features: ['Nix (Programm zum Installieren von Software)', 'Beschreibbare Konfiguration', 'Änderungen rückgängig machen', 'Reproduzierbar'],
    secureBootSupport: 'partial',
  },
  {
    id: 'bazzite',
    name: 'Bazzite',
    logo: '/distros/bazzite.svg',
    description: 'SteamOS-Alternative für alle Geräte. Immutables Gaming-OS basierend auf Fedora Atomic.',
    website: 'https://bazzite.gg',
    version: '43',
    releaseDate: 'Herbst 2025',

    beginnerFriendly: 6,
    stability: 8,
    cuttingEdge: 8,
    customizability: 5,
    performance: 8,
    gamingSupport: 10,
    hardwareSupport: 8,
    communitySupport: 3,
    professionalUse: 4,
    privacyFocus: 7,

    availableDEs: ['kde', 'gnome'],
    defaultDE: 'kde',

    packageManager: 'rpm-ostree',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: false,

    targetAudience: ['gamer', 'intermediate'],
    releaseModel: 'immutable',

    minRAM: 4,
    minStorage: 50,

    features: ['Steam Gaming Mode', 'Änderungen bis zu 90 Tage rückgängig machen', 'Android-Apps möglich', 'Handheld-Support'],
    warnings: [
      'Geschütztes System (Programme werden anders installiert)',
      'NVIDIA im Gaming Mode (Steam Deck-Modus) in Beta, Desktop-NVIDIA stabil',
      'Anti-Cheat-Spiele (Valorant, Fortnite) funktionieren nicht',
    ],
    bestFor: [
      'Handheld-PC-Besitzer (ROG Ally, Legion Go)',
      'Steam Deck-Nutzer, die mehr wollen',
      'HTPC/Wohnzimmer-Gaming',
    ],
    notFor: [
      'Nutzer, die volle Systemkontrolle wollen',
      'Anti-Cheat-Spiele-Spieler',
    ],
    installDifficulty: 3,
    basedOn: 'fedora',
    secureBootSupport: 'partial',
  },
  {
    id: 'antix',
    name: 'antiX',
    logo: '/distros/antix.svg',
    description: 'Ultra-leichtgewichtig mit eigener System-Verwaltung. Perfekt für sehr alte Hardware.',
    website: 'https://antixlinux.com',
    version: '23.2',
    releaseDate: 'Oktober 2024',

    beginnerFriendly: 4,
    stability: 9,
    cuttingEdge: 3,
    customizability: 7,
    performance: 10,
    gamingSupport: 2,
    hardwareSupport: 8,
    communitySupport: 6,
    professionalUse: 5,
    privacyFocus: 8,

    availableDEs: ['icewm', 'fluxbox', 'jwm', 'herbstluftwm'],
    defaultDE: 'icewm',

    packageManager: 'apt',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: false,

    targetAudience: ['advanced', 'intermediate'],
    releaseModel: 'fixed',

    minRAM: 0.5, // 512 MB (official recommended minimum; 256 MB only for core/net without desktop)
    minStorage: 10,

    features: ['Eigene System-Verwaltung', 'Extrem ressourcenschonend', 'Live-USB persistenz', 'antiX Control Centre'],
    warnings: [
      'Spartanisches Design',
      'Unkonventionelle Window-Manager',
      'Steilere Lernkurve für Einsteiger',
    ],
    bestFor: [
      'Besitzer sehr alter Computer',
      'Nutzer, die alternative System-Verwaltung bevorzugen',
      'Minimalisten',
    ],
    notFor: [
      'Einsteiger, die Windows-Feeling wollen',
      'Nutzer moderner Desktops',
      'Gamer',
    ],
    installDifficulty: 5,
    basedOn: 'debian',
    secureBootSupport: 'none',
  },
  {
    id: 'puppy',
    name: 'Puppy Linux',
    logo: '/distros/puppy.svg',
    description: 'Winzig, schnell, läuft komplett im RAM. Ideal für USB und Systemrettung.',
    website: 'https://puppylinux-woof-ce.github.io/',
    version: 'Verschiedene Puplets',
    releaseDate: 'Variiert',

    beginnerFriendly: 4,
    stability: 7,
    cuttingEdge: 3,
    customizability: 6,
    performance: 10,
    gamingSupport: 2,
    hardwareSupport: 7,
    communitySupport: 4,
    professionalUse: 3,
    privacyFocus: 6,

    availableDEs: ['jwm', 'openbox'],
    defaultDE: 'jwm',

    packageManager: 'apt', // PET packages actually
    hasAUR: false,
    hasFlatpak: false,
    hasSnap: false,

    targetAudience: ['advanced', 'intermediate'],
    releaseModel: 'fixed',

    minRAM: 0.128, // 128 MB
    minStorage: 0.5, // 512 MB

    features: ['Läuft komplett im RAM', 'Extrem klein (~300–800 MB je nach Variante)', 'Portable auf USB', 'Systemrettung'],
    warnings: [
      'Standardmäßig als Root ausgeführt',
      'Ungewöhnliche Paket-Formate (PET, SFS)',
      'Veraltetes Aussehen',
    ],
    bestFor: [
      'Besitzer sehr alter Hardware',
      'Portables System auf USB',
      'Systemrettung und Datenwiederherstellung',
    ],
    notFor: [
      'Täglicher Desktop-Einsatz',
      'Sicherheitsbewusste Nutzer',
      'Einsteiger',
    ],
    installDifficulty: 5,
    secureBootSupport: 'none',
  },
  {
    id: 'linuxlite',
    name: 'Linux Lite',
    logo: '/distros/linuxlite.svg',
    description: 'Der perfekte Übergang von Windows. Windows-7-ähnliche Oberfläche mit Lite-Tools.',
    website: 'https://www.linuxliteos.com',
    version: '7.8',
    releaseDate: '1. Februar 2026',

    beginnerFriendly: 9,
    stability: 8,
    cuttingEdge: 4,
    customizability: 6,
    performance: 8,
    gamingSupport: 4,
    hardwareSupport: 8,
    communitySupport: 3,
    professionalUse: 5,
    privacyFocus: 5,

    availableDEs: ['xfce'],
    defaultDE: 'xfce',

    packageManager: 'apt',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: false,

    targetAudience: ['beginner'],
    releaseModel: 'fixed',

    minRAM: 0.768, // 768 MB
    minStorage: 8,

    features: ['Lite Tools Suite', 'Windows-7-Feeling', 'Lite Welcome Center', 'Chrome vorinstalliert'],
    warnings: [
      'UEFI-Kompatibilität kann problematisch sein',
      'Google Chrome als Standard (Datenschutzbedenken)',
      'Keine deutsche Community',
    ],
    bestFor: [
      'Windows-7/10-Umsteiger',
      'Ältere Hardware',
      'Absolute Linux-Einsteiger',
    ],
    notFor: [
      'Datenschutz-Enthusiasten',
      'Nutzer mit neuester UEFI-Hardware',
      'Erfahrene Linux-Nutzer',
    ],
    installDifficulty: 2,
    basedOn: 'ubuntu',
    secureBootSupport: 'partial',
  },
  {
    id: 'lubuntu',
    name: 'Lubuntu',
    logo: '/distros/lubuntu.svg',
    description: 'Ubuntu für ältere Computer. Leichtgewichtigste offizielle Ubuntu-Variante mit LXQt.',
    website: 'https://lubuntu.me',
    version: '24.04 LTS',
    releaseDate: '25. April 2024',

    beginnerFriendly: 7,
    stability: 8,
    cuttingEdge: 5,
    customizability: 5,
    performance: 9,
    gamingSupport: 4,
    hardwareSupport: 8,
    communitySupport: 6,
    professionalUse: 5,
    privacyFocus: 6,

    availableDEs: ['lxqt'],
    defaultDE: 'lxqt',

    packageManager: 'apt',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: true,

    targetAudience: ['beginner', 'intermediate'],
    releaseModel: 'fixed',

    minRAM: 1,
    minStorage: 8,

    features: ['LXQt Desktop', 'Ubuntu-Kompatibilität', 'Sehr ressourcenschonend', 'Discover App Store'],
    warnings: [
      'Weniger poliertes Design',
      'Begrenzte Vorinstallation',
    ],
    bestFor: [
      'Besitzer älterer Hardware',
      'Nutzer, die Ubuntu-Kompatibilität wollen',
      'Schulen und Bibliotheken',
    ],
    notFor: [
      'Nutzer, die visuelle Politur wollen',
      'Gamer',
      'Video-Ersteller',
    ],
    installDifficulty: 2,
    basedOn: 'ubuntu',
    secureBootSupport: 'full',
  },
  {
    id: 'xubuntu',
    name: 'Xubuntu',
    logo: '/distros/xubuntu.svg',
    description: 'Ubuntu mit Xfce - stabil, leicht und konfigurierbar.',
    website: 'https://xubuntu.org',

    beginnerFriendly: 8,
    stability: 8,
    cuttingEdge: 6,
    customizability: 8,
    performance: 8,
    gamingSupport: 7,
    hardwareSupport: 9,
    communitySupport: 7,
    professionalUse: 7,
    privacyFocus: 5,

    availableDEs: ['xfce'],
    defaultDE: 'xfce',

    packageManager: 'apt',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: true,

    targetAudience: ['beginner', 'intermediate'],
    releaseModel: 'fixed',

    minRAM: 1,
    minStorage: 20,

    features: ['Xfce Desktop', 'Whisker Menu', 'Ubuntu Basis', 'Ressourcenschonend'],
    warnings: [
      'Weniger moderne Optik als KDE/GNOME',
      'Kleinere Community als Hauptvarianten',
    ],
    bestFor: [
      'Nutzer, die Balance zwischen Leistung und Funktionen suchen',
      'Besitzer älterer oder schwächerer Hardware',
      'Nutzer, die Ubuntu-Kompatibilität wollen',
    ],
    notFor: [
      'Nutzer, die modernste Optik wollen',
      'Touch-Geräte-Nutzer',
    ],
    installDifficulty: 2,
    basedOn: 'ubuntu',
    secureBootSupport: 'full',
  },
  {
    id: 'kdeneon',
    name: 'KDE neon',
    logo: '/distros/kdeneon.svg',
    description: 'Immer das neueste KDE Plasma. Ubuntu LTS-Basis mit Rolling KDE.',
    website: 'https://neon.kde.org',
    version: 'Rolling KDE auf Ubuntu 24.04',
    releaseDate: 'Kontinuierlich',

    beginnerFriendly: 5,
    stability: 7,
    cuttingEdge: 9,
    customizability: 10,
    performance: 6,
    gamingSupport: 5,
    hardwareSupport: 7,
    communitySupport: 6,
    professionalUse: 6,
    privacyFocus: 7,

    availableDEs: ['kde'],
    defaultDE: 'kde',

    packageManager: 'apt',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: true,

    targetAudience: ['intermediate', 'advanced', 'developer'],
    releaseModel: 'semi-rolling',

    minRAM: 4,
    minStorage: 25,

    features: ['Neuestes KDE Plasma', 'Von KDE-Entwicklern', 'Ubuntu LTS-Stabilität', 'Universelle App-Formate'],
    warnings: [
      'Minimale Vorinstallation - viel Nacharbeit',
      'NVIDIA-Support offiziell nicht unterstützt',
      'KDE-Updates können Bugs einführen',
    ],
    bestFor: [
      'KDE-Enthusiasten',
      'Entwickler und Tester',
      'Anpassungs-Fans',
    ],
    notFor: [
      'Einsteiger',
      'Produktionsumgebungen',
      'NVIDIA-GPU-Nutzer',
    ],
    installDifficulty: 4,
    basedOn: 'ubuntu',
    secureBootSupport: 'full',
  },
  {
    id: 'ubuntu-budgie',
    name: 'Ubuntu Budgie',
    logo: '/distros/ubuntu-budgie.svg',
    description: 'Ubuntu mit Budgie Desktop - elegant, modern und benutzerfreundlich.',
    website: 'https://ubuntubudgie.org',

    beginnerFriendly: 8,
    stability: 8,
    cuttingEdge: 6,
    customizability: 7,
    performance: 7,
    gamingSupport: 7,
    hardwareSupport: 9,
    communitySupport: 6,
    professionalUse: 7,
    privacyFocus: 5,

    availableDEs: ['budgie'],
    defaultDE: 'budgie',

    packageManager: 'apt',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: true,

    targetAudience: ['beginner', 'intermediate'],
    releaseModel: 'fixed',

    minRAM: 2,
    minStorage: 25,

    features: ['Budgie Desktop', 'Budgie Welcome', 'Ubuntu Basis', 'Moderne Oberfläche'],
    basedOn: 'ubuntu',
    secureBootSupport: 'full',
  },
  {
    id: 'solus',
    name: 'Solus',
    logo: '/distros/solus.svg',
    description: 'Unabhängige Distribution mit eigenem Budgie-Desktop. Kuratiertes Rolling Release für den Desktop.',
    website: 'https://getsol.us',
    version: '4.8 Opportunity',
    releaseDate: '29. November 2025',

    beginnerFriendly: 7,
    stability: 8,
    cuttingEdge: 7,
    customizability: 6,
    performance: 8,
    gamingSupport: 7,
    hardwareSupport: 7,
    communitySupport: 4,
    professionalUse: 6,
    privacyFocus: 6,

    availableDEs: ['budgie', 'gnome', 'kde', 'xfce'],
    defaultDE: 'budgie',

    packageManager: 'eopkg',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: false,

    targetAudience: ['beginner', 'intermediate'],
    releaseModel: 'semi-rolling',

    minRAM: 4,
    minStorage: 10,

    features: ['Budgie Desktop', 'Eigener Paketmanager (eopkg)', 'Kuratiertes Rolling Release', 'Flatpak vorinstalliert', 'Vier Desktop-Editionen'],
    warnings: [
      'Kleinere Paketquellen (~12.000 Pakete) als Ubuntu oder Fedora',
      'Kein AUR oder vergleichbares Community-Repository',
      'Kleine Entwickler-Community - kein Unternehmens-Support',
    ],
    bestFor: [
      'Desktop-Nutzer, die ein kuratiertes Erlebnis wollen',
      'Budgie-Desktop-Fans',
      'Nutzer, die eine unabhängige Distribution bevorzugen',
    ],
    notFor: [
      'Server- und Enterprise-Nutzer',
      'Nutzer, die ein riesiges Paket-Angebot brauchen',
      'Nutzer mit spezieller Nischen-Software',
    ],
    installDifficulty: 3,
    secureBootSupport: 'partial',
  },
  {
    id: 'ubuntu-studio',
    name: 'Ubuntu Studio',
    logo: '/distros/ubuntu-studio.svg',
    description: 'Ubuntu für Kreative - Audio, Video, Grafik und Publishing mit professionellen Tools.',
    website: 'https://ubuntustudio.org',

    beginnerFriendly: 6,
    stability: 8,
    cuttingEdge: 6,
    customizability: 8,
    performance: 7,
    gamingSupport: 6,
    hardwareSupport: 8,
    communitySupport: 6,
    professionalUse: 9,
    privacyFocus: 5,

    availableDEs: ['kde'],
    defaultDE: 'kde',

    packageManager: 'apt',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: true,

    targetAudience: ['intermediate', 'advanced', 'developer'],
    releaseModel: 'fixed',

    minRAM: 4,
    minStorage: 30,

    features: ['Low-Latency Kernel', 'Audio Production', 'Video Editing', 'Grafik Tools', 'KDE Plasma'],
    basedOn: 'ubuntu',
    secureBootSupport: 'full',
  },
  {
    id: 'ubuntu-mate',
    name: 'Ubuntu MATE',
    logo: '/distros/ubuntu-mate.svg',
    description: 'Ubuntu mit MATE Desktop - traditionell, effizient und anpassbar.',
    website: 'https://ubuntu-mate.org',

    beginnerFriendly: 8,
    stability: 8,
    cuttingEdge: 6,
    customizability: 8,
    performance: 7,
    gamingSupport: 7,
    hardwareSupport: 9,
    communitySupport: 7,
    professionalUse: 7,
    privacyFocus: 5,

    availableDEs: ['mate'],
    defaultDE: 'mate',

    packageManager: 'apt',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: true,

    targetAudience: ['beginner', 'intermediate'],
    releaseModel: 'fixed',

    minRAM: 2,
    minStorage: 20,

    features: ['MATE Desktop', 'Compiz', 'Ubuntu Basis', 'Traditionelles Layout'],
    basedOn: 'ubuntu',
    secureBootSupport: 'full',
  },
  {
    id: 'ubuntu-cinnamon',
    name: 'Ubuntu Cinnamon',
    logo: '/distros/ubuntu-cinnamon.svg',
    description: 'Ubuntu mit Cinnamon Desktop - vertraut, modern und Windows-ähnlich.',
    website: 'https://ubuntucinnamon.org',

    beginnerFriendly: 9,
    stability: 8,
    cuttingEdge: 6,
    customizability: 8,
    performance: 7,
    gamingSupport: 7,
    hardwareSupport: 9,
    communitySupport: 6,
    professionalUse: 7,
    privacyFocus: 5,

    availableDEs: ['cinnamon'],
    defaultDE: 'cinnamon',

    packageManager: 'apt',
    hasAUR: false,
    hasFlatpak: true,
    hasSnap: true,

    targetAudience: ['beginner', 'intermediate'],
    releaseModel: 'fixed',

    minRAM: 2,
    minStorage: 25,

    features: ['Cinnamon Desktop', 'Windows-ähnlich', 'Ubuntu Basis', 'Nemo Dateimanager'],
    basedOn: 'ubuntu',
    secureBootSupport: 'full',
  },
];

// Helper function to get distro by ID
export function getDistroById(id: string): Distro | undefined {
  return distros.find(d => d.id === id);
}

// Helper function to filter distros by criteria
export function filterDistros(criteria: Partial<Distro>): Distro[] {
  return distros.filter(distro => {
    for (const [key, value] of Object.entries(criteria)) {
      if (distro[key as keyof Distro] !== value) {
        return false;
      }
    }
    return true;
  });
}
