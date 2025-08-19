import React, { useEffect, useState } from "react";

const ImportRooms = () => {
  const [csvData, setCsvData] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

      processFile(text);
    };

    reader.onerror = () => {
      setError("Erro ao ler o arquivo.");
      setIsLoading(false);
    };

    reader.readAsText(file);
  };

  const processFile = (text: string) => {
    const lines = text.split("\n");

    if (!lines) {
      setError("Houve um problema durante o processamento do arquivo.");
      return;
    }

    setCsvData(lines);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!csvData) return

    console.log("CSV DATA: ", csvData)
  }, [csvData])

  return isLoading ? (
    <p>Carregando...</p>
  ) : (
    <section>
      <div>
        <form encType="multipart/form-data">
          <label htmlFor="file">Arquivo: (.csv)</label>
          <input
            id="file"
            type="file"
            title="Enviar Planilha"
            accept=".csv"
            onChange={handleFileUpload}
          />
        </form>
        
        {error && <p>{error}</p>}
        {csvData && (
          <div className="p-3 my-4 w-full h-96 overflow-y-auto border border-black">
            <table className="">
              <thead className="text-left">
                <tr>
                  <th>Número</th>
                  <th>Sala</th>
                  <th>Localização</th>
                  <th>Tipo</th>
                  <th>Autorizações</th>
                </tr>
              </thead>
              {csvData.map((line, index) => {
                const items = line.split(",");

                return (
                  <tr
                    key={index}
                    className="border-b-2 border-b-black"
                  >
                    {items.map((item, idx) => (
                      <td key={`${item}-${idx}`}>{item}</td>
                    ))}
                  </tr>
                );
              })}
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default ImportRooms;
