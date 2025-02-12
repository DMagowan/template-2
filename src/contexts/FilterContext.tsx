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
  itemsPerPage: 10
};

const FilterContext = createContext<FilterContextType | null>(null);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [isLoading, setIsLoading] = useState(false);

  const setTimeframe = useCallback((timeframe: string) => {
    setFilters(prev => ({ ...prev, timeframe }));
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const setSelectedCategories = useCallback((categories: string[]) => {
    setFilters(prev => ({ ...prev, selectedCategories: categories }));
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const setWalletSizeFilter = useCallback((size: string) => {
    setFilters(prev => ({ ...prev, walletSizeFilter: size }));
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  }, []);

  const setPage = useCallback((page: number) => {
    setFilters(prev => ({ ...prev, page }));
  }, []);

  const setItemsPerPage = useCallback((items: number) => {
    setFilters(prev => ({ ...prev, itemsPerPage: items }));
  }, []);

  const value = {
    filters,
    setTimeframe,
    setSelectedCategories,
    setWalletSizeFilter,
    setSearchQuery,
    setPage,
    setItemsPerPage,
    isLoading
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
} 