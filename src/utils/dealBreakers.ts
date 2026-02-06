// Deal-breaker detection for Linux compatibility warnings

import { getProblematicGamesFromSelection } from '../data/games';
import type { UserAnswers } from './scoringAlgorithm';

export interface DealBreakerWarning {
  type: 'game' | 'software' | 'hardware' | 'general';
  severity: 'warning' | 'critical'; // warning = manageable, critical = might prevent switch
  title: string; // German
  message: string; // German
  suggestion: string; // German
  affectedItems: string[];
  links?: { text: string; url: string }[];
}

/**
 * Check for game compatibility issues
 */
export function checkGameCompatibility(selectedGames: string[]): DealBreakerWarning | null {
  if (!selectedGames || selectedGames.length === 0 || selectedGames.includes('none')) {
    return null;
  }

  const problematic = getProblematicGamesFromSelection(selectedGames);

  if (problematic.length === 0) {
    return null;
  }

  const gameNames = problematic.map(g => g.name);
  const hasAnticheat = problematic.some(g => g.status === 'anticheat');

  if (hasAnticheat) {
    return {
      type: 'game',
      severity: 'critical',
      title: 'Achtung: Einige Spiele funktionieren nicht unter Linux',
      message: `Die folgenden Spiele haben Anti-Cheat-Systeme, die unter Linux nicht funktionieren: ${gameNames.join(', ')}. Diese Spiele koennen aktuell NICHT unter Linux gespielt werden.`,
      suggestion: 'Du hast mehrere Optionen: 1) Dual-Boot mit Windows einrichten, 2) Cloud Gaming nutzen (GeForce NOW, Xbox Cloud), oder 3) auf diese Spiele verzichten.',
      affectedItems: gameNames,
      links: [
        { text: 'ProtonDB - Spielekompatibilitaet pruefen', url: 'https://www.protondb.com' },
        { text: 'Are We Anti-Cheat Yet?', url: 'https://areweanticheatyet.com' },
      ],
    };
  }

  return {
    type: 'game',
    severity: 'warning',
    title: 'Einige Spiele haben eingeschraenkte Kompatibilitaet',
    message: `Die folgenden Spiele koennten Probleme unter Linux haben: ${gameNames.join(', ')}.`,
    suggestion: 'Pruefe die Kompatibilitaet auf ProtonDB vor der Umstellung. Mit Workarounds sind diese Spiele oft spielbar.',
    affectedItems: gameNames,
    links: [
      { text: 'ProtonDB', url: 'https://www.protondb.com' },
    ],
  };
}

/**
 * Check for software compatibility issues
 */
export function checkSoftwareCompatibility(selectedSoftware: string[]): DealBreakerWarning | null {
  if (!selectedSoftware || selectedSoftware.length === 0 || selectedSoftware.includes('none')) {
    return null;
  }

  const criticalSoftware: { [key: string]: { name: string; alternative: string; severity: 'warning' | 'critical' } } = {
    'adobe': {
      name: 'Adobe Creative Suite',
      alternative: 'Alternativen: GIMP (Photoshop), Inkscape (Illustrator), Kdenlive/DaVinci Resolve (Premiere), Audacity (Audition). Adobe selbst laeuft nicht nativ.',
      severity: 'critical',
    },
    'ms-office': {
      name: 'Microsoft Office',
      alternative: 'Alternativen: LibreOffice (kostenlos), OnlyOffice, oder Microsoft 365 im Browser. Die Desktop-Version laeuft nicht nativ.',
      severity: 'warning',
    },
    'autodesk': {
      name: 'AutoCAD / Autodesk',
      alternative: 'Alternativen: FreeCAD, LibreCAD, Blender (fuer 3D). AutoCAD laeuft nicht unter Linux.',
      severity: 'critical',
    },
    'itunes': {
      name: 'iTunes',
      alternative: 'iTunes laeuft nicht unter Linux. Fuer iPhone-Sync nutze libimobiledevice. Musik-Management: Rhythmbox, Strawberry.',
      severity: 'warning',
    },
    'specific-windows': {
      name: 'Spezifische Windows-Software',
      alternative: 'Pruefe ob die Software unter Wine/Proton laeuft (WineHQ AppDB). Viele Programme funktionieren, manche nicht.',
      severity: 'warning',
    },
  };

  const affectedSoftware: string[] = [];
  const suggestions: string[] = [];
  let maxSeverity: 'warning' | 'critical' = 'warning';

  for (const software of selectedSoftware) {
    const info = criticalSoftware[software];
    if (info) {
      affectedSoftware.push(info.name);
      suggestions.push(info.alternative);
      if (info.severity === 'critical') {
        maxSeverity = 'critical';
      }
    }
  }

  if (affectedSoftware.length === 0) {
    return null;
  }

  return {
    type: 'software',
    severity: maxSeverity,
    title: maxSeverity === 'critical'
      ? 'Wichtig: Benoetigte Software nicht verfuegbar'
      : 'Hinweis: Software-Alternativen verfuegbar',
    message: `Folgende Software laeuft nicht nativ unter Linux: ${affectedSoftware.join(', ')}.`,
    suggestion: suggestions.join(' '),
    affectedItems: affectedSoftware,
    links: [
      { text: 'WineHQ AppDB - Kompatibilitaet pruefen', url: 'https://appdb.winehq.org' },
      { text: 'AlternativeTo - Software-Alternativen', url: 'https://alternativeto.net' },
    ],
  };
}

/**
 * Check for hardware compatibility issues
 */
export function checkHardwareCompatibility(answers: UserAnswers): DealBreakerWarning | null {
  const gpu = answers['gpu'] as string;
  const computerAge = answers['computer-age'] as string;
  const ram = answers['ram'] as string;

  const warnings: string[] = [];
  const suggestions: string[] = [];

  // NVIDIA considerations
  if (gpu === 'nvidia') {
    warnings.push('NVIDIA-Grafikkarte erkannt');
    suggestions.push('NVIDIA-Treiber erfordern manchmal manuelle Installation. Distributionen wie Pop!_OS, Linux Mint oder Nobara machen dies einfacher.');
  }

  // Intel Arc considerations
  if (gpu === 'intel-arc') {
    warnings.push('Intel Arc Grafikkarte erkannt');
    suggestions.push('Intel Arc erfordert einen relativ neuen Kernel (6.2+ fuer A-Serie, 6.11+ fuer B-Serie) und aktuelle Mesa-Treiber. Rolling-Release Distributionen wie Arch, Fedora, oder openSUSE Tumbleweed bieten die beste Unterstuetzung.');
  }

  // Very old hardware
  if (computerAge === 'vintage') {
    warnings.push('Sehr alter Computer (10+ Jahre)');
    suggestions.push('Waehle eine leichtgewichtige Distribution (MX Linux, antiX) mit XFCE oder LXQt. Vermeide ressourcenhungrige DEs wie GNOME oder KDE.');
  }

  // Very low RAM
  if (ram === '2gb') {
    warnings.push('Nur 2 GB RAM');
    suggestions.push('Mit 2 GB RAM solltest du unbedingt eine leichte Distribution und einen minimalen Desktop wie XFCE, LXQt oder einen Tiling WM waehlen.');
  }

  if (warnings.length === 0) {
    return null;
  }

  return {
    type: 'hardware',
    severity: 'warning',
    title: 'Hardware-Hinweise',
    message: warnings.join('. ') + '.',
    suggestion: suggestions.join(' '),
    affectedItems: warnings,
  };
}

/**
 * Check for competitive gaming warning
 */
export function checkCompetitiveGaming(answers: UserAnswers): DealBreakerWarning | null {
  const gamingType = answers['gaming-type'] as string[] | undefined;

  if (!gamingType || !gamingType.includes('competitive')) {
    return null;
  }

  return {
    type: 'general',
    severity: 'warning',
    title: 'Hinweis zu kompetitivem Gaming',
    message: 'Viele kompetitive Multiplayer-Spiele nutzen Anti-Cheat-Software, die unter Linux nicht funktioniert. Dies betrifft besonders Spiele wie Valorant, Fortnite, und einige Call of Duty Titel.',
    suggestion: 'Pruefe vor dem Wechsel auf areweanticheatyet.com ob deine Spiele unterstuetzt werden. Fuer nicht-kompatible Spiele kannst du Dual-Boot einrichten.',
    affectedItems: ['Kompetitive Multiplayer-Spiele'],
    links: [
      { text: 'Are We Anti-Cheat Yet?', url: 'https://areweanticheatyet.com' },
    ],
  };
}

/**
 * Check for Secure Boot compatibility issues
 */
export function checkSecureBootCompatibility(answers: UserAnswers): DealBreakerWarning | null {
  const secureBoot = answers['secure-boot'] as string | undefined;

  if (!secureBoot || secureBoot === 'not-needed' || secureBoot === 'unknown') {
    return null;
  }

  const severity: 'warning' | 'critical' = secureBoot === 'required' ? 'critical' : 'warning';

  return {
    type: 'hardware',
    severity,
    title: severity === 'critical'
      ? 'Wichtig: Secure Boot wird benoetigt'
      : 'Hinweis: Secure Boot bevorzugt',
    message: secureBoot === 'required'
      ? 'Du benoetigst Secure Boot Unterstuetzung (z.B. fuer Dual-Boot mit Windows 11). Einige Distributionen unterstuetzen Secure Boot nicht oder nur eingeschraenkt.'
      : 'Du wuerdest Secure Boot gerne aktiviert lassen. Nicht alle Distributionen unterstuetzen dies vollstaendig.',
    suggestion: 'Distributionen wie Ubuntu, Fedora, openSUSE und Linux Mint unterstuetzen Secure Boot out-of-the-box. Bei anderen muss Secure Boot moeglicherweise deaktiviert werden.',
    affectedItems: ['Secure Boot Kompatibilitaet'],
  };
}

/**
 * Main function: Check all deal-breakers
 */
export function checkDealBreakers(answers: UserAnswers): DealBreakerWarning[] {
  const warnings: DealBreakerWarning[] = [];

  // Check specific games
  const specificGames = answers['specific-games'] as string[] | undefined;
  const gameWarning = checkGameCompatibility(specificGames || []);
  if (gameWarning) {
    warnings.push(gameWarning);
  }

  // Check software requirements
  const softwareReqs = answers['software-requirements'] as string[] | undefined;
  const softwareWarning = checkSoftwareCompatibility(softwareReqs || []);
  if (softwareWarning) {
    warnings.push(softwareWarning);
  }

  // Check hardware
  const hardwareWarning = checkHardwareCompatibility(answers);
  if (hardwareWarning) {
    warnings.push(hardwareWarning);
  }

  // Check competitive gaming (if not already covered by specific games)
  if (!gameWarning) {
    const competitiveWarning = checkCompetitiveGaming(answers);
    if (competitiveWarning) {
      warnings.push(competitiveWarning);
    }
  }

  // Check secure boot
  const secureBootWarning = checkSecureBootCompatibility(answers);
  if (secureBootWarning) {
    warnings.push(secureBootWarning);
  }

  // Sort by severity (critical first)
  warnings.sort((a, b) => {
    if (a.severity === 'critical' && b.severity !== 'critical') return -1;
    if (b.severity === 'critical' && a.severity !== 'critical') return 1;
    return 0;
  });

  return warnings;
}

/**
 * Check if there are any critical deal-breakers
 */
export function hasCriticalDealBreakers(answers: UserAnswers): boolean {
  const warnings = checkDealBreakers(answers);
  return warnings.some(w => w.severity === 'critical');
}

/**
 * Get summary of deal-breakers for quick display
 */
export function getDealBreakerSummary(answers: UserAnswers): {
  hasCritical: boolean;
  count: number;
  criticalCount: number;
  mainIssue: string | null;
} {
  const warnings = checkDealBreakers(answers);
  const criticalWarnings = warnings.filter(w => w.severity === 'critical');

  return {
    hasCritical: criticalWarnings.length > 0,
    count: warnings.length,
    criticalCount: criticalWarnings.length,
    mainIssue: criticalWarnings.length > 0
      ? criticalWarnings[0].title
      : warnings.length > 0
        ? warnings[0].title
        : null,
  };
}
