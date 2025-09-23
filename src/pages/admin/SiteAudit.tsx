import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Zap, 
  Shield, 
  Smartphone,
  Globe,
  FileText,
  Image,
  Link
} from "lucide-react";
import { toast } from "sonner";

const SiteAudit = () => {
  const [loading, setLoading] = useState(false);
  const [lastAudit, setLastAudit] = useState("2024-01-15 10:30 AM");
  
  const [auditScore, setAuditScore] = useState(85);
  const [issues, setIssues] = useState({
    critical: 2,
    warnings: 7,
    passed: 43
  });

  const criticalIssues = [
    {
      type: "performance",
      title: "Large Image Files",
      description: "3 images over 500KB slowing page load",
      pages: ["/products", "/showroom"],
      icon: Image
    },
    {
      type: "seo",
      title: "Missing Meta Descriptions",
      description: "5 pages lack meta descriptions",
      pages: ["/about", "/services", "/contact"],
      icon: FileText
    }
  ];

  const warnings = [
    {
      type: "performance",
      title: "Render-blocking resources",
      description: "2 CSS files blocking initial render",
      impact: "medium"
    },
    {
      type: "seo",
      title: "Short meta descriptions",
      description: "8 pages have descriptions under 120 characters",
      impact: "low"
    },
    {
      type: "accessibility",
      title: "Missing alt attributes",
      description: "12 images lack alt text",
      impact: "medium"
    },
    {
      type: "mobile",
      title: "Viewport meta tag",
      description: "Consider adding viewport meta tag",
      impact: "low"
    }
  ];

  const performanceMetrics = [
    { metric: "Page Speed", score: 78, benchmark: 90 },
    { metric: "First Contentful Paint", score: 82, benchmark: 85 },
    { metric: "Time to Interactive", score: 71, benchmark: 80 },
    { metric: "Cumulative Layout Shift", score: 95, benchmark: 90 }
  ];

  const runAudit = async () => {
    setLoading(true);
    toast.info("Running comprehensive site audit...");
    
    // Simulate API call to FireAPI
    setTimeout(() => {
      setLoading(false);
      setLastAudit(new Date().toLocaleString());
      toast.success("Site audit completed!");
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const getImpactBadge = (impact: string) => {
    const variants: Record<string, "destructive" | "default" | "secondary"> = {
      high: "destructive",
      medium: "default",
      low: "secondary"
    };
    return variants[impact] || "secondary";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Site Audit</h1>
          <p className="text-muted-foreground">Technical SEO and performance analysis</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Last audit: {lastAudit}</p>
          <Button onClick={runAudit} disabled={loading} className="mt-2">
            {loading ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Running Audit...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Run Full Audit
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Site Health</CardTitle>
          <CardDescription>Comprehensive technical SEO score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-8">
            <div className="relative">
              <div className="flex items-center justify-center w-32 h-32 rounded-full border-8 border-muted">
                <span className={`text-4xl font-bold ${getScoreColor(auditScore)}`}>
                  {auditScore}
                </span>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-destructive" />
                  <div>
                    <p className="text-2xl font-bold">{issues.critical}</p>
                    <p className="text-sm text-muted-foreground">Critical Issues</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-warning" />
                  <div>
                    <p className="text-2xl font-bold">{issues.warnings}</p>
                    <p className="text-sm text-muted-foreground">Warnings</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <div>
                    <p className="text-2xl font-bold">{issues.passed}</p>
                    <p className="text-sm text-muted-foreground">Passed Checks</p>
                  </div>
                </div>
              </div>
              <Progress value={auditScore} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Issues Tabs */}
      <Tabs defaultValue="critical" className="space-y-4">
        <TabsList>
          <TabsTrigger value="critical">Critical Issues ({issues.critical})</TabsTrigger>
          <TabsTrigger value="warnings">Warnings ({issues.warnings})</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="critical" className="space-y-4">
          {criticalIssues.map((issue, index) => (
            <Alert key={index} variant="destructive">
              <issue.icon className="h-4 w-4" />
              <AlertTitle>{issue.title}</AlertTitle>
              <AlertDescription>
                <p>{issue.description}</p>
                <p className="text-xs mt-2">
                  Affected pages: {issue.pages.join(", ")}
                </p>
                <Button size="sm" variant="outline" className="mt-3">
                  View Details
                </Button>
              </AlertDescription>
            </Alert>
          ))}
        </TabsContent>

        <TabsContent value="warnings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Warning Issues</CardTitle>
              <CardDescription>Non-critical issues that should be addressed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {warnings.map((warning, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">{warning.title}</p>
                      <p className="text-sm text-muted-foreground">{warning.description}</p>
                    </div>
                    <Badge variant={getImpactBadge(warning.impact)}>
                      {warning.impact} impact
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Core Web Vitals and speed metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{metric.metric}</span>
                      <span className={getScoreColor(metric.score)}>
                        {metric.score}/100
                      </span>
                    </div>
                    <div className="relative">
                      <Progress value={metric.score} className="h-2" />
                      <div 
                        className="absolute top-0 h-2 w-0.5 bg-primary"
                        style={{ left: `${metric.benchmark}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Benchmark: {metric.benchmark}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Priority Recommendations</CardTitle>
          <CardDescription>Most impactful improvements for your site</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge className="mt-1">1</Badge>
              <div>
                <p className="font-medium">Optimize Images</p>
                <p className="text-sm text-muted-foreground">
                  Compress and convert images to WebP format. Estimated 40% reduction in page load time.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="mt-1">2</Badge>
              <div>
                <p className="font-medium">Add Meta Descriptions</p>
                <p className="text-sm text-muted-foreground">
                  Write unique meta descriptions for 5 pages to improve CTR from search results.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="mt-1">3</Badge>
              <div>
                <p className="font-medium">Implement Lazy Loading</p>
                <p className="text-sm text-muted-foreground">
                  Add lazy loading for below-the-fold images to improve initial page load.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteAudit;