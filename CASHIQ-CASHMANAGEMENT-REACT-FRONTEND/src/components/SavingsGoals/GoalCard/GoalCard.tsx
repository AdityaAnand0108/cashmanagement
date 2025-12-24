import { LinearProgress, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './GoalCard.css';

interface GoalCardProps {
    id: number;
    title: string;
    icon?: React.ReactNode;
    currentAmount: number;
    targetAmount: number;
    progress: number; // 0 to 100
    message: string;
    color: string; // Hex code
    onDelete: (id: number) => void;
    onAddFunds: (id: number) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({
    id,
    title,
    icon,
    currentAmount,
    targetAmount,
    progress,
    message,
    color,
    onDelete,
    onAddFunds,
}) => {
    return (
        <div className="goal-card">
            <div className="goal-header-row">
                <div className="goal-title">
                    {title} {icon}
                </div>
                <div className="goal-actions">
                    <IconButton size="small" aria-label="add funds" onClick={() => onAddFunds(id)} title="Add Funds">
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" aria-label="delete goal" color="error" onClick={() => onDelete(id)}>
                        <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                </div>
            </div>

            <div>

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
