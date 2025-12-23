import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AddIcon from '@mui/icons-material/Add';
import './EmptyState.css';

interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
    title, 
    description, 
    actionLabel, 
    onAction, 
    icon 
}) => {
    return (
        <Box className="empty-state-container">
            {icon ? (
                <div className="empty-state-custom-icon-wrapper">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {React.cloneElement(icon as React.ReactElement<any>, { className: 'empty-state-icon' })}
                </div>
            ) : (
                <SmartToyIcon className="empty-state-icon" sx={{ fontSize: 60, color: '#94a3b8', mb: 2 }} />
            )}
            
            <Typography variant="h6" className="empty-state-title">
                {title}
            </Typography>
            
            <Typography variant="body1" className="empty-state-text">
                {description}
            </Typography>
            
            {actionLabel && onAction && (
                <Button 
                    variant="outlined" 
                    startIcon={<AddIcon />}
                    onClick={onAction}
                    className="empty-state-button"
                >
                    {actionLabel}
                </Button>
            )}
        </Box>
    );
};

export default EmptyState;
