import { Despesa } from "./backend";
import { formataRs } from "./util";

interface ExibicaoTotalProps {
  despesas: Despesa[];
}

export default function ExibicaoTotal(props: ExibicaoTotalProps) {
  const total = somaDespesas(props.despesas);
  return (
    <div>
      Despesa total: <strong>R$ {formataRs(total)}</strong>
    </div>
  );
}

function somaDespesas(despesas: Despesa[]): number {
  let soma = 0;
  for (let despesa of despesas) {
    soma += despesa.valor;
  }
  return soma;
}
