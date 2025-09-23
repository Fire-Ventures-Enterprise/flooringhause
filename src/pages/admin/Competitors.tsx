import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, TrendingUp, TrendingDown, ExternalLink, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const Competitors = () => {
  const [competitors, setCompetitors] = useState([
    {
      id: 1,
      domain: "flooringcanada.ca",
      visibility: 78,
      keywords: 1234,
      traffic: 45000,
      backlinks: 567,
      change: 5.2,
      overlap: 42
    },
    {
      id: 2,
      domain: "torontoflooring.com",
      visibility: 65,
      keywords: 890,
      traffic: 32000,
      backlinks: 345,
      change: -2.1,
      overlap: 38
    },
    {
      id: 3,
      domain: "gtaflooring.ca",
      visibility: 54,
      keywords: 678,
      traffic: 28000,
      backlinks: 234,
      change: 3.8,
      overlap: 29
    },
    {
      id: 4,
      domain: "canadiantile.ca",
      visibility: 72,
      keywords: 1456,
      traffic: 52000,
      backlinks: 789,
      change: -1.5,
      overlap: 51
    }
  ]);

  const [newCompetitor, setNewCompetitor] = useState("");
  const [loading, setLoading] = useState(false);

  const addCompetitor = async () => {
    if (!newCompetitor) return;
    
    setLoading(true);
    try {
      // In production, this would call your FireAPI
      toast.success(`Added ${newCompetitor} to competitor tracking`);
      setNewCompetitor("");
    } catch (error) {
      toast.error("Failed to add competitor");
    } finally {
      setLoading(false);
    }
  };

  const refreshAnalysis = () => {
    setLoading(true);
    toast.info("Analyzing competitors...");
    setTimeout(() => {
      setLoading(false);
      toast.success("Competitor analysis updated!");
    }, 2000);
  };

  const commonKeywords = [
    { keyword: "flooring toronto", yourPos: 3, competitorPos: 5, gap: 2 },
    { keyword: "luxury vinyl", yourPos: 7, competitorPos: 2, gap: -5 },
    { keyword: "tile installation", yourPos: 12, competitorPos: 8, gap: -4 },
    { keyword: "hardwood floors", yourPos: 4, competitorPos: 6, gap: 2 },
    { keyword: "flooring showroom", yourPos: 9, competitorPos: 11, gap: 2 }
  ];

  const contentGaps = [
    { topic: "Flooring maintenance guides", opportunity: "high", difficulty: "low" },
    { topic: "Cost calculator tools", opportunity: "high", difficulty: "medium" },
    { topic: "Video installation tutorials", opportunity: "medium", difficulty: "medium" },
    { topic: "Design inspiration gallery", opportunity: "high", difficulty: "low" },
    { topic: "Local project showcases", opportunity: "medium", difficulty: "low" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Competitor Analysis</h1>
          <p className="text-muted-foreground">Monitor and analyze your competition</p>
        </div>
        <Button onClick={refreshAnalysis} disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Analysis
        </Button>
      </div>

      {/* Add Competitor */}
      <Card>
        <CardHeader>
          <CardTitle>Track New Competitor</CardTitle>
          <CardDescription>Add competitor domains to monitor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 max-w-md">
            <Input
              placeholder="competitor-domain.com"
              value={newCompetitor}
              onChange={(e) => setNewCompetitor(e.target.value)}
            />
            <Button onClick={addCompetitor} disabled={loading || !newCompetitor}>
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Competitors Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Competitors Overview</CardTitle>
          <CardDescription>Performance metrics for tracked competitors</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead className="text-center">Keywords</TableHead>
                <TableHead className="text-center">Est. Traffic</TableHead>
                <TableHead className="text-center">Backlinks</TableHead>
                <TableHead className="text-center">Change</TableHead>
                <TableHead className="text-center">Overlap</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competitors.map((comp) => (
                <TableRow key={comp.id}>
                  <TableCell className="font-medium">{comp.domain}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{comp.visibility}%</div>
                      <Progress value={comp.visibility} className="h-2 w-24" />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{comp.keywords.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{comp.traffic.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{comp.backlinks}</TableCell>
                  <TableCell className="text-center">
                    <span className={`flex items-center justify-center gap-1 ${comp.change > 0 ? 'text-success' : 'text-destructive'}`}>
                      {comp.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {Math.abs(comp.change)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{comp.overlap}%</Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Keyword Gaps */}
        <Card>
          <CardHeader>
            <CardTitle>Keyword Position Gaps</CardTitle>
            <CardDescription>Keywords where competitors outrank you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {commonKeywords.map((kw, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex-1">
                    <p className="font-medium">{kw.keyword}</p>
                    <p className="text-xs text-muted-foreground">
                      You: #{kw.yourPos} | Competitor: #{kw.competitorPos}
                    </p>
                  </div>
                  <Badge variant={kw.gap > 0 ? "default" : "destructive"}>
                    {kw.gap > 0 ? `+${kw.gap}` : kw.gap}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle>Content Opportunities</CardTitle>
            <CardDescription>Topics your competitors rank for that you don't</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contentGaps.map((gap, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex-1">
                    <p className="font-medium">{gap.topic}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {gap.opportunity} opportunity
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {gap.difficulty} difficulty
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Competitors;