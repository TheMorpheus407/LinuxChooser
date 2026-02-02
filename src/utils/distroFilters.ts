import type { Distro } from '../data/distros';

/**
 * Filter distros by search term (searches name and description)
 */
export function searchDistros(distros: Distro[], searchTerm: string): Distro[] {
  if (!searchTerm.trim()) {
    return distros;
  }

  const normalizedTerm = searchTerm.toLowerCase().trim();

  return distros.filter((distro) => {
    const nameMatch = distro.name.toLowerCase().includes(normalizedTerm);
    const descriptionMatch = distro.description.toLowerCase().includes(normalizedTerm);
    return nameMatch || descriptionMatch;
  });
}

/**
 * Filter by difficulty level based on beginnerFriendly score
 * 'beginner' = score >= 7, 'intermediate' = 4-6, 'advanced' = <= 3
 */
export function filterByDifficulty(distros: Distro[], difficulties: string[]): Distro[] {
  if (!difficulties.length) {
    return distros;
  }

  return distros.filter((distro) => {
    const score = distro.beginnerFriendly;

    for (const difficulty of difficulties) {
      if (difficulty === 'beginner' && score >= 7) {
        return true;
      }
      if (difficulty === 'intermediate' && score >= 4 && score <= 6) {
        return true;
      }
      if (difficulty === 'advanced' && score <= 3) {
        return true;
      }
    }

    return false;
  });
}

/**
 * Filter by release model (fixed, rolling, semi-rolling, immutable)
 */
export function filterByReleaseModel(distros: Distro[], models: string[]): Distro[] {
  if (!models.length) {
    return distros;
  }

  return distros.filter((distro) => models.includes(distro.releaseModel));
}

/**
 * Filter by target audience (checks if any selected audience is in distro.targetAudience)
 */
export function filterByTargetAudience(distros: Distro[], audiences: string[]): Distro[] {
  if (!audiences.length) {
    return distros;
  }

  return distros.filter((distro) =>
    distro.targetAudience.some((audience) => audiences.includes(audience))
  );
}

/**
 * Sort option type for sortDistros function
 */
export type SortOption = 'name' | 'beginnerFriendly' | 'stability' | 'gamingSupport' | 'performance';

/**
 * Sort distros by various criteria
 * Uses German locale for name sorting
 */
export function sortDistros(
  distros: Distro[],
  sortBy: SortOption,
  ascending: boolean = true
): Distro[] {
  const sorted = [...distros].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name, 'de');
    }

    // For numeric properties
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    return aValue - bValue;
  });

  return ascending ? sorted : sorted.reverse();
}

/**
 * Filter options interface for combined filtering
 */
export interface FilterOptions {
  searchTerm: string;
  difficulty: string[];
  releaseModel: string[];
  targetAudience: string[];
  sortBy: SortOption;
  ascending?: boolean;
}

/**
 * Combined filter function that applies all filters
 */
export function applyFilters(distros: Distro[], options: FilterOptions): Distro[] {
  let result = distros;

  // Apply search filter
  if (options.searchTerm) {
    result = searchDistros(result, options.searchTerm);
  }

  // Apply difficulty filter
  if (options.difficulty.length > 0) {
    result = filterByDifficulty(result, options.difficulty);
  }

  // Apply release model filter
  if (options.releaseModel.length > 0) {
    result = filterByReleaseModel(result, options.releaseModel);
  }

  // Apply target audience filter
  if (options.targetAudience.length > 0) {
    result = filterByTargetAudience(result, options.targetAudience);
  }

  // Apply sorting (default ascending if not specified)
  result = sortDistros(result, options.sortBy, options.ascending ?? true);

  return result;
}

/**
 * Get unique release models from the distro data
 */
export function getAvailableReleaseModels(distros: Distro[]): string[] {
  const models = new Set<string>();

  for (const distro of distros) {
    models.add(distro.releaseModel);
  }

  return Array.from(models).sort((a, b) => a.localeCompare(b, 'de'));
}

/**
 * Get unique target audiences from the distro data
 */
export function getAvailableTargetAudiences(distros: Distro[]): string[] {
  const audiences = new Set<string>();

  for (const distro of distros) {
    for (const audience of distro.targetAudience) {
      audiences.add(audience);
    }
  }

  return Array.from(audiences).sort((a, b) => a.localeCompare(b, 'de'));
}
