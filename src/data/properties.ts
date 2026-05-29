export interface Property {
  id: number;
  name: string;
  location: string;
  type: "Apartamento" | "Casa";
  size: string;
  bedrooms: number;
  bathrooms: number;
  price: string;
  tag?: string;
  gradient: string;
}

export const properties: Property[] = [
  {
    id: 1,
    name: "Residencial Vista Mar Infinito",
    location: "Balneário Camboriú, SC",
    type: "Apartamento",
    size: "280 m²",
    bedrooms: 4,
    bathrooms: 4,
    price: "R$ 8.500.000",
    tag: "EXCLUSIVO",
    gradient: "from-[#1a0a00] via-[#2c1810] to-[#0a0505]",
  },
  {
    id: 2,
    name: "Cobertura Duplex Horizon",
    location: "Balneário Camboriú, SC",
    type: "Apartamento",
    size: "420 m²",
    bedrooms: 5,
    bathrooms: 5,
    price: "R$ 14.200.000",
    tag: "EXCLUSIVO",
    gradient: "from-[#0a0a1a] via-[#101028] to-[#050510]",
  },
  {
    id: 3,
    name: "Casa de Alto Padrão Jardins",
    location: "Florianópolis, SC",
    type: "Casa",
    size: "650 m²",
    bedrooms: 6,
    bathrooms: 6,
    price: "R$ 6.800.000",
    tag: "EXCLUSIVO",
    gradient: "from-[#001a0a] via-[#0a2810] to-[#000f05]",
  },
  {
    id: 4,
    name: "Penthouse One Tower",
    location: "Balneário Camboriú, SC",
    type: "Apartamento",
    size: "380 m²",
    bedrooms: 4,
    bathrooms: 4,
    price: "R$ 11.900.000",
    gradient: "from-[#1a0a05] via-[#281505] to-[#0f0500]",
  },
  {
    id: 5,
    name: "Villa Mediterrânea Porto Belo",
    location: "Porto Belo, SC",
    type: "Casa",
    size: "520 m²",
    bedrooms: 5,
    bathrooms: 5,
    price: "R$ 4.500.000",
    tag: "EXCLUSIVO",
    gradient: "from-[#0a0505] via-[#1f1008] to-[#050202]",
  },
  {
    id: 6,
    name: "Flat Premium Beach Club",
    location: "Porto Belo, SC",
    type: "Apartamento",
    size: "120 m²",
    bedrooms: 2,
    bathrooms: 2,
    price: "R$ 1.850.000",
    gradient: "from-[#050510] via-[#0a0a20] to-[#020208]",
  },
];
