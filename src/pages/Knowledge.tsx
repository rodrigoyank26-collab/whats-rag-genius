import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Download, 
  Trash2, 
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { useState } from "react";

const knowledgeFiles = [
  {
    id: "1",
    name: "Manual de Atendimento.pdf",
    size: "2.3 MB",
    type: "PDF",
    status: "processed",
    uploadedAt: "2024-01-15 10:30",
    chunks: 45
  },
  {
    id: "2", 
    name: "FAQ Produtos.docx",
    size: "890 KB", 
    type: "DOCX",
    status: "processing",
    uploadedAt: "2024-01-15 14:22",
    chunks: 0
  },
  {
    id: "3",
    name: "Política de Devolução.txt",
    size: "156 KB",
    type: "TXT", 
    status: "processed",
    uploadedAt: "2024-01-14 16:45",
    chunks: 12
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "processed": return <CheckCircle className="h-4 w-4 text-success" />;
    case "processing": return <Loader2 className="h-4 w-4 text-warning animate-spin" />;
    case "error": return <AlertCircle className="h-4 w-4 text-destructive" />;
    default: return <FileText className="h-4 w-4" />;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "processed": return "Processado";
    case "processing": return "Processando";
    case "error": return "Erro";
    default: return status;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "processed": return "bg-success text-success-foreground";
    case "processing": return "bg-warning text-warning-foreground";
    case "error": return "bg-destructive text-destructive-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const Knowledge = () => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    console.log("Files dropped:", files);
    // Handle file upload logic here
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Base de Conhecimento</h1>
          <p className="text-muted-foreground">
            Gerencie os arquivos que alimentam o sistema RAG
          </p>
        </div>

        {/* Upload Area */}
        <Card className="gradient-card shadow-soft">
          <CardHeader>
            <CardTitle>Upload de Documentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`
                relative border-2 border-dashed rounded-lg p-8 transition-smooth text-center
                ${dragActive 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50 hover:bg-accent/30"
                }
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Arraste arquivos aqui ou clique para selecionar
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    Suporte para PDF, DOCX, TXT e CSV até 10MB
                  </p>
                </div>
                <Button className="gradient-primary">
                  Selecionar Arquivos
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Files List */}
        <Card className="gradient-card shadow-soft">
          <CardHeader>
            <CardTitle>Arquivos Processados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {knowledgeFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-smooth"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground">
                          {file.name}
                        </h3>
                        <Badge className={getStatusColor(file.status)}>
                          {getStatusIcon(file.status)}
                          <span className="ml-1">{getStatusLabel(file.status)}</span>
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{file.size}</span>
                        <span>•</span>
                        <span>{file.type}</span>
                        <span>•</span>
                        <span>Upload: {file.uploadedAt}</span>
                        {file.chunks > 0 && (
                          <>
                            <span>•</span>
                            <span>{file.chunks} chunks gerados</span>
                          </>
                        )}
                      </div>
                      {file.status === "processing" && (
                        <div className="w-48">
                          <Progress value={65} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">
                            Processando... 65%
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Knowledge;