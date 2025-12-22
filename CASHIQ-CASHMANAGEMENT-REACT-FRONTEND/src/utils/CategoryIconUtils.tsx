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
export const getCategoryIcon = (category: string | undefined): JSX.Element => {
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
