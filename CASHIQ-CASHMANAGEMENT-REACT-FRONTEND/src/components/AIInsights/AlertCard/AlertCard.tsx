import React from 'react';
import { Button } from '@mui/material';
import './AlertCard.css';

interface AlertCardProps {
    title: string;
    icon: string;
    description: string;
    actionLabel: string;
    type: 'danger' | 'success' | 'warning';
}

const AlertCard: React.FC<AlertCardProps> = ({ 
    title, 
    icon, 
    description, 
    actionLabel, 
    type 
}) => {
    let borderColor = '';
    let btnColor = '';

    switch (type) {
        case 'danger':
            borderColor = '#dc2626'; // Red
            btnColor = '#dc2626';
            break;
        case 'success':
            borderColor = '#16a34a'; // Green
            btnColor = '#16a34a';
            break;
        case 'warning':
            borderColor = '#eab308'; // Yellow
            btnColor = '#ca8a04'; // Darker yellow for text
            break;
    }

    return (
        <div className="alert-card" style={{ borderLeftColor: borderColor }}>
            <div>
                <div className="alert-header">
                    <div className="alert-title">
                        {title}
                        <span className="alert-icon">{icon}</span>
                    </div>
                </div>
                <div className="alert-description">
                    {description}
                </div>
            </div>
            <Button 
                variant="outlined" 
                className="alert-action-btn"
                sx={{ 
                    color: btnColor, 
                    borderColor: '#cbd5e1',
                    '&:hover': {
                        borderColor: btnColor,
                        backgroundColor: `${btnColor}11`
                    }
                }}
            >
                {actionLabel}
            </Button>
        </div>
    );
};

export default AlertCard;
