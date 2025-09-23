import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, AlertCircle, Search, Users, Link, CheckCircle } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    rankings: { avg: 12.3, change: -2.1, keywords: 47 },
    traffic: { visits: 14532, change: 8.2, bounce: 42.3 },
    backlinks: { total: 234, new: 12, quality: 78 },
    health: { score: 85, issues: 7, fixed: 23 }
  });

  const [rankingData, setRankingData] = useState([
    { date: "Mon", position: 15 },
    { date: "Tue", position: 14 },
    { date: "Wed", position: 12 },
    { date: "Thu", position: 11 },
    { date: "Fri", position: 10 },
    { date: "Sat", position: 9 },
    { date: "Sun", position: 8 }
  ]);

  const [topKeywords] = useState([
    { keyword: "flooring toronto", position: 3, change: 2, volume: 2400 },
    { keyword: "trusa mosaics toronto", position: 1, change: 0, volume: 1100 },
    { keyword: "luxury vinyl flooring", position: 7, change: -1, volume: 3200 },
    { keyword: "hardwood installation toronto", position: 5, change: 3, volume: 880 },
    { keyword: "tile flooring showroom", position: 9, change: 1, volume: 720 }
  ]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">SEO Dashboard</h1>
        <p className="text-muted-foreground">Monitor your website's search performance and optimization</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Position</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.rankings.avg}</div>
            <p className="text-xs text-muted-foreground">
              <span className={metrics.rankings.change > 0 ? "text-destructive" : "text-success"}>
                {metrics.rankings.change > 0 ? <ArrowDownIcon className="inline h-3 w-3" /> : <ArrowUpIcon className="inline h-3 w-3" />}
                {Math.abs(metrics.rankings.change)} positions
              </span>
              {" "}from last week
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Tracking {metrics.rankings.keywords} keywords
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organic Traffic</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.traffic.visits.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">
                <TrendingUpIcon className="inline h-3 w-3" />
                +{metrics.traffic.change}%
              </span>
              {" "}from last month
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Bounce rate: {metrics.traffic.bounce}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Backlinks</CardTitle>
            <Link className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.backlinks.total}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+{metrics.backlinks.new}</span> new this month
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Quality score: {metrics.backlinks.quality}/100
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Site Health</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.health.score}/100</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-warning">
                <AlertCircle className="inline h-3 w-3" />
                {metrics.health.issues} issues
              </span>
              {" "}to fix
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics.health.fixed} issues resolved
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Rankings Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Position Trend</CardTitle>
            <CardDescription>Average keyword position over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={rankingData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis reversed className="text-xs" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="position" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Keywords */}
        <Card>
          <CardHeader>
            <CardTitle>Top Keywords</CardTitle>
            <CardDescription>Your best performing search terms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topKeywords.map((kw, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex-1">
                    <p className="font-medium">{kw.keyword}</p>
                    <p className="text-xs text-muted-foreground">Volume: {kw.volume.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={kw.position <= 3 ? "default" : kw.position <= 10 ? "secondary" : "outline"}>
                      #{kw.position}
                    </Badge>
                    {kw.change !== 0 && (
                      <span className={`text-xs ${kw.change > 0 ? "text-success" : "text-destructive"}`}>
                        {kw.change > 0 ? <ArrowUpIcon className="inline h-3 w-3" /> : <ArrowDownIcon className="inline h-3 w-3" />}
                        {Math.abs(kw.change)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common SEO tasks and reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 flex-wrap">
            <Button variant="outline">Run Site Audit</Button>
            <Button variant="outline">Check Competitors</Button>
            <Button variant="outline">Export Rankings</Button>
            <Button variant="outline">View Backlinks</Button>
            <Button variant="outline">Generate Report</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;