import { emojis as e } from '@/lib/emojis';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

type ListaEmojisProps = {
  totalExibicao: number;
  selectedEmoji: (emogi: string) => void;
};

export default function ListaEmojis({ totalExibicao, selectedEmoji }: ListaEmojisProps) {
  const [listaEmojis, setListaEmojis] = useState(['']);
  const [totalShowing, setTotalShowing] = useState(totalExibicao);

  useEffect(() => {
    const novaLista: string[] = [];

    for (const emoji of e) {
      if (novaLista.length < totalShowing) {
        novaLista.push(emoji);
      }
    }

    setListaEmojis(novaLista);
  }, [totalShowing]);

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {listaEmojis.map((emoji) => {
        return (
          <div
            key={emoji}
            className="cursor-pointer text-xs"
            onClick={() => {
              selectedEmoji(emoji);
            }}
          >
            {emoji}
          </div>
        );
      })}

      {listaEmojis.length < e.length && (
        <Button
          className="text-xs text-gray-400"
          variant="ghost"
          onClick={() => {
            setTotalShowing(totalShowing + 5);
          }}
        >
          ver +
        </Button>
      )}
    </div>
  );
}
