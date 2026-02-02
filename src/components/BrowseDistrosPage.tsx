import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { distros } from '../data/distros';
import DistroCard from './DistroCard';
import DistroFilters from './DistroFilters';

type SortBy = 'name' | 'beginnerFriendly' | 'stability' | 'gamingSupport';
type ViewMode = 'grid' | 'list';

interface SelectedFilters {
  difficulty: string[];
  releaseModel: string[];
  targetAudience: string[];
}

export default function BrowseDistrosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    difficulty: [],
    releaseModel: [],
    targetAudience: [],
  });
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Filter and sort distros based on current state
  const filteredDistros = useMemo(() => {
    let result = [...distros];

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (distro) =>
          distro.name.toLowerCase().includes(term) ||
          distro.description.toLowerCase().includes(term)
      );
    }

    // Filter by difficulty (based on beginnerFriendly score)
    if (selectedFilters.difficulty.length > 0) {
      result = result.filter((distro) => {
        const difficulty =
          distro.beginnerFriendly >= 8
            ? 'beginner'
            : distro.beginnerFriendly >= 5
            ? 'intermediate'
            : 'advanced';
        return selectedFilters.difficulty.includes(difficulty);
      });
    }

    // Filter by release model
    if (selectedFilters.releaseModel.length > 0) {
      result = result.filter((distro) =>
        selectedFilters.releaseModel.includes(distro.releaseModel)
      );
    }

    // Filter by target audience
    if (selectedFilters.targetAudience.length > 0) {
      result = result.filter((distro) =>
        distro.targetAudience.some((audience) =>
          selectedFilters.targetAudience.includes(audience)
        )
      );
    }

    // Sort distros
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name, 'de');
        case 'beginnerFriendly':
          return b.beginnerFriendly - a.beginnerFriendly;
        case 'stability':
          return b.stability - a.stability;
        case 'gamingSupport':
          return b.gamingSupport - a.gamingSupport;
        default:
          return 0;
      }
    });

    return result;
  }, [searchTerm, selectedFilters, sortBy]);

  return (
    <div className="browse-page">
      <motion.div
        className="browse-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="browse-title">Alle Distributionen</h1>
        <p className="browse-subtitle">
          Entdecke alle {distros.length} Linux-Distributionen in unserer Datenbank.
          Filtere nach deinen Anforderungen und finde die perfekte Distribution.
        </p>
      </motion.div>

      <motion.div
        className="browse-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <DistroFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedFilters={selectedFilters}
          onFilterChange={(filterType, values) => {
            setSelectedFilters((prev) => ({
              ...prev,
              [filterType]: values,
            }));
          }}
          sortBy={sortBy}
          onSortChange={(sort) => setSortBy(sort as SortBy)}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalCount={distros.length}
          filteredCount={filteredDistros.length}
        />

        <div className={`distro-grid${viewMode === 'list' ? ' list-view' : ''}`}>
          {filteredDistros.map((distro, index) => (
            <motion.div
              key={distro.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
            >
              <DistroCard
                distro={distro}
                viewMode={viewMode}
              />
            </motion.div>
          ))}
        </div>

        {filteredDistros.length === 0 && (
          <motion.div
            className="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p>Keine Distributionen gefunden. Versuche andere Filterkriterien.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
