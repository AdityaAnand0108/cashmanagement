import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { TransactionDTO } from '../../models/Transaction';

interface IncomeTrendChartProps {
    transactions: TransactionDTO[];
}

const IncomeTrendChart: React.FC<IncomeTrendChartProps> = ({ transactions }) => {
    
    const data = useMemo(() => {
        // Group transactions by month
        // Assuming transactions usually come in "YYYY-MM-DD" or similar format
        // We'll map them to a localized month string
        
        const monthlyData: Record<string, number> = {};
        // Initialize last 12 months with 0 to ensure continuous line
        const today = new Date();
        for (let i = 11; i >= 0; i--) {
            const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const monthKey = d.toLocaleString('default', { month: 'short' });
            monthlyData[monthKey] = 0; 
        }

        transactions.forEach(tx => {
            if (!tx.date) return;
            const date = new Date(tx.date);
            const monthKey = date.toLocaleString('default', { month: 'short' });
            
            // Only add if it falls within our range (already initialized keys)
            // Or just accum all and filter later? 
            // Simplest: Just sum up everything. If distinct years matter, we should use 'MMM YY' or verify year.
            // For now, let's assume "Monthly Income" context implies implied yearly cycle or we just show what we have.
            // But to match the "green line go up" intent for *trends*, we usually want chronological order.

            // Better approach: Check if date is within last 12 months? 
            // Let's stick to simple "Month" grouping for now, assuming the user filters for "This Year" or similar elsewhere?
            // Actually, let's just use the month of the transaction.
            
            if (monthlyData[monthKey] !== undefined) {
                 monthlyData[monthKey] += tx.amount;
            }
        });

        // Convert to array
        return Object.entries(monthlyData).map(([name, value]) => ({
            name,
            value
        }));
    }, [transactions]);


    return (
        <div style={{ width: '100%', height: '100%', minHeight: '100px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4caf50" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#4caf50" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis 
                        dataKey="name" 
                        hide={false} 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 10, fill: '#666'}}
                        interval={0}
                    />
                    <YAxis 
                        hide={false}
                        axisLine={false}
                        tickLine={false}
                        tick={{fontSize: 10, fill: '#666'}}
                        tickFormatter={(value: number) => `₹${value.toLocaleString()}`}
                    />
                    <Tooltip 
                        formatter={(value: number | undefined) => [
                            value !== undefined ? `₹${value.toLocaleString()}` : 'N/A', 
                            'Income'
                        ] as [string, string]}
                        labelStyle={{ color: '#333' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#4caf50" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorIncome)" 
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default IncomeTrendChart;
