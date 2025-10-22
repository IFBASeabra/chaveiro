import React, { useEffect, useState } from "react";
import Papa from "papaparse";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRooms } from "@/hooks/useRooms";
import supabase from "@/lib/supabase";

import type { Database } from "@/types/supabase";


const ImportRooms = () => {
  const [csvData, setCsvData] = useState<string[][] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { rooms } = useRooms()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setError("Arquivo inexistente");
      return;
    }

    setIsLoading(true);
    setError(null);

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result;

      if (!text) {
        setError("Houve um problema. Se vira pra entender depois");
        setIsLoading(false);
        return;
      }

      if (typeof text !== "string") {
        setError("Houve um problema relativo ao conteúdo do arquivo.");
        setIsLoading(false);
        return;
      }

      const { data } = Papa.parse<string[]>(text, { skipEmptyLines: true });
      setCsvData(data);
      setIsLoading(false);
    };

    reader.onerror = () => {
      setError("Erro ao ler o arquivo.");
      setIsLoading(false);
    };

    reader.readAsText(file);
  };

  const importData = async () => {
    if (!csvData) return;

    console.log('rooms: ', rooms)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalList = csvData.filter((csvItem: any) => {

      if (csvItem.length < 4) return false;

      const [number, , type, location] = csvItem;

      const room = rooms?.find(
        r =>
          r.number === number &&
          r.type === type &&
          r.location === location
      );

      return !room;
    });

    const newRooms = finalList.map(listItem => (
      {
        number: listItem[0], 
        name: listItem[1], 
        location: listItem[3] as string as Database["public"]["Enums"]["location"], 
        type: listItem[2] as string as Database["public"]["Enums"]["room_type"]
      }
    ))

    await supabase.from("rooms").upsert(newRooms)
  }

  useEffect(() => {
    if (!csvData) return

    console.log("CSV DATA: ", csvData)
  }, [csvData])

  return isLoading ? (
    <p>Carregando...</p>
  ) : (
    <section>
      <div className="w-full mx-auto my-5 px-4 lg:px-0">
        <form encType="multipart/form-data" className="max-w-1/3 mx-auto">
          <label htmlFor="file">Arquivo: (.csv)</label>
          <Input
            id="file"
            type="file"
            title="Enviar Planilha"
            accept=".csv"
            onChange={handleFileUpload}
          />
        </form>

        {error && <p>{error}</p>}
        {csvData && (
          <>
            <div className="p-3 my-4 w-full lg:max-w-[75vw] mx-auto overflow-y-auto border border-black">
              <table className="w-full">
                <thead className="text-left">
                  <tr>
                    <th className="px-2">Número</th>
                    <th className="px-2">Sala</th>
                    <th className="px-2">Tipo</th>
                    <th className="px-2">Localização</th>
                  </tr>
                </thead>
                {csvData?.map((line, index) => {
                  return (
                    <tr
                      key={index}
                      className="border-b-2 border-b-black"
                    >
                      {line?.map((item, idx) => (
                        <td className="px-2" key={`${item}-${idx}`}>{item}</td>
                      ))}
                    </tr>
                  );
                })}
              </table>
            </div>

            <div className="w-full flex items-center justify-center mx-auto my-4">
              <Button className="px-4" onClick={importData}>
                Importar Dados
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ImportRooms;
