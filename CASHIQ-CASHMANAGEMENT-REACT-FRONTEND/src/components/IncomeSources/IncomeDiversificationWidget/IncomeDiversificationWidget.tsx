import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Typography } from "@mui/material";
import type { IncomeDTO } from "../../../models/Income";
import "./IncomeDiversificationWidget.css";

interface IncomeDiversificationWidgetProps {
  incomes: IncomeDTO[];
}

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#f59e0b",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
];

const IncomeDiversificationWidget: React.FC<
  IncomeDiversificationWidgetProps
> = ({ incomes }) => {
  const data = useMemo(() => {
    if (!incomes || incomes.length === 0) return [];
    return incomes.map((income) => ({
      name: income.name,
      value: income.amount,
    }));
  }, [incomes]);

  if (incomes.length === 0) return null;

  return (
    <div className="income-diversification-widget">
      <div className="widget-header">
        <Typography variant="h6" fontWeight="bold">
          Summary
        </Typography>
      </div>
      <div className="chart-container">
        <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number | undefined) => value !== undefined ? `₹${value.toLocaleString()}` : ''}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
        </div>
        <div className="custom-legend">
          {data.map((entry, index) => (
            <div key={`legend-${index}`} className="legend-item">
              <span
                className="legend-dot"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="legend-text" title={entry.name}>
                {entry.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IncomeDiversificationWidget;
