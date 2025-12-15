import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, CircularProgress, Card, CardContent, Chip } from '@mui/material';
import SmartExpenseService from '../../services/SmartExpenseService';
import { toast } from 'react-toastify';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

const SmartExpense: React.FC = () => {
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{
        amount: number;
        category: string;
        date: string;
        payment_source: string;
    } | null>(null);

    const handleAnalyze = async () => {
        if (!description.trim()) {
            toast.warning('Please enter an expense description');
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const response = await SmartExpenseService.analyzeExpense(description);
            if (response && response.parsed_data) {
                setResult(response.parsed_data);
                toast.success('Expense analyzed successfully!');
            }
        } catch {
            toast.error('Failed to analyze expense. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AutoFixHighIcon fontSize="large" color="primary" />
                Smart Expense Analyzer
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
                Enter a natural language description of your expense (e.g., "Starbucks coffee $5.50 yesterday from Chase card") and let our AI categorize it for you.
            </Typography>

            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <TextField
                    fullWidth
                    label="Expense Description"
                    placeholder="e.g. Uber ride to airport $45"
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={2}
                    sx={{ mb: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={handleAnalyze}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AutoFixHighIcon />}
                >
                    {loading ? 'Analyzing...' : 'Analyze Expense'}
                </Button>
            </Paper>

            {result && (
                <Card variant="outlined" sx={{ borderColor: 'primary.main', bgcolor: '#f5faff' }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom color="primary">
                            Analysis Result
                        </Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                            <Box>
                                <Typography variant="caption" color="textSecondary">Category</Typography>
                                <Typography variant="h6">
                                    <Chip label={result.category} color="secondary" />
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="textSecondary">Amount</Typography>
                                <Typography variant="h6">${result.amount}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="textSecondary">Date</Typography>
                                <Typography variant="body1">{result.date || 'Not specified'}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="textSecondary">Source</Typography>
                                <Typography variant="body1">{result.payment_source || 'Unknown'}</Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default SmartExpense;
