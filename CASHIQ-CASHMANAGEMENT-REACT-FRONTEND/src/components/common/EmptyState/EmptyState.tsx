import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import './EmptyState.css';

interface EmptyStateProps {
    title?: string; // Replaces 'message' in newer usage
    message?: string; // Legacy support
    description?: string;
    icon?: React.ReactNode;
    actionLabel?: string;
    onAction?: () => void;
}

/**
 * A reusable component to display when there is no data.
 */
const EmptyState: React.FC<EmptyStateProps> = ({ 
    title,
    message, 
    description, 
    icon,
    actionLabel,
    onAction
}) => {
    return (
        <div className="empty-state-container">
            <Box className="empty-state-icon">
                {icon || <SearchOffIcon fontSize="inherit" />}
            </Box>
            <Typography variant="h6" className="empty-state-message">
                {title || message}
            </Typography>
            {description && (
                <Typography variant="body2" className="empty-state-description">
                    {description}
                </Typography>
            )}
            {actionLabel && onAction && (
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={onAction}
                    sx={{ mt: 2 }}
                >
                    {actionLabel}
                </Button>
            )}
        </div>
    );
};

export default EmptyState;
