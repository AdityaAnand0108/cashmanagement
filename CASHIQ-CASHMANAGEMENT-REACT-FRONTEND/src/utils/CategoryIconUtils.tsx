import React from 'react';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import MovieIcon from '@mui/icons-material/Movie';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import HomeIcon from '@mui/icons-material/Home';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CategoryType } from '../models/CategoryType';

/**
 * Returns an icon element based on the category.
 * @param category The category to get the icon for.
 * @returns The icon element for the category.
 */
export const getCategoryIcon = (category: string | undefined): React.ReactNode => {
    switch (category) {
        case CategoryType.FOOD:
            return <FastfoodIcon />;
        case CategoryType.TRANSPORT:
            return <LocalGasStationIcon />;
        case CategoryType.ENTERTAINMENT:
            return <MovieIcon />;
        case CategoryType.UTILITIES:
            return <LightbulbIcon />;
        case CategoryType.SHOPPING:
            return <CheckroomIcon />;
        case CategoryType.RENT: // Housing/Rent
            return <HomeIcon />;
        case CategoryType.HEALTH:
            return <LocalHospitalIcon />;
        case CategoryType.EDUCATION:
            return <SchoolIcon />;
        case CategoryType.INCOME:
            return <AttachMoneyIcon />;
        case CategoryType.TRANSFER:
            return <SwapHorizIcon />;
        // Fallbacks for potential mismatched strings
        case 'Housing':
            return <HomeIcon />;
        case 'Groceries':
            return <ShoppingCartIcon />;
        default:
            return <SwapHorizIcon />;
    }
};

/**
 * Returns the color scheme for a given category.
 * @param category The category to get the color for.
 * @returns An object containing the background color (bg) and text color (text).
 */
export const getCategoryColor = (category: string | undefined): { bg: string, text: string } => {
    switch (category) {
        case CategoryType.FOOD:
            return { bg: '#ffebee', text: '#d32f2f' }; // Red
        case CategoryType.TRANSPORT:
            return { bg: '#e3f2fd', text: '#1976d2' }; // Blue
        case CategoryType.ENTERTAINMENT:
            return { bg: '#f3e5f5', text: '#7b1fa2' }; // Purple
        case CategoryType.UTILITIES:
            return { bg: '#fff3e0', text: '#ed6c02' }; // Orange
        case CategoryType.SHOPPING:
            return { bg: '#fce4ec', text: '#c2185b' }; // Pink
        case CategoryType.RENT:
        case 'Housing':
            return { bg: '#e0f7fa', text: '#006064' }; // Cyan
        case CategoryType.HEALTH:
            return { bg: '#e8f5e9', text: '#2e7d32' }; // Green
        case CategoryType.EDUCATION:
            return { bg: '#e8eaf6', text: '#303f9f' }; // Indigo
        case CategoryType.INCOME:
            return { bg: '#f9fbe7', text: '#827717' }; // Lime
        case 'Groceries':
            return { bg: '#efebe9', text: '#5d4037' }; // Brown
        default:
            return { bg: '#f5f5f5', text: '#616161' }; // Grey
    }
};
