import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DistroFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedFilters: {
    difficulty: string[];
    releaseModel: string[];
    targetAudience: string[];
  };
  onFilterChange: (filterType: string, values: string[]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  totalCount: number;
  filteredCount: number;
}

const DIFFICULTY_OPTIONS = [
  { value: 'beginner', label: 'Anfänger' },
  { value: 'intermediate', label: 'Fortgeschritten' },
  { value: 'advanced', label: 'Experte' },
];

const RELEASE_MODEL_OPTIONS = [
  { value: 'fixed', label: 'Fixed' },
  { value: 'rolling', label: 'Rolling' },
  { value: 'semi-rolling', label: 'Semi-Rolling' },
  { value: 'immutable', label: 'Immutable' },
];

const TARGET_AUDIENCE_OPTIONS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'developer', label: 'Developer' },
  { value: 'gamer', label: 'Gamer' },
  { value: 'server', label: 'Server' },
  { value: 'privacy', label: 'Privacy' },
];

const SORT_OPTIONS = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'beginnerFriendly', label: 'Einsteigerfreundlich' },
  { value: 'stability', label: 'Stabilität' },
  { value: 'gamingSupport', label: 'Gaming' },
];

export default function DistroFilters({
  searchTerm,
  onSearchChange,
  selectedFilters,
  onFilterChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalCount,
  filteredCount,
}: DistroFiltersProps) {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const handleCheckboxChange = (
    filterType: 'difficulty' | 'releaseModel' | 'targetAudience',
    value: string
  ) => {
    const currentValues = selectedFilters[filterType];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onFilterChange(filterType, newValues);
  };

  const hasActiveFilters =
    selectedFilters.difficulty.length > 0 ||
    selectedFilters.releaseModel.length > 0 ||
    selectedFilters.targetAudience.length > 0 ||
    searchTerm.length > 0;

  const clearAllFilters = () => {
    onSearchChange('');
    onFilterChange('difficulty', []);
    onFilterChange('releaseModel', []);
    onFilterChange('targetAudience', []);
  };

  const renderCheckboxGroup = (
    filterType: 'difficulty' | 'releaseModel' | 'targetAudience',
    options: { value: string; label: string }[],
    title: string
  ) => (
    <div className="filters-group">
      <h4 className="filters-group-title">{title}</h4>
      {options.map((option) => (
        <label key={option.value} className="filter-label">
          <input
            type="checkbox"
            className="filter-checkbox"
            checked={selectedFilters[filterType].includes(option.value)}
            onChange={() => handleCheckboxChange(filterType, option.value)}
          />
          <span className="filter-checkbox-custom" aria-hidden="true">
            {selectedFilters[filterType].includes(option.value) && (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            )}
          </span>
          <span className="filter-label-text">{option.label}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className="distro-filters">
      {/* Search Input */}
      <div className="filters-search">
        <svg
          className="search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Distribution suchen..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Distribution suchen"
        />
        {searchTerm && (
          <button
            className="search-clear"
            onClick={() => onSearchChange('')}
            aria-label="Suche leeren"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        )}
      </div>

      {/* Results Count and Controls Row */}
      <div className="filters-controls-row">
        <span className="filters-count">
          {filteredCount} von {totalCount} Distributionen
        </span>

        <div className="filters-controls-right">
          {/* Sort Dropdown */}
          <div className="filters-sort">
            <label htmlFor="sort-select" className="sr-only">
              Sortieren nach
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label="Sortieren nach"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <svg
              className="sort-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div>

          {/* View Mode Toggle */}
          <div className="filters-view-toggle" role="group" aria-label="Ansicht wechseln">
            <button
              className={`view-toggle-button ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => onViewModeChange('grid')}
              aria-pressed={viewMode === 'grid'}
              aria-label="Rasteransicht"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z" />
              </svg>
            </button>
            <button
              className={`view-toggle-button ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => onViewModeChange('list')}
              aria-pressed={viewMode === 'list'}
              aria-label="Listenansicht"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
              </svg>
            </button>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            className="filters-mobile-toggle mobile-only"
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            aria-expanded={isFilterPanelOpen}
            aria-controls="filter-panel"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
            </svg>
            <span>Filter</span>
            {hasActiveFilters && <span className="filter-badge" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <motion.button
          className="filters-clear"
          onClick={clearAllFilters}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
          Alle Filter zurücksetzen
        </motion.button>
      )}

      {/* Desktop Filter Sections */}
      <div className="filters-section desktop-only">
        {renderCheckboxGroup('difficulty', DIFFICULTY_OPTIONS, 'Schwierigkeit')}
        {renderCheckboxGroup('releaseModel', RELEASE_MODEL_OPTIONS, 'Release-Modell')}
        {renderCheckboxGroup('targetAudience', TARGET_AUDIENCE_OPTIONS, 'Zielgruppe')}
      </div>

      {/* Mobile Filter Panel */}
      <AnimatePresence>
        {isFilterPanelOpen && (
          <motion.div
            id="filter-panel"
            className="filters-section mobile-only"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="filters-section-content">
              {renderCheckboxGroup('difficulty', DIFFICULTY_OPTIONS, 'Schwierigkeit')}
              {renderCheckboxGroup('releaseModel', RELEASE_MODEL_OPTIONS, 'Release-Modell')}
              {renderCheckboxGroup('targetAudience', TARGET_AUDIENCE_OPTIONS, 'Zielgruppe')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
