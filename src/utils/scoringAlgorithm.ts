// Scoring algorithm for Linux distro matching

import type { Distro } from '../data/distros';
import type { DesktopEnvironment } from '../data/desktopEnvironments';
import { distros } from '../data/distros';
import { desktopEnvironments, getDEById } from '../data/desktopEnvironments';

// User answers type
export interface UserAnswers {
  [questionId: string]: string | string[];
}

// User profile built from answers
export interface UserProfile {
  // Experience level (0-4: none, beginner, intermediate, advanced, expert)
  experienceLevel: number;

  // Primary needs (weighted 0-10)
  needsStability: number;
  needsCuttingEdge: number;
  needsGaming: number;
  needsPrivacy: number;
  needsCustomization: number;
  needsBeginnerFriendly: number;
  needsPerformance: number;
  needsProfessional: number;

  // Hardware constraints
  hasLimitedRAM: boolean;
  ramAmount: number | null; // in GB
  hasNvidia: boolean;
  hasIntelArc: boolean;
  hasIntelIGPU: boolean;
  hasOldHardware: boolean;

  // Desktop preferences
  prefersWindowsLike: boolean;
  prefersMacLike: boolean;
  prefersModern: boolean;
  prefersTiling: boolean;

  // Other
  needsGermanCommunity: boolean;
  wantsToLearn: boolean;
  hasProblematicGames: boolean;
  selectedGames: string[];
  needsProprietarySoftware: boolean;
  needsSecureBoot: boolean;
  prefersSecureBoot: boolean;
}

// Match result
export interface DistroMatch {
  distro: Distro;
  de: DesktopEnvironment;
  percentage: number;
  reasons: string[];
  warnings: string[];
}

// Score weights for different criteria
const WEIGHTS = {
  beginnerFriendly: 2.0,
  stability: 1.5,
  cuttingEdge: 1.5,
  gaming: 2.5,
  privacy: 2.0,
  customization: 1.0,
  performance: 1.5,
  professional: 1.0,
  hardwareSupport: 1.5,
  communitySupport: 1.0,
  desktopMatch: 2.0,
};

/**
 * Build a user profile from quiz answers
 */
export function buildUserProfile(answers: UserAnswers): UserProfile {
  const profile: UserProfile = {
    experienceLevel: 0,
    needsStability: 5,
    needsCuttingEdge: 5,
    needsGaming: 0,
    needsPrivacy: 3,
    needsCustomization: 5,
    needsBeginnerFriendly: 5,
    needsPerformance: 5,
    needsProfessional: 3,
    hasLimitedRAM: false,
    ramAmount: null,
    hasNvidia: false,
    hasIntelArc: false,
    hasIntelIGPU: false,
    hasOldHardware: false,
    prefersWindowsLike: false,
    prefersMacLike: false,
    prefersModern: false,
    prefersTiling: false,
    needsGermanCommunity: false,
    wantsToLearn: false,
    hasProblematicGames: false,
    selectedGames: [],
    needsProprietarySoftware: false,
    needsSecureBoot: false,
    prefersSecureBoot: false,
  };

  // Process experience level
  const experience = answers['experience'] as string;
  switch (experience) {
    case 'none':
      profile.experienceLevel = 0;
      profile.needsBeginnerFriendly = 10;
      break;
    case 'beginner':
      profile.experienceLevel = 1;
      profile.needsBeginnerFriendly = 8;
      break;
    case 'intermediate':
      profile.experienceLevel = 2;
      profile.needsBeginnerFriendly = 5;
      break;
    case 'advanced':
      profile.experienceLevel = 3;
      profile.needsBeginnerFriendly = 2;
      break;
    case 'expert':
      profile.experienceLevel = 4;
      profile.needsBeginnerFriendly = 0;
      break;
  }

  // Process primary use
  const primaryUse = answers['primary-use'] as string;
  switch (primaryUse) {
    case 'daily':
      profile.needsStability = 7;
      profile.needsBeginnerFriendly += 2;
      break;
    case 'gaming':
      profile.needsGaming = 10;
      profile.needsCuttingEdge = 7;
      break;
    case 'development':
      profile.needsProfessional = 8;
      profile.needsCuttingEdge = 6;
      profile.wantsToLearn = true;
      break;
    case 'creative':
      profile.needsProfessional = 7;
      profile.needsPerformance = 7;
      break;
    case 'server':
      profile.needsStability = 9;
      profile.needsBeginnerFriendly = Math.max(0, profile.needsBeginnerFriendly - 3);
      break;
    case 'learning':
      profile.wantsToLearn = true;
      profile.needsCuttingEdge = 6;
      break;
    case 'privacy':
      profile.needsPrivacy = 10;
      break;
  }

  // Process secondary uses
  const secondaryUses = answers['secondary-uses'] as string[] | undefined;
  if (secondaryUses) {
    if (secondaryUses.includes('gaming-casual')) {
      profile.needsGaming = Math.max(profile.needsGaming, 5);
    }
    if (secondaryUses.includes('coding')) {
      profile.needsProfessional = Math.max(profile.needsProfessional, 6);
    }
    if (secondaryUses.includes('video-editing') || secondaryUses.includes('graphics')) {
      profile.needsPerformance = Math.max(profile.needsPerformance, 7);
    }
    if (secondaryUses.includes('virtualization')) {
      profile.needsPerformance = Math.max(profile.needsPerformance, 8);
    }
  }

  // Process gaming type
  const gamingType = answers['gaming-type'] as string[] | undefined;
  if (gamingType) {
    if (gamingType.includes('competitive')) {
      profile.needsGaming = 10;
    }
    if (gamingType.includes('aaa')) {
      profile.needsGaming = Math.max(profile.needsGaming, 9);
      profile.needsPerformance = Math.max(profile.needsPerformance, 8);
    }
  }

  // Process specific games
  const specificGames = answers['specific-games'] as string[] | undefined;
  if (specificGames && !specificGames.includes('none')) {
    profile.selectedGames = specificGames;
    const problematicGameIds = ['valorant', 'fortnite', 'destiny2', 'pubg', 'rainbow6', 'cod', 'genshin'];
    profile.hasProblematicGames = specificGames.some(g => problematicGameIds.includes(g));
  }

  // Process hardware - computer age
  const computerAge = answers['computer-age'] as string;
  switch (computerAge) {
    case 'vintage':
      profile.hasOldHardware = true;
      profile.hasLimitedRAM = true;
      profile.needsPerformance = 9;
      break;
    case 'older':
      profile.hasOldHardware = true;
      profile.needsPerformance = 7;
      break;
    case 'recent':
      profile.needsPerformance = 5;
      break;
    case 'new':
      profile.needsPerformance = 3;
      profile.needsCuttingEdge = Math.max(profile.needsCuttingEdge, 6);
      break;
  }

  // Process RAM
  const ram = answers['ram'] as string;
  switch (ram) {
    case '2gb':
      profile.hasLimitedRAM = true;
      profile.ramAmount = 2;
      profile.needsPerformance = 10;
      break;
    case '4gb':
      profile.hasLimitedRAM = true;
      profile.ramAmount = 4;
      profile.needsPerformance = Math.max(profile.needsPerformance, 8);
      break;
    case '8gb':
      profile.ramAmount = 8;
      break;
    case '16gb':
      profile.ramAmount = 16;
      break;
    case '32gb':
      profile.ramAmount = 32;
      break;
  }

  // Process GPU
  const gpu = answers['gpu'] as string;
  if (gpu === 'nvidia') {
    profile.hasNvidia = true;
  } else if (gpu === 'intel-arc') {
    profile.hasIntelArc = true;
  } else if (gpu === 'intel-igpu') {
    profile.hasIntelIGPU = true;
  }

  // Process desktop style
  const desktopStyle = answers['desktop-style'] as string;
  switch (desktopStyle) {
    case 'windows':
      profile.prefersWindowsLike = true;
      break;
    case 'macos':
      profile.prefersMacLike = true;
      break;
    case 'modern':
      profile.prefersModern = true;
      break;
    case 'tiling':
      profile.prefersTiling = true;
      break;
  }

  // Process customization
  const customization = answers['customization'] as string;
  switch (customization) {
    case 'minimal':
      profile.needsCustomization = 2;
      break;
    case 'some':
      profile.needsCustomization = 4;
      break;
    case 'moderate':
      profile.needsCustomization = 7;
      break;
    case 'full':
      profile.needsCustomization = 10;
      break;
  }

  // Process stability preference
  const stability = answers['stability'] as string;
  switch (stability) {
    case 'stable':
      profile.needsStability = 10;
      profile.needsCuttingEdge = 2;
      break;
    case 'balanced':
      profile.needsStability = 6;
      profile.needsCuttingEdge = 6;
      break;
    case 'cutting-edge':
      profile.needsStability = 4;
      profile.needsCuttingEdge = 8;
      break;
    case 'bleeding-edge':
      profile.needsStability = 2;
      profile.needsCuttingEdge = 10;
      break;
  }

  // Process software requirements
  const softwareReqs = answers['software-requirements'] as string[] | undefined;
  if (softwareReqs && !softwareReqs.includes('none')) {
    profile.needsProprietarySoftware = softwareReqs.some(s =>
      ['ms-office', 'adobe', 'autodesk', 'itunes', 'specific-windows'].includes(s)
    );
  }

  // Process learning willingness
  const learning = answers['learning'] as string;
  switch (learning) {
    case 'none':
      profile.wantsToLearn = false;
      profile.needsBeginnerFriendly = Math.min(10, profile.needsBeginnerFriendly + 2);
      break;
    case 'minimal':
      profile.wantsToLearn = false;
      break;
    case 'moderate':
      profile.wantsToLearn = true;
      break;
    case 'deep':
      profile.wantsToLearn = true;
      profile.needsBeginnerFriendly = Math.max(0, profile.needsBeginnerFriendly - 3);
      break;
  }

  // Process language preference
  const language = answers['language'] as string;
  if (language === 'important') {
    profile.needsGermanCommunity = true;
  }

  // Process privacy level
  const privacyLevel = answers['privacy-level'] as string;
  switch (privacyLevel) {
    case 'casual':
      profile.needsPrivacy = 3;
      break;
    case 'important':
      profile.needsPrivacy = 6;
      break;
    case 'critical':
      profile.needsPrivacy = 8;
      break;
    case 'paranoid':
      profile.needsPrivacy = 10;
      break;
  }

  // Process secure boot requirement
  const secureBoot = answers['secure-boot'] as string;
  switch (secureBoot) {
    case 'required':
      profile.needsSecureBoot = true;
      profile.prefersSecureBoot = true;
      break;
    case 'preferred':
      profile.prefersSecureBoot = true;
      break;
  }

  return profile;
}

/**
 * Calculate how well a distro matches the user profile
 */
export function calculateDistroMatch(profile: UserProfile, distro: Distro): number {
  let score = 0;
  let maxScore = 0;

  // Beginner-friendliness match
  const beginnerDiff = Math.abs(distro.beginnerFriendly - profile.needsBeginnerFriendly);
  const beginnerScore = (10 - beginnerDiff) * WEIGHTS.beginnerFriendly;
  score += beginnerScore;
  maxScore += 10 * WEIGHTS.beginnerFriendly;

  // Stability match
  if (profile.needsStability > 5) {
    const stabilityScore = distro.stability * (profile.needsStability / 10) * WEIGHTS.stability;
    score += stabilityScore;
    maxScore += 10 * WEIGHTS.stability;
  }

  // Cutting edge match
  if (profile.needsCuttingEdge > 5) {
    const cuttingEdgeScore = distro.cuttingEdge * (profile.needsCuttingEdge / 10) * WEIGHTS.cuttingEdge;
    score += cuttingEdgeScore;
    maxScore += 10 * WEIGHTS.cuttingEdge;
  }

  // Gaming support
  if (profile.needsGaming > 0) {
    const gamingScore = distro.gamingSupport * (profile.needsGaming / 10) * WEIGHTS.gaming;
    score += gamingScore;
    maxScore += 10 * WEIGHTS.gaming;
  }

  // Privacy
  if (profile.needsPrivacy > 5) {
    const privacyScore = distro.privacyFocus * (profile.needsPrivacy / 10) * WEIGHTS.privacy;
    score += privacyScore;
    maxScore += 10 * WEIGHTS.privacy;
  }

  // Customization
  if (profile.needsCustomization > 5) {
    const customScore = distro.customizability * (profile.needsCustomization / 10) * WEIGHTS.customization;
    score += customScore;
    maxScore += 10 * WEIGHTS.customization;
  }

  // Performance (for old hardware)
  if (profile.hasOldHardware || profile.hasLimitedRAM) {
    const perfScore = distro.performance * (profile.needsPerformance / 10) * WEIGHTS.performance;
    score += perfScore;
    maxScore += 10 * WEIGHTS.performance;
  }

  // RAM requirement check - applies to ALL users who specified RAM, not just limited RAM users
  // This prevents distros like Qubes (16GB min) from being recommended to users with 2GB
  if (profile.ramAmount && distro.minRAM > profile.ramAmount) {
    const ramRatio = distro.minRAM / profile.ramAmount;

    if (ramRatio >= 4) {
      // Distro needs 4x+ user's RAM: effectively disqualify
      // e.g., Qubes (16GB) for 2GB user, or 8GB distro for 2GB user
      score = -1000;
    } else if (ramRatio >= 2) {
      // Distro needs 2x-4x user's RAM: severe penalty
      // e.g., 4GB distro for 2GB user
      score -= 50;
    } else {
      // Distro needs more than user has but less than 2x: moderate penalty
      // e.g., 3GB distro for 2GB user
      score -= 30;
    }
  }

  // Professional use
  if (profile.needsProfessional > 5) {
    const profScore = distro.professionalUse * (profile.needsProfessional / 10) * WEIGHTS.professional;
    score += profScore;
    maxScore += 10 * WEIGHTS.professional;
  }

  // Hardware support (especially for NVIDIA)
  if (profile.hasNvidia) {
    const hwScore = distro.hardwareSupport * WEIGHTS.hardwareSupport;
    score += hwScore;
    maxScore += 10 * WEIGHTS.hardwareSupport;

    // Bonus for distros known for good NVIDIA support
    if (['pop-os', 'nobara', 'manjaro', 'linux-mint', 'cachyos'].includes(distro.id)) {
      score += 5;
    }
  }

  // Intel Arc support (requires recent kernels and Mesa)
  if (profile.hasIntelArc) {
    const hwScore = distro.hardwareSupport * WEIGHTS.hardwareSupport;
    score += hwScore;
    maxScore += 10 * WEIGHTS.hardwareSupport;

    // Bonus for distros with rolling releases or recent kernels (Intel Arc needs kernel 6.2+ and recent Mesa)
    if (['arch', 'fedora', 'nobara', 'cachyos', 'endeavouros', 'manjaro', 'opensuse-tumbleweed'].includes(distro.id)) {
      score += 8;
    }
  }

  // German community support
  if (profile.needsGermanCommunity) {
    const communityScore = distro.communitySupport * WEIGHTS.communitySupport;
    score += communityScore;
    maxScore += 10 * WEIGHTS.communitySupport;

    // Bonus for distros with strong German communities
    if (['opensuse-tumbleweed', 'opensuse-leap', 'ubuntu', 'linux-mint'].includes(distro.id)) {
      score += 3;
    }
  }

  // Secure Boot support
  if (profile.needsSecureBoot || profile.prefersSecureBoot) {
    const sbSupport = distro.secureBootSupport;
    if (profile.needsSecureBoot) {
      if (sbSupport === 'none') {
        score -= 40; // Heavy penalty - user requires Secure Boot
      } else if (sbSupport === 'partial') {
        score -= 10; // Mild penalty - requires manual work
      } else if (sbSupport === 'full') {
        score += 5; // Bonus for full support
      }
    } else if (profile.prefersSecureBoot) {
      if (sbSupport === 'none') {
        score -= 15; // Moderate penalty
      } else if (sbSupport === 'full') {
        score += 3; // Small bonus
      }
    }
  }

  // Experience level matching
  if (profile.experienceLevel < 2) {
    // Beginners should avoid complex distros
    if (distro.beginnerFriendly < 5) {
      score -= (5 - distro.beginnerFriendly) * 3;
    }
  } else if (profile.experienceLevel >= 3 && profile.wantsToLearn) {
    // Advanced users who want to learn might prefer more complex distros
    if (['arch', 'gentoo', 'void', 'nixos'].includes(distro.id)) {
      score += 5;
    }
  }

  // Target audience bonus
  if (profile.needsGaming > 7 && distro.targetAudience.includes('gamer')) {
    score += 10;
  }
  if (profile.needsPrivacy > 7 && distro.targetAudience.includes('privacy')) {
    score += 10;
  }
  if (profile.needsProfessional > 7 && distro.targetAudience.includes('developer')) {
    score += 5;
  }
  if (profile.experienceLevel < 2 && distro.targetAudience.includes('beginner')) {
    score += 8;
  }

  // Normalize to percentage
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  return Math.max(0, Math.min(100, percentage));
}

/**
 * Find the best desktop environment for user preferences and distro
 */
export function findBestDE(profile: UserProfile, distro: Distro): DesktopEnvironment {
  const availableDEs = distro.availableDEs
    .map(id => getDEById(id))
    .filter((de): de is DesktopEnvironment => de !== undefined);

  if (availableDEs.length === 0) {
    // Fallback to default
    return getDEById(distro.defaultDE) || desktopEnvironments[0];
  }

  let bestDE = availableDEs[0];
  let bestScore = -Infinity;

  for (const de of availableDEs) {
    let score = 0;

    // Desktop style preferences
    if (profile.prefersWindowsLike) {
      score += de.windowsLike * 2;
    }
    if (profile.prefersMacLike) {
      score += de.macLike * 2;
    }
    if (profile.prefersModern) {
      score += de.modernLook * 2;
    }
    if (profile.prefersTiling && de.tilingSupport) {
      score += 20;
    }

    // Resource constraints
    if (profile.hasLimitedRAM || profile.hasOldHardware) {
      score += (10 - de.resourceUsage) * 3;

      // Check RAM requirement (idleRAM is in MB, convert to GB using 1024)
      if (profile.ramAmount) {
        const requiredGB = de.idleRAM / 1024;
        if (requiredGB > profile.ramAmount * 0.5) {
          score -= 10; // Penalize heavy DEs
        }
      }
    }

    // Gaming preference
    if (profile.needsGaming > 5) {
      score += de.gamingFriendly;
    }

    // Beginner-friendliness
    if (profile.needsBeginnerFriendly > 6) {
      score += de.beginnerFriendly * 1.5;
    }

    // Customization
    if (profile.needsCustomization > 7) {
      score += de.customizability;
    }

    // Experience level - avoid tiling WMs for beginners
    if (profile.experienceLevel < 2 && de.tilingSupport && de.beginnerFriendly < 4) {
      score -= 15;
    }

    if (score > bestScore) {
      bestScore = score;
      bestDE = de;
    }
  }

  return bestDE;
}

/**
 * Generate German explanation texts for why this distro matches
 */
export function generateMatchReasons(
  profile: UserProfile,
  distro: Distro,
  de: DesktopEnvironment
): string[] {
  const reasons: string[] = [];

  // Beginner-friendliness
  if (profile.needsBeginnerFriendly > 6 && distro.beginnerFriendly >= 8) {
    reasons.push(`${distro.name} ist besonders einsteigerfreundlich und leicht zu bedienen.`);
  }

  // Stability
  if (profile.needsStability > 7 && distro.stability >= 8) {
    reasons.push(`Du legst Wert auf Stabilitaet - ${distro.name} ist bekannt fuer seine Zuverlaessigkeit.`);
  }

  // Cutting edge
  if (profile.needsCuttingEdge > 7 && distro.cuttingEdge >= 8) {
    reasons.push(`${distro.name} bietet dir immer die aktuellste Software.`);
  }

  // Gaming
  if (profile.needsGaming > 5 && distro.gamingSupport >= 8) {
    reasons.push(`Perfekt fuers Gaming - ${distro.name} hat exzellente Spieleunterstuetzung.`);
  }

  // Privacy
  if (profile.needsPrivacy > 7 && distro.privacyFocus >= 8) {
    reasons.push(`${distro.name} legt besonderen Wert auf deine Privatsphaere.`);
  }

  // Old hardware
  if ((profile.hasOldHardware || profile.hasLimitedRAM) && distro.performance >= 8) {
    reasons.push(`${distro.name} ist ressourcenschonend und laeuft auch auf aelterer Hardware gut.`);
  }

  // NVIDIA
  if (profile.hasNvidia && ['pop-os', 'nobara', 'manjaro', 'linux-mint', 'cachyos'].includes(distro.id)) {
    reasons.push(`Gute NVIDIA-Unterstuetzung out-of-the-box.`);
  }

  // Intel Arc
  if (profile.hasIntelArc && ['arch', 'fedora', 'nobara', 'cachyos', 'endeavouros', 'manjaro', 'opensuse-tumbleweed'].includes(distro.id)) {
    reasons.push(`Ausgezeichnete Intel Arc-Unterstuetzung durch aktuelle Kernel und Mesa-Treiber.`);
  }

  // Desktop environment
  if (profile.prefersWindowsLike && de.windowsLike >= 7) {
    reasons.push(`${de.name} bietet ein Windows-aehnliches Layout - ideal fuer Umsteiger.`);
  }
  if (profile.prefersMacLike && de.macLike >= 7) {
    reasons.push(`${de.name} hat ein elegantes, macOS-aehnliches Design.`);
  }
  if (profile.prefersTiling && de.tilingSupport) {
    reasons.push(`${de.name} unterstuetzt Tiling fuer maximale Produktivitaet.`);
  }

  // Customization
  if (profile.needsCustomization > 7 && distro.customizability >= 8) {
    reasons.push(`${distro.name} laesst sich nach deinen Wuenschen anpassen.`);
  }

  // German community
  if (profile.needsGermanCommunity && distro.communitySupport >= 8) {
    reasons.push(`Grosse deutschsprachige Community fuer Support und Hilfe.`);
  }

  // Learning
  if (profile.wantsToLearn && profile.experienceLevel >= 3) {
    if (['arch', 'gentoo', 'void', 'nixos'].includes(distro.id)) {
      reasons.push(`Ideal zum tiefen Lernen - du verstehst wie alles funktioniert.`);
    }
  }

  // AUR access for cutting edge users
  if (profile.needsCuttingEdge > 6 && distro.hasAUR) {
    reasons.push(`Zugang zum AUR mit tausenden zusaetzlichen Paketen.`);
  }

  // Flatpak for proprietary software
  if (profile.needsProprietarySoftware && distro.hasFlatpak) {
    reasons.push(`Flatpak-Unterstuetzung fuer zusaetzliche Software.`);
  }

  // Secure Boot
  if ((profile.needsSecureBoot || profile.prefersSecureBoot) && distro.secureBootSupport === 'full') {
    reasons.push(`${distro.name} unterstuetzt Secure Boot vollstaendig - ideal fuer Dual-Boot mit Windows 11.`);
  }

  // Ensure we have at least one reason
  if (reasons.length === 0) {
    reasons.push(`${distro.name} mit ${de.name} ist eine solide Wahl fuer deine Anforderungen.`);
  }

  return reasons.slice(0, 4); // Max 4 reasons
}

/**
 * Generate German warning texts
 */
export function generateWarnings(
  profile: UserProfile,
  distro: Distro,
  de: DesktopEnvironment
): string[] {
  const warnings: string[] = [];

  // Experience level mismatch
  if (profile.experienceLevel < 2 && distro.beginnerFriendly < 5) {
    warnings.push(`${distro.name} erfordert mehr Linux-Erfahrung. Als Einsteiger koenntest du auf Herausforderungen stossen.`);
  }

  // RAM concerns
  if (profile.ramAmount && profile.ramAmount <= 4 && de.idleRAM > 500) {
    warnings.push(`${de.name} benoetigt relativ viel RAM. Mit ${profile.ramAmount} GB koennte es eng werden.`);
  }

  // NVIDIA on some distros
  if (profile.hasNvidia && ['debian', 'fedora'].includes(distro.id)) {
    warnings.push(`NVIDIA-Treiber-Installation kann bei ${distro.name} zusaetzliche Schritte erfordern.`);
  }

  // Intel Arc warnings for distros with older kernels
  if (profile.hasIntelArc && ['debian', 'linux-mint', 'ubuntu'].includes(distro.id)) {
    warnings.push(`Intel Arc erfordert aktuelle Kernel (6.2+) und Mesa-Treiber. Bei ${distro.name} sind moeglicherweise zusaetzliche Schritte noetig.`);
  }

  // Rolling release for stability seekers
  if (profile.needsStability > 7 && distro.releaseModel === 'rolling') {
    warnings.push(`${distro.name} ist eine Rolling-Release-Distribution. Updates koennen gelegentlich Probleme verursachen.`);
  }

  // Old hardware with heavy distro
  if (profile.hasOldHardware && distro.minRAM > 2) {
    warnings.push(`${distro.name} koennte auf aelterer Hardware langsam sein.`);
  }

  // Tiling WM for beginners
  if (profile.experienceLevel < 2 && de.tilingSupport && de.beginnerFriendly < 5) {
    warnings.push(`${de.name} ist ein Tiling Window Manager und erfordert Einarbeitung.`);
  }

  // Privacy distros limitations
  if (['tails', 'qubes'].includes(distro.id)) {
    if (profile.needsGaming > 3) {
      warnings.push(`${distro.name} ist nicht fuer Gaming geeignet.`);
    }
    warnings.push(`${distro.name} hat Einschraenkungen fuer den taeglichen Gebrauch.`);
  }

  // Secure Boot warnings
  if (profile.needsSecureBoot || profile.prefersSecureBoot) {
    const sbSupport = distro.secureBootSupport;
    if (sbSupport === 'none') {
      warnings.push(`${distro.name} unterstuetzt kein Secure Boot. Du musst Secure Boot im BIOS deaktivieren.`);
    } else if (sbSupport === 'partial') {
      warnings.push(`Secure Boot bei ${distro.name} erfordert manuelle Konfiguration (MOK-Schluessel registrieren).`);
    }
  }

  return warnings.slice(0, 3); // Max 3 warnings
}

/**
 * Main function: Calculate all matches and return sorted results
 */
export function calculateMatches(answers: UserAnswers): DistroMatch[] {
  const profile = buildUserProfile(answers);
  const results: DistroMatch[] = [];

  // Filter distros based on hard requirements
  let eligibleDistros = [...distros];

  // Filter out privacy-focused distros for casual users
  if (profile.needsPrivacy < 8) {
    eligibleDistros = eligibleDistros.filter(d => !['tails', 'qubes'].includes(d.id));
  }

  // Filter out complex distros for beginners who don't want to learn
  if (profile.experienceLevel < 2 && !profile.wantsToLearn) {
    eligibleDistros = eligibleDistros.filter(d => d.beginnerFriendly >= 5);
  }

  // Calculate matches for each eligible distro
  for (const distro of eligibleDistros) {
    const percentage = calculateDistroMatch(profile, distro);
    const de = findBestDE(profile, distro);
    const reasons = generateMatchReasons(profile, distro, de);
    const warnings = generateWarnings(profile, distro, de);

    results.push({
      distro,
      de,
      percentage,
      reasons,
      warnings,
    });
  }

  // Sort by percentage descending
  results.sort((a, b) => b.percentage - a.percentage);

  return results;
}

/**
 * Get top N results
 */
export function getTopMatches(answers: UserAnswers, count: number = 5): DistroMatch[] {
  return calculateMatches(answers).slice(0, count);
}

/**
 * Quick preview calculation for live results
 */
export function calculateQuickPreview(answers: UserAnswers): DistroMatch[] {
  // Only calculate if we have minimum required answers
  const requiredQuestions = ['experience', 'primary-use'];
  const hasRequired = requiredQuestions.every(q => answers[q] !== undefined);

  if (!hasRequired) {
    return [];
  }

  return getTopMatches(answers, 3);
}
