import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { LinearProgress, IconButton, Tooltip } from '@mui/material';
import './CategoryBudgetCard.css';

interface CategoryBudgetCardProps {
    category: string;
    icon: React.ReactNode;
    spent: number;
    limit: number;
    status: string; // e.g., "At Risk", "On Track"
    statusColor?: string; // Hex for status text
    progressColor?: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "inherit"; 
    customProgressColor?: string; // Hex for progress bar if not using standard MUI colors
    onEdit?: () => void;
    onDelete?: () => void;
}

const CategoryBudgetCard: React.FC<CategoryBudgetCardProps> = ({ 
    category, 
    icon, 
    spent, 
    limit, 
    status, 
    statusColor = '#475569',
    progressColor = 'primary',
    customProgressColor,
    onEdit,
    onDelete
}) => {
    const progress = Math.min((spent / limit) * 100, 100);

    return (
        <div className="category-budget-card">
            <div className="budget-card-header">
                <div className="budget-category-title">
                    {category} <span>{icon}</span>
                </div>
                <div className="budget-actions">
                    {onEdit && (
                        <IconButton size="small" onClick={onEdit} aria-label="edit budget">
                            <EditIcon fontSize="small" />
                        </IconButton>
                    )}
                    {onDelete && (
                        <Tooltip title="Delete Budget">
                            <IconButton size="small" onClick={onDelete} aria-label="delete budget" color="error">
                                <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                </div>
            </div>

            <div>
                <span className="progress-label">Progress Bar</span>
                <LinearProgress 
                    variant="determinate" 
                    value={progress} 
                    color={progressColor}
                    sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        backgroundColor: '#e2e8f0',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: customProgressColor
                        }
                    }}
                />
                
                <div className="budget-values">
                    <span className="spent-amount" style={{ color: customProgressColor }}>₹{spent}</span>
                    <span className="total-budget"> / ₹{limit}</span>
                </div>
                
                <div className="budget-status" style={{ color: statusColor || '#475569' }}>
                    Status: {status}
                </div>
            </div>
        </div>
    );
};

export default CategoryBudgetCard;
