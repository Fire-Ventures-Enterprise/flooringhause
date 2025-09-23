import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpIcon, ArrowDownIcon, RefreshCw, Download, Plus, Search } from "lucide-react";
import { toast } from "sonner";

const Rankings = () => {
  const [keywords, setKeywords] = useState([
    { id: 1, keyword: "flooring toronto", position: 3, previousPosition: 5, volume: 2400, difficulty: 72, url: "/products" },
    { id: 2, keyword: "trusa mosaics toronto", position: 1, previousPosition: 1, volume: 1100, difficulty: 45, url: "/" },
    { id: 3, keyword: "luxury vinyl flooring", position: 7, previousPosition: 6, volume: 3200, difficulty: 68, url: "/products/vinyl" },
    { id: 4, keyword: "hardwood installation toronto", position: 5, previousPosition: 8, volume: 880, difficulty: 54, url: "/services" },
    { id: 5, keyword: "tile flooring showroom", position: 9, previousPosition: 10, volume: 720, difficulty: 41, url: "/showroom" },
    { id: 6, keyword: "flooring contractors near me", position: 12, previousPosition: 15, volume: 1900, difficulty: 78, url: "/contact" },
    { id: 7, keyword: "engineered hardwood toronto", position: 4, previousPosition: 4, volume: 1300, difficulty: 52, url: "/products/hardwood" },
    { id: 8, keyword: "bathroom tiles toronto", position: 11, previousPosition: 9, volume: 990, difficulty: 49, url: "/products/tiles" }
  ]);

  const [loading, setLoading] = useState(false);
  const [newKeyword, setNewKeyword] = useState("");
  const [filterLocation, setFilterLocation] = useState("canada");

  const trackKeyword = async () => {
    if (!newKeyword) return;
    
    setLoading(true);
    try {
      // In production, this would call your FireAPI
      const response = await fetch('https://fireapi.dev/api/seo/rankings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'your_api_key'
        },
        body: JSON.stringify({
          domain: 'flooringhause.com',
          keywords: [newKeyword],
          location: filterLocation
        })
      });
      
      toast.success(`Started tracking "${newKeyword}"`);
      setNewKeyword("");
    } catch (error) {
      toast.error("Failed to add keyword");
    } finally {
      setLoading(false);
    }
  };

  const refreshRankings = async () => {
    setLoading(true);
    toast.info("Refreshing rankings...");
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Rankings updated!");
    }, 2000);
  };

  const exportData = () => {
    const csv = keywords.map(k => 
      `${k.keyword},${k.position},${k.volume},${k.difficulty}`
    ).join('\n');
    
    // Create download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'keyword-rankings.csv';
    a.click();
    toast.success("Rankings exported!");
  };

  const getPositionChange = (current: number, previous: number) => {
    const change = previous - current;
    if (change > 0) return { icon: <ArrowUpIcon className="h-3 w-3" />, class: "text-success", value: change };
    if (change < 0) return { icon: <ArrowDownIcon className="h-3 w-3" />, class: "text-destructive", value: Math.abs(change) };
    return { icon: null, class: "text-muted-foreground", value: 0 };
  };

  const getDifficultyBadge = (difficulty: number) => {
    if (difficulty < 30) return { variant: "secondary" as const, label: "Easy" };
    if (difficulty < 60) return { variant: "default" as const, label: "Medium" };
    return { variant: "destructive" as const, label: "Hard" };
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Keyword Rankings</h1>
          <p className="text-muted-foreground">Track and monitor your search engine positions</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshRankings} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={exportData} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Add Keyword */}
      <Card>
        <CardHeader>
          <CardTitle>Track New Keyword</CardTitle>
          <CardDescription>Add keywords to monitor their search rankings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="Enter keyword to track..."
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              className="max-w-md"
            />
            <Select value={filterLocation} onValueChange={setFilterLocation}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="toronto">Toronto</SelectItem>
                <SelectItem value="ontario">Ontario</SelectItem>
                <SelectItem value="usa">United States</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={trackKeyword} disabled={loading || !newKeyword}>
              <Plus className="mr-2 h-4 w-4" />
              Add Keyword
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Rankings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Rankings</CardTitle>
          <CardDescription>Your tracked keywords and their current positions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keyword</TableHead>
                <TableHead className="text-center">Position</TableHead>
                <TableHead className="text-center">Change</TableHead>
                <TableHead className="text-center">Volume</TableHead>
                <TableHead className="text-center">Difficulty</TableHead>
                <TableHead>URL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keywords.map((kw) => {
                const change = getPositionChange(kw.position, kw.previousPosition);
                const difficulty = getDifficultyBadge(kw.difficulty);
                
                return (
                  <TableRow key={kw.id}>
                    <TableCell className="font-medium">{kw.keyword}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={kw.position <= 3 ? "default" : kw.position <= 10 ? "secondary" : "outline"}>
                        #{kw.position}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {change.value !== 0 && (
                        <span className={`flex items-center justify-center gap-1 ${change.class}`}>
                          {change.icon}
                          {change.value}
                        </span>
                      )}
                      {change.value === 0 && <span className="text-muted-foreground">-</span>}
                    </TableCell>
                    <TableCell className="text-center">{kw.volume.toLocaleString()}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={difficulty.variant}>{difficulty.label}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{kw.url}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Rankings;