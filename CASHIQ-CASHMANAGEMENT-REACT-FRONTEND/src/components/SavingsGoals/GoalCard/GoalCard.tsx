import { LinearProgress, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './GoalCard.css';

interface GoalCardProps {
    title: string;
    icon?: string; // Emoji
    currentAmount: number;
    targetAmount: number;
    progress: number; // 0 to 100
    message: string;
    color: string; // Hex code
}

const GoalCard: React.FC<GoalCardProps> = ({
    title,
    icon,
    currentAmount,
    targetAmount,
    progress,
    message,
    color,
}) => {
    return (
        <div className="goal-card">
            <div className="goal-header-row">
                <div className="goal-title">
                    {title} <span>{icon}</span>
                </div>
                <div className="goal-actions">
                    <IconButton size="small" aria-label="edit goal">
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" aria-label="delete goal" color="error">
                        <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                </div>
            </div>

            <div>
                <span className="progress-label">Progress Bar</span>
                <LinearProgress 
                    variant="determinate" 
                    value={progress} 
                    sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        backgroundColor: '#e2e8f0',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: color
                        }
                    }}
                />
                
                <div className="goal-values">
                    <span className="current-amount" style={{ color: color }}>₹{currentAmount.toLocaleString()}</span>
                    <span className="target-amount"> / ₹{targetAmount.toLocaleString()}</span>
                </div>
                
                <div className="goal-message">
                    Status: {message}
                </div>
            </div>
        </div>
    );
};

export default GoalCard;
