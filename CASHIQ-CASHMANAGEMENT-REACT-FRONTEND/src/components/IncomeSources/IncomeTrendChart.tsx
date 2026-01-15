import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { TransactionDTO } from '../../models/Transaction';

interface IncomeTrendChartProps {
    transactions: TransactionDTO[];
}

const IncomeTrendChart: React.FC<IncomeTrendChartProps> = ({ transactions }) => {
    
    const data = useMemo(() => {
        const monthlyData: Record<string, { value: number; sources: Set<string>; date: Date }> = {};
        const today = new Date();
        
        // Helper to get month key
        const getMonthKey = (date: Date) => date.toLocaleString('default', { month: 'short' });

        // Process transactions
        if (transactions.length === 0) {
            // Default to last 6 months empty if no data
            for (let i = 5; i >= 0; i--) {
                const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
                monthlyData[getMonthKey(d)] = { value: 0, sources: new Set(), date: d };
            }
        } else {
             // Find the earliest date in transactions
             // Filter out future transactions just in case
             const validTx = transactions.filter(tx => tx.date && new Date(tx.date) <= today);
             
             if (validTx.length === 0) {
                 // Fallback if all are future or invalid
                 for (let i = 5; i >= 0; i--) {
                    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
                    monthlyData[getMonthKey(d)] = { value: 0, sources: new Set(), date: d };
                }
             } else {
                 const dates = validTx.map(tx => new Date(tx.date!).getTime());
                 const minDate = new Date(Math.min(...dates));
                 
                 // Determine start date: 
                 // If minDate is within last 3 months, show at least last 6 months for context?
                 // Or just show from minDate (clamped to start of that year) to now?
                 // User wants "If just started in Jan, do not show previous 12 months".
                 // Let's show from the earlier of (minDate) or (Jan 1st of current year)
                 // But ensuring at least a few months for a chart look.
                 
                 const startDate = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
                 // If start date is very recent (this month), go back a bit to show "growth" or lack thereof
                 if (today.getMonth() === startDate.getMonth() && today.getFullYear() === startDate.getFullYear()) {
                     startDate.setMonth(startDate.getMonth() - 2); 
                 }
                 
                 // Generate months from startDate to today + 1 month (to include Feb/next month)
                 const targetEnd = new Date(today.getFullYear(), today.getMonth() + 1, 1);
                 
                 const current = new Date(startDate);
                 while (current <= targetEnd) {
                     monthlyData[getMonthKey(current)] = { value: 0, sources: new Set(), date: new Date(current) };
                     current.setMonth(current.getMonth() + 1);
                 }
             }

             // Populate data
             validTx.forEach(tx => {
                if (!tx.date) return;
                const date = new Date(tx.date);
                const monthKey = getMonthKey(date);
                
                // Only track if it's in our generated range (or should we expand range?)
                // For simplicity, we only mapped from minDate. 
                // Any transaction older than minDate shouldn't exist because we found minDate.
                // But we constructed the range based on minDate.
                
                if (monthlyData[monthKey]) {
                    monthlyData[monthKey].value += tx.amount;
                    if (tx.paymentSource) monthlyData[monthKey].sources.add(tx.paymentSource);
                }
             });
        }

        return Object.entries(monthlyData).map(([name, data]) => ({
            name,
            value: data.value,
            sources: Array.from(data.sources).join(', ')
        }));
    }, [transactions]);

    const formatYAxis = (value: number) => {
        if (value >= 100000) return `${(value / 100000).toFixed(1).replace(/\.0$/, '')}L`;
        if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
        return value.toString();
    };

    return (
        <div style={{ width: '100%', height: '100%', minHeight: '100px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
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
                        width={30}
                        tick={{fontSize: 10, fill: '#666'}}
                        tickFormatter={formatYAxis}
                    />
                    <Tooltip 
                        formatter={(value: number | undefined, _name: any, props: any) => [
                            value !== undefined ? `₹${value.toLocaleString()}` : 'N/A', 
                            props.payload.sources ? `${props.payload.sources}` : 'Income'
                        ] as [string, string]}
                        labelStyle={{ color: '#333', fontWeight: 'bold' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#22c55e" 
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
