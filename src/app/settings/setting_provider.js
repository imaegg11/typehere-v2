'use client';

import React, { createContext, useContext, useRef } from 'react';
import { globalSettings } from './settings';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
    const SettingsRef = useRef(globalSettings);

    return (
        <SettingsContext.Provider value={SettingsRef.current}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
