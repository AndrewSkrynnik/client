"use client";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { useRouter } from "next/navigation";

import { SearchResultTableProps } from "@/features/search/types";

export const SearchResultTable = ({
  brands,
  fallbackNumber
}: SearchResultTableProps) => {
  const router = useRouter();

  console.log("Rendering SearchResultTable with brands:", brands);

  if (brands.length === 0) {
    console.warn("Brands array is empty or undefined.");
    return (
      <p className="text-center text-gray-500">Нет данных для отображения.</p>
    );
  }

  const number = brands[0]?.number || fallbackNumber;

  const handleRowClick = (brand: string) => {
    if (!number) {
      console.error("Ошибка: номер артикула отсутствует!");
      return;
    }
    router.push(`/search/${number}/crosses/${encodeURIComponent(brand)}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              fontWeight: "bold",
              backgroundColor: "#f5f5f5"
            }}
          >
            {["Производитель", "Артикул (Номер)", "Описание"].map(
              (label, index) => (
                <TableCell
                  key={index}
                  sx={{
                    height: 48,
                    padding: "8px 16px",
                    fontWeight: "bold",
                    backgroundColor: "#f5f5f5",
                    textAlign: "center"
                  }}
                >
                  {label}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {brands.map(brand => (
            <TableRow
              key={brand.id}
              hover
              onClick={() => handleRowClick(brand.brand)}
              sx={{ cursor: "pointer" }}
            >
              {[brand.brand, brand.number, brand.description].map(
                (value, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      height: 48,
                      padding: "8px 16px",
                      textAlign: "center"
                    }}
                  >
                    {value}
                  </TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
