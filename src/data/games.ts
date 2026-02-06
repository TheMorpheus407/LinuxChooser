// Spielekompatibilität für Linux
// Daten aus der Recherche Januar 2026

export type CompatibilityStatus = 'native' | 'proton-platinum' | 'proton-gold' | 'proton-silver' | 'proton-bronze' | 'partial' | 'broken' | 'anticheat';

export interface Game {
  id: string;
  name: string;
  status: CompatibilityStatus;
  antiCheat?: string;
  antiCheatType: 'none' | 'server-side' | 'non-kernel' | 'kernel-level';
  reason: string; // German explanation
  howToPlay: string; // German
  workaround?: string; // German suggestion
  warnings?: string[]; // German
  protonDbUrl?: string;
  category: 'fps' | 'moba' | 'rpg' | 'racing' | 'sports' | 'sandbox' | 'battle-royale' | 'mmo' | 'other';
  isPopular: boolean;
}

// Spiele die NICHT auf Linux funktionieren (problematisch)
export const problematicGames: Game[] = [
  {
    id: 'valorant',
    name: 'Valorant',
    status: 'anticheat',
    antiCheat: 'Vanguard',
    antiCheatType: 'kernel-level',
    reason: 'Riot Games hat explizit erklärt, dass Linux nicht unterstützt wird. Vanguard erfordert direkten Windows-Kernel-Zugriff.',
    howToPlay: 'Nicht möglich auf Linux',
    workaround: 'Dual-Boot mit Windows oder Cloud-Gaming (GeForce NOW, Shadow).',
    warnings: [
      'Keine Lösung für natives Linux-Spielen',
      'VM mit GPU-Passthrough wird blockiert',
    ],
    category: 'fps',
    isPopular: true,
  },
  {
    id: 'league',
    name: 'League of Legends',
    status: 'anticheat',
    antiCheat: 'Vanguard',
    antiCheatType: 'kernel-level',
    reason: 'Seit Patch 14.9 (Mai 2024) verwendet LoL Vanguard Anti-Cheat. Vorher funktionierte es via Wine/Lutris.',
    howToPlay: 'Nicht möglich auf Linux',
    workaround: 'Dual-Boot mit Windows oder Cloud-Gaming (GeForce NOW, Shadow).',
    warnings: [
      'Funktionierte früher auf Linux, wurde absichtlich blockiert',
    ],
    category: 'moba',
    isPopular: true,
  },
  {
    id: 'fortnite',
    name: 'Fortnite',
    status: 'anticheat',
    antiCheat: 'Easy Anti-Cheat',
    antiCheatType: 'kernel-level',
    reason: 'Epic Games besitzt EAC und hat es Linux-kompatibel gemacht - weigert sich aber, es für Fortnite zu aktivieren.',
    howToPlay: 'Nicht möglich auf Linux',
    workaround: 'Dual-Boot mit Windows, Cloud-Gaming (GeForce NOW, Xbox Cloud) oder Android-Version.',
    warnings: [
      'Epic weigert sich trotz technischer Möglichkeit',
    ],
    category: 'battle-royale',
    isPopular: true,
  },
  {
    id: 'cod',
    name: 'Call of Duty: Warzone/MW3',
    status: 'anticheat',
    antiCheat: 'RICOCHET',
    antiCheatType: 'kernel-level',
    reason: 'RICOCHET erfordert TPM 2.0, Secure Boot und Windows-Kernel-Zugriff.',
    howToPlay: 'Nicht möglich auf Linux',
    workaround: 'Dual-Boot mit Windows ist die einzige Lösung.',
    protonDbUrl: 'https://www.protondb.com/app/1962663',
    category: 'fps',
    isPopular: true,
  },
  {
    id: 'pubg',
    name: 'PUBG: Battlegrounds',
    status: 'anticheat',
    antiCheat: 'Zakynthos + BattlEye',
    antiCheatType: 'kernel-level',
    reason: 'Mehrstufiges Anti-Cheat-System: Zakynthos (proprietär) als Dach mit BattlEye und Wellbia als zusätzliche Kernel-Level-Schichten. Keines davon ist für Linux aktiviert.',
    howToPlay: 'Nicht möglich auf Linux',
    workaround: 'Dual-Boot mit Windows erforderlich.',
    protonDbUrl: 'https://www.protondb.com/app/578080',
    category: 'battle-royale',
    isPopular: true,
  },
  {
    id: 'apex',
    name: 'Apex Legends',
    status: 'anticheat',
    antiCheat: 'Easy Anti-Cheat',
    antiCheatType: 'kernel-level',
    reason: 'Hat vorher funktioniert! EA hat Linux-Support im Oktober 2024 entfernt wegen "Cheater-Bedenken".',
    howToPlay: 'Nicht möglich auf Linux',
    workaround: 'Dual-Boot mit Windows oder Cloud-Gaming (GeForce NOW).',
    warnings: [
      'Funktionierte auf Steam Deck und Linux, wurde absichtlich deaktiviert',
    ],
    protonDbUrl: 'https://www.protondb.com/app/1172470',
    category: 'battle-royale',
    isPopular: true,
  },
  {
    id: 'destiny2',
    name: 'Destiny 2',
    status: 'anticheat',
    antiCheat: 'BattlEye',
    antiCheatType: 'kernel-level',
    reason: 'BattlEye unterstützt Linux, aber Bungie hat es nicht aktiviert. Linux-Spieler werden GEBANNT!',
    howToPlay: 'NICHT SPIELEN - BANN-RISIKO!',
    workaround: 'Dual-Boot mit Windows (sicher) oder GeForce NOW (offiziell unterstützt).',
    warnings: [
      'VERSUCHE NICHT, Destiny 2 auf Linux zu spielen!',
      'Du WIRST gebannt werden!',
    ],
    protonDbUrl: 'https://www.protondb.com/app/1085660',
    category: 'fps',
    isPopular: true,
  },
  {
    id: 'fifa',
    name: 'EA FC 24/25',
    status: 'anticheat',
    antiCheat: 'EA Javelin Anticheat',
    antiCheatType: 'kernel-level',
    reason: 'EAs proprietäres Kernel-Level Anti-Cheat blockiert alle Linux-Systeme.',
    howToPlay: 'Nicht möglich auf Linux',
    workaround: 'Dual-Boot mit Windows oder ältere FIFA-Titel (vor EA FC) prüfen.',
    protonDbUrl: 'https://www.protondb.com/app/2195250',
    category: 'sports',
    isPopular: true,
  },
  {
    id: 'roblox',
    name: 'Roblox',
    status: 'anticheat',
    antiCheat: 'Hyperion',
    antiCheatType: 'non-kernel',
    reason: 'Hyperion (Anti-Tamper, nicht Kernel-Level) erkennt und blockiert aktiv Wine/Proton. Funktionierte bis Mai 2023.',
    howToPlay: 'Nicht möglich auf Linux',
    workaround: 'Dual-Boot mit Windows, Android-Version, oder "Sober" (Android-Port für Linux).',
    category: 'sandbox',
    isPopular: true,
  },
];

// Spiele die teilweise funktionieren
export const partialGames: Game[] = [
  {
    id: 'genshin',
    name: 'Genshin Impact',
    status: 'partial',
    antiCheat: 'Custom Anti-Cheat',
    antiCheatType: 'non-kernel',
    reason: 'Funktioniert seit 2024 mit Wine/Proton 10 und dem Hoyoplay Launcher. Inoffiziell aber viele Spieler berichten keine Bans.',
    howToPlay: 'Via Wine oder Proton 10 mit Hoyoplay Launcher spielbar (inoffiziell)',
    workaround: 'Proton 10 + Hoyoplay Launcher verwenden. Auf eigenes Risiko, da nicht offiziell unterstützt.',
    protonDbUrl: 'https://www.protondb.com/app/1449560',
    category: 'rpg',
    isPopular: true,
  },
  {
    id: 'gta5',
    name: 'GTA V / GTA Online',
    status: 'partial',
    antiCheat: 'BattlEye',
    antiCheatType: 'kernel-level',
    reason: 'Singleplayer funktioniert perfekt. GTA Online wurde im September 2024 durch BattlEye blockiert.',
    howToPlay: 'Singleplayer: Proton mit "-nobattleye" Startoption',
    workaround: 'Singleplayer: "-nobattleye" in Steam-Startoptionen. Proton Experimental verwenden. Online: Dual-Boot erforderlich.',
    warnings: [
      'GTA Online funktioniert NICHT auf Linux',
    ],
    protonDbUrl: 'https://www.protondb.com/app/271590',
    category: 'other',
    isPopular: true,
  },
  {
    id: 'rainbow6',
    name: 'Rainbow Six Siege',
    status: 'partial',
    antiCheat: 'BattlEye',
    antiCheatType: 'kernel-level',
    reason: 'Spiel startet und läuft gut. Online-Multiplayer ist blockiert, weil Ubisoft BattlEye Linux-Support nicht aktiviert hat.',
    howToPlay: 'Offline-Modi via Proton (Training, Situations, Custom Games)',
    workaround: 'Training Grounds, Situations, Shooting Range funktionieren. Für Online: Dual-Boot erforderlich.',
    warnings: [
      'Kein Online-Multiplayer möglich',
    ],
    protonDbUrl: 'https://www.protondb.com/app/359550',
    category: 'fps',
    isPopular: true,
  },
];

// Spiele die gut funktionieren
export const workingGames: Game[] = [
  {
    id: 'csgo',
    name: 'Counter-Strike 2',
    status: 'native',
    antiCheat: 'VAC',
    antiCheatType: 'non-kernel',
    reason: 'Natives Linux-Spiel von Valve. Volle Online-Unterstützung mit VAC.',
    howToPlay: 'Nativer Linux-Client (Standard)',
    warnings: [
      'Nutze den nativen Build, NICHT Proton auf VAC-Servern',
      'NVIDIA-Nutzer könnten mehr Probleme haben',
    ],
    protonDbUrl: 'https://www.protondb.com/app/730',
    category: 'fps',
    isPopular: true,
  },
  {
    id: 'dota2',
    name: 'Dota 2',
    status: 'native',
    antiCheat: 'VAC',
    antiCheatType: 'non-kernel',
    reason: 'Natives Linux-Spiel von Valve!',
    howToPlay: 'Nativer Linux-Client',
    protonDbUrl: 'https://www.protondb.com/app/570',
    category: 'moba',
    isPopular: true,
  },
  {
    id: 'tf2',
    name: 'Team Fortress 2',
    status: 'native',
    antiCheat: 'VAC',
    antiCheatType: 'non-kernel',
    reason: 'Natives Linux-Spiel von Valve!',
    howToPlay: 'Nativer Linux-Client',
    protonDbUrl: 'https://www.protondb.com/app/440',
    category: 'fps',
    isPopular: true,
  },
  {
    id: 'minecraft',
    name: 'Minecraft (Java Edition)',
    status: 'native',
    antiCheatType: 'none',
    reason: 'Vollständiger nativer Linux-Support. Java-Version läuft perfekt!',
    howToPlay: 'Nativer Java-Client',
    category: 'sandbox',
    isPopular: true,
  },
  {
    id: 'witcher3',
    name: 'The Witcher 3: Wild Hunt',
    status: 'proton-platinum',
    antiCheatType: 'none',
    reason: 'Platinum-Bewertung auf ProtonDB. Funktioniert sofort mit Proton.',
    howToPlay: 'Proton (funktioniert out-of-the-box)',
    workaround: '"--launcher-skip" für schnelleren Start hinzufügen.',
    protonDbUrl: 'https://www.protondb.com/app/292030',
    category: 'rpg',
    isPopular: true,
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk 2077',
    status: 'proton-gold',
    antiCheatType: 'none',
    reason: 'CD Projekt RED hat mit Valve für Day-One-Proton-Kompatibilität zusammengearbeitet.',
    howToPlay: 'Proton Experimental oder Proton 8.0-1+',
    workaround: '"--launcher-skip" für schnelleren Start. FSR2 Quality für Steam Deck empfohlen.',
    protonDbUrl: 'https://www.protondb.com/app/1091500',
    category: 'rpg',
    isPopular: true,
  },
  {
    id: 'eldenring',
    name: 'Elden Ring',
    status: 'proton-platinum',
    antiCheat: 'Easy Anti-Cheat',
    antiCheatType: 'non-kernel',
    reason: 'FromSoftware hat EAC Linux-Support aktiviert! Steam Deck Verified!',
    howToPlay: 'Proton (Steam Deck Verified)',
    protonDbUrl: 'https://www.protondb.com/app/1245620',
    category: 'rpg',
    isPopular: true,
  },
  {
    id: 'baldursgate3',
    name: "Baldur's Gate 3",
    status: 'proton-gold',
    antiCheatType: 'none',
    reason: 'Larian hat eine native Steam Deck-Version im September 2025 veröffentlicht.',
    howToPlay: 'Native (Steam Deck) oder Proton (Desktop)',
    workaround: 'Steam Deck: Native Version nutzen. Desktop Linux: Windows-Version via Proton.',
    protonDbUrl: 'https://www.protondb.com/app/1086940',
    category: 'rpg',
    isPopular: true,
  },
  {
    id: 'hogwarts',
    name: 'Hogwarts Legacy',
    status: 'proton-gold',
    antiCheatType: 'none',
    reason: 'Läuft gut mit Proton, kann aber absturzanfällig sein.',
    howToPlay: 'Proton (GE-Proton7-49 oder Steam Proton 9.0-2+)',
    workaround: 'FSR2 Quality mit max Schärfe aktivieren. Auf 30 FPS sperren für Stabilität (Steam Deck).',
    warnings: [
      'Zufällige Abstürze möglich',
      'Bei FPS-Problemen Upscaling deaktivieren',
    ],
    protonDbUrl: 'https://www.protondb.com/app/990080',
    category: 'rpg',
    isPopular: true,
  },
  {
    id: 'overwatch2',
    name: 'Overwatch 2',
    status: 'proton-gold',
    antiCheatType: 'non-kernel',
    reason: 'Funktioniert, weil es KEIN Kernel-Level Anti-Cheat verwendet.',
    howToPlay: 'Proton via Steam oder Battle.net',
    workaround: 'Steam-Version: Einfach Proton aktivieren. Battle.net: Als Non-Steam-Game hinzufügen, GE-Proton 7-39+ verwenden.',
    category: 'fps',
    isPopular: true,
  },
  {
    id: 'rdr2',
    name: 'Red Dead Redemption 2',
    status: 'proton-gold',
    antiCheatType: 'none',
    reason: 'Läuft sehr gut mit Proton!',
    howToPlay: 'Proton',
    protonDbUrl: 'https://www.protondb.com/app/1174180',
    category: 'rpg',
    isPopular: true,
  },
  {
    id: 'palworld',
    name: 'Palworld',
    status: 'proton-gold',
    antiCheatType: 'none',
    reason: 'Läuft gut mit Proton!',
    howToPlay: 'Proton',
    category: 'sandbox',
    isPopular: true,
  },
  {
    id: 'stardew',
    name: 'Stardew Valley',
    status: 'native',
    antiCheatType: 'none',
    reason: 'Native Linux-Version verfügbar!',
    howToPlay: 'Nativer Linux-Client',
    category: 'other',
    isPopular: true,
  },
  {
    id: 'terraria',
    name: 'Terraria',
    status: 'native',
    antiCheatType: 'none',
    reason: 'Native Linux-Version verfügbar!',
    howToPlay: 'Nativer Linux-Client',
    category: 'sandbox',
    isPopular: true,
  },
  {
    id: 'valheim',
    name: 'Valheim',
    status: 'native',
    antiCheatType: 'none',
    reason: 'Native Linux-Version verfügbar!',
    howToPlay: 'Nativer Linux-Client',
    category: 'sandbox',
    isPopular: true,
  },
];

// Alle Spiele kombiniert
export const allGames: Game[] = [
  ...workingGames,
  ...partialGames,
  ...problematicGames,
];

// Helper to check if a game is problematic
export function isGameProblematic(gameId: string): boolean {
  return problematicGames.some(g => g.id === gameId);
}

// Get all problematic games from a list of game IDs
export function getProblematicGamesFromSelection(gameIds: string[]): Game[] {
  return problematicGames.filter(g => gameIds.includes(g.id));
}

// Get game by ID
export function getGameById(id: string): Game | undefined {
  return allGames.find(g => g.id === id);
}

// Get games by status
export function getGamesByStatus(status: CompatibilityStatus): Game[] {
  return allGames.filter(g => g.status === status);
}

// Get games by category
export function getGamesByCategory(category: Game['category']): Game[] {
  return allGames.filter(g => g.category === category);
}

// Get popular games
export function getPopularGames(): Game[] {
  return allGames.filter(g => g.isPopular);
}

// Get games that work
export function getGamesThatWork(): Game[] {
  return allGames.filter(g =>
    g.status === 'native' ||
    g.status === 'proton-platinum' ||
    g.status === 'proton-gold' ||
    g.status === 'partial'
  );
}

// Get games that don't work
export function getGamesThatDontWork(): Game[] {
  return allGames.filter(g =>
    g.status === 'anticheat' ||
    g.status === 'broken'
  );
}

// Anti-Cheat Informationen
export const antiCheatInfo = {
  kernelLevel: {
    description: 'Kernel-Level Anti-Cheat erfordert direkten Zugriff auf den Windows-Kernel und funktioniert nicht mit Linux, Proton oder Wine.',
    examples: [
      'Vanguard (Riot Games - Valorant, LoL)',
      'RICOCHET (Activision - Call of Duty)',
      'Zakynthos + BattlEye (PUBG)',
      'EA Anti-Cheat (EA Sports)',
    ],
  },
  linuxCompatible: {
    description: 'Diese Anti-Cheat-Systeme können mit Linux funktionieren, wenn der Entwickler sie aktiviert.',
    examples: [
      'VAC (Valve - alle Valve-Spiele)',
      'Easy Anti-Cheat (wenn aktiviert - z.B. Elden Ring)',
      'BattlEye (wenn aktiviert - z.B. DayZ, ARK)',
    ],
  },
};
