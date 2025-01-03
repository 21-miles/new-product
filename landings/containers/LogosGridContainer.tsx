"use client";
import logosData from "@/content/logos-grid.json";
import LogosGrid from "@/components/LogosGrid";
import { cn } from "@/lib/utils";

// Define os tipos para as colunas e logos
type ConfigColumns = {
  default: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

type LogoItem = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

// Torna className opcional em LogoConfig
type LogoConfig = {
  title: string;
  logos: LogoItem[];
  columns: ConfigColumns;
  className?: string;
};

// Define LogosGridData com propriedades opcionais usando Partial
type LogosGridData = {
  grids: Array<Partial<Record<string, LogoConfig>>>;
};

// Faz um type assertion para LogosGridData ao carregar o JSON
const logos: LogosGridData = logosData as LogosGridData;

export default function LogoGrid({ configName }: { configName: string }) {
  // Busca o objeto dentro de `grids` que contém a configuração `configName`
  const config = logos.grids.find((grid) => configName in grid)?.[configName];

  if (!config) {
    console.error(`Configuração '${configName}' não encontrada`);
    return null;
  }

  const gridClasses = cn(
    "grid gap-4 items-center justify-center",
    `grid-cols-${config.columns.default}`,
    config.columns.sm ? `sm:grid-cols-${config.columns.sm}` : "",
    config.columns.md ? `md:grid-cols-${config.columns.md}` : "",
    config.columns.lg ? `lg:grid-cols-${config.columns.lg}` : "",
    config.columns.xl ? `xl:grid-cols-${config.columns.xl}` : "",
    config.className || ""
  );

  return (
    <LogosGrid
      title={config.title}
      logos={config.logos}
      gridClasses={gridClasses}
      configName={configName}
    />
  );
}
