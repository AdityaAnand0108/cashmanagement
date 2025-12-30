import React from 'react';
import { Typography, Box } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import './EmptyState.css';

interface EmptyStateProps {
    message: string;
    description?: string;
    icon?: React.ReactNode;
}

/**
 * A reusable component to display when there is no data.
 */
const EmptyState: React.FC<EmptyStateProps> = ({ 
    message, 
    description, 
    icon 
}) => {
    return (
        <div className="empty-state-container">
            <Box className="empty-state-icon">
                {icon || <SearchOffIcon fontSize="inherit" />}
            </Box>
            <Typography variant="h6" className="empty-state-message">
                {message}
            </Typography>
            {description && (
                <Typography variant="body2" className="empty-state-description">
                    {description}
                </Typography>
            )}
        </div>
    );
};

export default EmptyState;
