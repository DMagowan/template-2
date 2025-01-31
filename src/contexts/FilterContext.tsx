'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface FilterState {
  timeframe: string;
  selectedCategories: string[];
  walletSizeFilter: string;
  searchQuery: string;
  page: number;
  itemsPerPage: number;
}

interface FilterContextType {
  filters: FilterState;
  setTimeframe: (timeframe: string) => void;
  setSelectedCategories: (categories: string[]) => void;
  setWalletSizeFilter: (size: string) => void;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  isLoading: boolean;
}

const defaultFilters: FilterState = {
  timeframe: '3M',
  selectedCategories: ['smart_money', 'whales', 'long_term'],
  walletSizeFilter: 'ALL',
  searchQuery: '',
  page: 1,
  itemsPerPage: 15
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [isLoading, setIsLoading] = useState(false);

  const setTimeframe = useCallback((timeframe: string) => {
    setIsLoading(true);
    setFilters(prev => ({ ...prev, timeframe }));
    // Simulate API call delay
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const setSelectedCategories = useCallback((categories: string[]) => {
    setIsLoading(true);
    setFilters(prev => ({ ...prev, selectedCategories: categories }));
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const setWalletSizeFilter = useCallback((size: string) => {
    setIsLoading(true);
    setFilters(prev => ({ ...prev, walletSizeFilter: size }));
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  }, []);

  const setPage = useCallback((page: number) => {
    setIsLoading(true);
    setFilters(prev => ({ ...prev, page }));
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const setItemsPerPage = useCallback((items: number) => {
    setIsLoading(true);
    setFilters(prev => ({ ...prev, itemsPerPage: items }));
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  return (
    <FilterContext.Provider
      value={{
        filters,
        setTimeframe,
        setSelectedCategories,
        setWalletSizeFilter,
        setSearchQuery,
        setPage,
        setItemsPerPage,
        isLoading
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
} 