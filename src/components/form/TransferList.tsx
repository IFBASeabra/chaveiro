import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft } from "lucide-react";
import type { Room } from "@/types/rooms";


type TransferListProps = {
  /** Lista total de itens disponíveis */
  available: Room[];

  /** Itens atualmente selecionados (controlado externamente) */
  value?: Room[];

  /** Callback chamado ao alterar seleção */
  onChange: (selected: Room[]) => void;

  /** Texto opcional para títulos */
  titles?: { available?: string; selected?: string };

  /** Renderização customizada do item */
  renderValue?: (item: Room) => React.ReactNode;
};

function not(a: Room[], b: Room[]) {
  const bIds = new Set(b.map((v) => v.id));
  return a.filter((item) => !bIds.has(item.id));
}

function intersection(a: Room[], b: Room[]) {
  const bIds = new Set(b.map((v) => v.id));
  return a.filter((item) => bIds.has(item.id));
}

function union(a: Room[], b: Room[]) {
  return [...a, ...not(b, a)];
}

export function TransferList({
  available,
  value = [],
  onChange,
  titles = { available: "Disponíveis", selected: "Selecionados" },
  renderValue = (item) => item.name,
}: TransferListProps) {
  const [checked, setChecked] = React.useState<Room[]>([]);
  const [left, setLeft] = React.useState<Room[]>([]);
  const [right, setRight] = React.useState<Room[]>(value);

  // Atualiza listas quando `available` ou `value` mudam externamente
  React.useEffect(() => {
    // Atualiza left apenas se houver diferença real
    const newLeft = not(available, value);
    if (newLeft.length !== left.length || newLeft.some((item, i) => item.id !== left[i]?.id)) {
      setLeft(newLeft);
    }

    // Atualiza right apenas se houver diferença real
    const newRight = value;
    if (newRight.length !== right.length || newRight.some((item, i) => item.id !== right[i]?.id)) {
      setRight(newRight);
    }
    // Dependências: apenas os valores externos

    console.log('available: ', available)
    console.log('value: ', value)
  }, [available, value]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (item: Room) => {
    setChecked((prev) =>
      prev.find((v) => v.id === item.id)
        ? prev.filter((v) => v.id !== item.id)
        : [...prev, item]
    );
  };

  const numberOfChecked = (items: Room[]) => intersection(checked, items).length;

  const handleToggleAll = (items: Room[]) => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    const newSelected = [...right, ...leftChecked];
    onChange(newSelected);
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    const newSelected = not(right, rightChecked);
    onChange(newSelected);
    setChecked(not(checked, rightChecked));
  };

  const renderList = (title: string, items: Room[]) => (
    <Card className="w-full border-muted shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={numberOfChecked(items) === items.length && items.length > 0}
            onCheckedChange={() => handleToggleAll(items)}
            disabled={items.length === 0}
          />
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
        </div>
        <CardDescription>
          {numberOfChecked(items)}/{items.length} selecionado(s)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="max-h-72 overflow-auto divide-y rounded-md border bg-background">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-muted/60 transition-colors"
              onClick={() => handleToggle(item)}
            >
              <Checkbox checked={checked.some((v) => v.id === item.id)} />
              <span>{renderValue(item)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-start justify-center w-full max-w-[900px] bg-white p-8"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div>{renderList(titles.available!, left)}</div>

      <div className="flex flex-col items-center gap-2 justify-self-center">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCheckedRight}
          disabled={leftChecked.length === 0}
          aria-label="mover para selecionados"
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCheckedLeft}
          disabled={rightChecked.length === 0}
          aria-label="mover para disponíveis"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </div>

      <div>{renderList(titles.selected!, right)}</div>
    </div>
  );
}

export default TransferList;
