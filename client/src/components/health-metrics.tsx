import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Heart, Activity, Bed } from "lucide-react";
import { HealthMetric } from "@/lib/types";

interface HealthMetricsProps {
  metrics: HealthMetric[];
}

export default function HealthMetrics({ metrics }: HealthMetricsProps) {
  // Get latest metrics for summary cards
  const getLatestMetric = (type: string) => {
    return metrics
      .filter(m => m.type === type)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  };

  const getFirstMetric = (type: string) => {
    return metrics
      .filter(m => m.type === type)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  };

  const latestBpSys = getLatestMetric('bp_systolic');
  const latestBpDia = getLatestMetric('bp_diastolic');
  const firstBpSys = getFirstMetric('bp_systolic');
  const firstBpDia = getFirstMetric('bp_diastolic');
  
  const latestLdl = getLatestMetric('ldl_cholesterol');
  const firstLdl = getFirstMetric('ldl_cholesterol');
  
  const latestRecovery = getLatestMetric('recovery_score');
  const firstRecovery = getFirstMetric('recovery_score');

  // Prepare chart data
  const chartData = metrics
    .filter(m => ['bp_systolic', 'recovery_score', 'ldl_cholesterol'].includes(m.type))
    .reduce((acc, metric) => {
      const date = new Date(metric.date).toLocaleDateString('en-US', { month: 'short' });
      const existing = acc.find(item => item.month === date);
      
      if (existing) {
        if (metric.type === 'bp_systolic') existing.bloodPressure = metric.value;
        if (metric.type === 'recovery_score') existing.recoveryScore = metric.value;
        if (metric.type === 'ldl_cholesterol') existing.ldlCholesterol = metric.value;
      } else {
        acc.push({
          month: date,
          bloodPressure: metric.type === 'bp_systolic' ? metric.value : undefined,
          recoveryScore: metric.type === 'recovery_score' ? metric.value : undefined,
          ldlCholesterol: metric.type === 'ldl_cholesterol' ? metric.value : undefined
        });
      }
      
      return acc;
    }, [] as any[])
    .sort((a, b) => {
      const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
      return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
    });

  const calculateImprovement = (latest: HealthMetric | undefined, first: HealthMetric | undefined, isHigherBetter = false) => {
    if (!latest || !first) return { value: 0, isImprovement: false };
    
    const diff = latest.value - first.value;
    const isImprovement = isHigherBetter ? diff > 0 : diff < 0;
    
    return {
      value: Math.abs(diff),
      isImprovement
    };
  };

  const bpImprovement = calculateImprovement(latestBpSys, firstBpSys);
  const ldlImprovement = calculateImprovement(latestLdl, firstLdl);
  const recoveryImprovement = calculateImprovement(latestRecovery, firstRecovery, true);

  return (
    <div className="space-y-6">
      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card data-testid="metric-blood-pressure">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-600">Blood Pressure</h3>
              <Heart className="h-4 w-4 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">
              {latestBpSys && latestBpDia ? `${latestBpSys.value}/${latestBpDia.value}` : 'N/A'}
            </div>
            {bpImprovement.value > 0 && (
              <div className={`text-sm flex items-center ${bpImprovement.isImprovement ? 'text-green-600' : 'text-red-600'}`}>
                {bpImprovement.isImprovement ? <TrendingDown className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1" />}
                {bpImprovement.value} points {bpImprovement.isImprovement ? 'improvement' : 'increase'}
              </div>
            )}
            <div className="text-xs text-slate-500 mt-1">
              {firstBpSys && firstBpDia ? `From ${firstBpSys.value}/${firstBpDia.value} in Jan` : 'Baseline not available'}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="metric-ldl-cholesterol">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-600">LDL Cholesterol</h3>
              <Activity className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">
              {latestLdl ? `${latestLdl.value} ${latestLdl.unit}` : 'N/A'}
            </div>
            {ldlImprovement.value > 0 && (
              <div className={`text-sm flex items-center ${ldlImprovement.isImprovement ? 'text-green-600' : 'text-red-600'}`}>
                {ldlImprovement.isImprovement ? <TrendingDown className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1" />}
                {ldlImprovement.value} points {ldlImprovement.isImprovement ? 'reduction' : 'increase'}
              </div>
            )}
            <div className="text-xs text-slate-500 mt-1">
              {firstLdl ? `From ${firstLdl.value} ${firstLdl.unit} in Jan` : 'Baseline not available'}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="metric-recovery-score">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-600">Recovery Score</h3>
              <Bed className="h-4 w-4 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">
              {latestRecovery ? `${latestRecovery.value}${latestRecovery.unit}` : 'N/A'}
            </div>
            {recoveryImprovement.value > 0 && (
              <div className={`text-sm flex items-center ${recoveryImprovement.isImprovement ? 'text-green-600' : 'text-red-600'}`}>
                {recoveryImprovement.isImprovement ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {recoveryImprovement.value}% {recoveryImprovement.isImprovement ? 'improvement' : 'decline'}
              </div>
            )}
            <div className="text-xs text-slate-500 mt-1">
              {firstRecovery ? `From ${firstRecovery.value}% baseline` : 'Baseline not available'}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="metric-team-hours">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-600">Team Hours</h3>
              <Activity className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">52</div>
            <div className="text-sm text-slate-600 flex items-center">
              <Activity className="h-3 w-3 mr-1" />
              7 specialists
            </div>
            <div className="text-xs text-slate-500 mt-1">238 total messages</div>
          </CardContent>
        </Card>
      </div>

      {/* Health Metrics Chart */}
      <Card data-testid="health-metrics-chart">
        <CardHeader>
          <CardTitle>Key Metrics Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="bloodPressure" 
                  stroke="#DC2626" 
                  strokeWidth={2}
                  name="Blood Pressure (Systolic)"
                />
                <Line 
                  type="monotone" 
                  dataKey="recoveryScore" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  name="Recovery Score (%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="ldlCholesterol" 
                  stroke="#059669" 
                  strokeWidth={2}
                  name="LDL Cholesterol"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
